"use client";

import React, { useState } from "react";
import { MapPin, Search, Phone, Navigation, Store } from "lucide-react";

interface Dealer {
  id: string;
  name: string;
  city: string;
  pincode: string;
  address: string;
  phone: string;
  distance: string;
  rating: number;
}

const SAMPLE_DEALERS: Dealer[] = [
  {
    id: "1",
    name: "Snowcem Premier Paint Gallery",
    city: "Mumbai",
    pincode: "400001",
    address: "Shop 12, Fort Commercial Plaza, MG Road, South Mumbai",
    phone: "+91 98200 12345",
    distance: "1.2 km",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Royal Colors & Hardware",
    city: "Delhi",
    pincode: "110001",
    address: "Plot 45, Connaught Place Outer Circle, New Delhi",
    phone: "+91 98110 54321",
    distance: "2.5 km",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Apex Snowcem Dealer",
    city: "Bengaluru",
    pincode: "560001",
    address: "88 Commercial Street, Near Tasker Town, Bengaluru",
    phone: "+91 98450 67890",
    distance: "3.1 km",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Heritage Paint World",
    city: "Ahmedabad",
    pincode: "380009",
    address: "G-4 Sun Complex, CG Road, Navrangpura, Ahmedabad",
    phone: "+91 98980 11223",
    distance: "1.8 km",
    rating: 4.7,
  },
];

export default function DealerLocator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const filteredDealers = SAMPLE_DEALERS.filter((d) => {
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.pincode.includes(searchQuery) ||
      d.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "All" || d.city === selectedCity;
    return matchesQuery && matchesCity;
  });

  return (
    <section id="find-dealer" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-snowcem-orange font-bold text-xs uppercase tracking-wider mb-3">
            <MapPin className="w-4 h-4" />
            <span>Authorized Dealer Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Find Your Nearest Snowcem Dealer
          </h2>
          <p className="mt-3 text-gray-600 text-base font-light">
            Locate authorized Snowcem stockists, get shade samples, and request expert color consultation near you.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 max-w-4xl mx-auto mb-10 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            <div className="sm:col-span-8 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter PIN Code, Area, or Dealer Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-snowcem-orange"
              />
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-snowcem-orange cursor-pointer"
              >
                <option value="All">Select Major City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>

          </div>
        </div>

        {/* Dealer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-snowcem-orange transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-snowcem-orange" />
                    <h3 className="font-extrabold text-lg text-gray-900">{dealer.name}</h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ★ {dealer.rating}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-4 leading-relaxed flex items-start gap-1.5 font-light">
                  <MapPin className="w-4 h-4 text-snowcem-orange shrink-0 mt-0.5" />
                  <span>{dealer.address} (PIN: {dealer.pincode})</span>
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-snowcem-orange transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-snowcem-orange" />
                  <span>{dealer.phone}</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-1 text-xs font-bold text-snowcem-orange hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions ({dealer.distance})</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
