import type { PlanRequest, PlanResponse } from "@/types";

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? "http://127.0.0.1:8000";

const DEFAULT_TIMEOUT_MS = 120_000;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function generatePlan(
  payload: PlanRequest,
  signal?: AbortSignal,
): Promise<PlanResponse> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, DEFAULT_TIMEOUT_MS);

  const combinedSignal = signal ? mergeSignals(signal, controller.signal) : controller.signal;

  try {
    const res = await fetch(`${API_BASE}/api/plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: combinedSignal,
    });

    if (!res.ok) {
      throw new ApiError(`Server responded with ${res.status}`, res.status);
    }

    const data = (await res.json()) as PlanResponse;

    if (!data.success || !data.itinerary) {
      throw new ApiError("The itinerary could not be generated.");
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;

    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("Request timed out. Please try again.");
    }

    throw new ApiError("Network error. Make sure the RoamAI backend is running.");
  } finally {
    clearTimeout(timeoutId);
  }
}

function mergeSignals(a: AbortSignal, b: AbortSignal): AbortSignal {
  const ctrl = new AbortController();

  const abort = () => ctrl.abort();

  if (a.aborted || b.aborted) {
    abort();
  }

  a.addEventListener("abort", abort);
  b.addEventListener("abort", abort);

  return ctrl.signal;
}
