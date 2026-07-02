import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Users, DollarSign, Hotel, Compass, Sparkles, Loader2 } from 'lucide-react';

interface TripForm {
  destination: string;
  departure: string;
  travel_dates: string;
  travelers: string;
  budget: string;
  hotel: string;
  interests: string;
}

export default function App() {
  const [formData, setFormData] = useState<TripForm>({
    destination: '',
    departure: '',
    travel_dates: '',
    travelers: '1',
    budget: '',
    hotel: 'Mid-range',
    interests: '',
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setItinerary(data.itinerary);
      } else {
        alert('Failed to generate travel plan.');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">RoamAI</span>
          </div>
          <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2.5 py-1 rounded-full">LangGraph Engine</span>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Panel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-500" /> Plan New Adventure
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Departure City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input required type="text" name="departure" value={formData.departure} onChange={handleInputChange} placeholder="e.g. New Delhi" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input required type="text" name="destination" value={formData.destination} onChange={handleInputChange} placeholder="e.g. Tokyo, Japan" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Dates</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input required type="text" name="travel_dates" value={formData.travel_dates} onChange={handleInputChange} placeholder="Oct 10-15" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Travelers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input required type="number" name="travelers" min="1" value={formData.travelers} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Budget ($ or ₹)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input required type="text" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="e.g. $2000" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Hotels</label>
                <div className="relative">
                  <Hotel className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <select name="hotel" value={formData.hotel} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none">
                    <option>Budget</option>
                    <option>Mid-range</option>
                    <option>Luxury</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Interests</label>
              <input required type="text" name="interests" value={formData.interests} onChange={handleInputChange} placeholder="e.g. historical sites, sushi, cafe hopping" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Gathering Web Intelligence...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Smart Itinerary
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Dynamic Output Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
          {loading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-3" />
              <p className="font-medium text-slate-700">Executing Multi-Agent State Graph...</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs text-center">Tavily is mining real-time flight metrics, local accommodation tiers, and safety guidelines.</p>
            </div>
          )}

          {!loading && !itinerary && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-8 text-center">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 mb-3">
                <Plane className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">No Itinerary Generated</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">Fill out your travel parameters on the left to activate the synthesis agent pipeline.</p>
            </div>
          )}

          {!loading && itinerary && (
            <div className="prose max-w-none">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-900 m-0 flex items-center gap-2">
                  🎉 Custom Travel Dossier
                </h2>
                <button onClick={() => window.print()} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-md transition">Print Plan</button>
              </div>
              {/* Simple whitespace preservation rendering markdown lines */}
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                {itinerary}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}