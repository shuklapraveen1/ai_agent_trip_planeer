# backend/agent.py
import os
from typing import Dict, TypedDict, List
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.tools import TavilySearchResults
from langgraph.graph import StateGraph, END

load_dotenv()

class AgentState(TypedDict):
    trip_details: Dict[str, str]
    search_queries: List[str]
    raw_search_data: List[str]
    final_itinerary: str

llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.3)
search_tool = TavilySearchResults(max_results=3)

def plan_searches_node(state: AgentState) -> Dict:
    details = state["trip_details"]
    queries = [
        f"flights from {details['departure']} to {details['destination']} dates {details['travel_dates']} prices",
        f"best {details['hotel']} hotels in {details['destination']} budget {details['budget']}",
        f"{details['destination']} visa requirements for citizens traveling from {details['departure']}",
        f"top attractions restaurants things to do in {details['destination']} for {details['interests']}"
    ]
    return {"search_queries": queries}

def execute_searches_node(state: AgentState) -> Dict:
    results = []
    for query in state["search_queries"]:
        try:
            search_response = search_tool.invoke(query)
            for doc in search_response:
                results.append(f"Source: {doc.get('url')}\nContent: {doc.get('content')}\n---")
        except Exception as e:
            results.append(f"Search failed: {str(e)}")
    return {"raw_search_data": results}

def generate_itinerary_node(state: AgentState) -> Dict:
    details = state["trip_details"]
    context = "\n".join(state["raw_search_data"])
    
    prompt = f"""
You are a world-class AI Travel Planner. Synthesize the provided web search context into a professional, highly detailed travel plan.
Destination: {details['destination']}
Departure: {details['departure']}
Dates: {details['travel_dates']}
Travelers: {details['travelers']}
Budget: {details['budget']}
Hotel Preference: {details['hotel']}
Interests: {details['interests']}

Context:
{context}

Generate your response in clean, beautiful Markdown using rich headings, bullet points, and tables. Include Flight Options, Accommodation, Weather/Packing, Day-by-Day Itinerary, and a Budget Table.
"""
    response = llm.invoke(prompt)
    return {"final_itinerary": response.content}

# Compile Workflow
workflow = StateGraph(AgentState)
workflow.add_node("planner", plan_searches_node)
workflow.add_node("searcher", execute_searches_node)
workflow.add_node("generator", generate_itinerary_node)
workflow.set_entry_point("planner")
workflow.add_edge("planner", "searcher")
workflow.add_edge("searcher", "generator")
workflow.add_edge("generator", END)

travel_agent_app = workflow.compile()

def run_travel_planner(details: dict) -> str:
    inputs = {
        "trip_details": details,
        "search_queries": [],
        "raw_search_data": [],
        "final_itinerary": ""
    }
    final_state = travel_agent_app.invoke(inputs)
    return final_state["final_itinerary"]