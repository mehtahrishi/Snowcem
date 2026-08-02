'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

interface ChartDataPoint {
  label: string;
  revenue: number;
  orders: number;
}

const defaultData: ChartDataPoint[] = [
  { label: 'Jan', revenue: 145000, orders: 32 },
  { label: 'Feb', revenue: 182000, orders: 41 },
  { label: 'Mar', revenue: 210000, orders: 55 },
  { label: 'Apr', revenue: 195000, orders: 48 },
  { label: 'May', revenue: 260000, orders: 68 },
  { label: 'Jun', revenue: 310000, orders: 84 },
  { label: 'Jul', revenue: 290000, orders: 79 },
  { label: 'Aug', revenue: 345000, orders: 92 },
];

export default function AdminChart() {
  const [metric, setMetric] = useState<'revenue' | 'orders'>('revenue');
  const maxVal = Math.max(...defaultData.map((d) => d[metric]));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-snowcem-navy">
              Sales & Order Analytics
            </h3>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24% YoY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monthly revenue breakdown across paint categories
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => setMetric('revenue')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                metric === 'revenue'
                  ? 'bg-snowcem-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Revenue (₹)
            </button>
            <button
              onClick={() => setMetric('orders')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                metric === 'orders'
                  ? 'bg-snowcem-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Orders Count
            </button>
          </div>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="pt-8 pb-4">
        <div className="h-64 flex items-end gap-3 sm:gap-6 px-2">
          {defaultData.map((item, idx) => {
            const val = item[metric];
            const heightPercent = Math.round((val / maxVal) * 100);

            return (
              <div
                key={item.label}
                className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
              >
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-snowcem-navy text-white text-[10px] py-1 px-2 rounded shadow font-bold pointer-events-none mb-1 text-center whitespace-nowrap">
                  {metric === 'revenue' ? `₹${val.toLocaleString()}` : `${val} Orders`}
                </div>

                {/* Animated Bar */}
                <div className="w-full bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden p-0.5">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-110 ${
                      idx === defaultData.length - 1
                        ? 'bg-gradient-to-t from-snowcem-navy via-snowcem-magenta to-snowcem-orange'
                        : 'bg-gradient-to-t from-snowcem-navy to-snowcem-magenta/80'
                    }`}
                  ></div>
                </div>

                {/* X Axis Label */}
                <span className="text-xs font-semibold text-slate-500 group-hover:text-snowcem-navy transition-colors">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
