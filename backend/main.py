# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_travel_planner

app = FastAPI(title="AI Travel Planner API")

# Enable CORS so your React frontend can communicate with the backend safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripRequest(BaseModel):
    destination: str
    departure: str
    travel_dates: str
    travelers: str
    budget: str
    hotel: str
    interests: str

@app.post("/api/plan")
async def generate_plan(request: TripRequest):
    try:
        itinerary_markdown = run_travel_planner(request.model_dump())
        return {"success": True, "itinerary": itinerary_markdown}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)