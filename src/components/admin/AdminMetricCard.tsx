'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Package,
  Users,
} from 'lucide-react';

export type MetricIconType = 'dollar' | 'orders' | 'products' | 'customers';

interface AdminMetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  iconType: MetricIconType;
  color?: 'navy' | 'magenta' | 'orange' | 'emerald';
}

const iconMap = {
  dollar: DollarSign,
  orders: ShoppingBag,
  products: Package,
  customers: Users,
};

export default function AdminMetricCard({
  title,
  value,
  change,
  isPositive = true,
  iconType,
  color = 'navy',
}: AdminMetricCardProps) {
  const Icon = iconMap[iconType] || DollarSign;

  const colorMap = {
    navy: {
      bg: 'bg-snowcem-navy/5',
      iconBg: 'bg-snowcem-navy text-white',
      border: 'border-snowcem-navy/10',
    },
    magenta: {
      bg: 'bg-snowcem-magenta/5',
      iconBg: 'bg-snowcem-magenta text-white',
      border: 'border-snowcem-magenta/10',
    },
    orange: {
      bg: 'bg-snowcem-orange/10',
      iconBg: 'bg-snowcem-orange text-white',
      border: 'border-snowcem-orange/20',
    },
    emerald: {
      bg: 'bg-emerald-50',
      iconBg: 'bg-emerald-600 text-white',
      border: 'border-emerald-200',
    },
  };

  const style = colorMap[color];

  return (
    <div
      className={`bg-white rounded-2xl p-6 border ${style.border} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            {value}
          </h3>

          {change && (
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold">
              {isPositive ? (
                <span className="text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5" /> {change}
                </span>
              ) : (
                <span className="text-rose-600 flex items-center gap-0.5 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  <TrendingDown className="w-3.5 h-3.5" /> {change}
                </span>
              )}
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          )}
        </div>

        <div
          className={`w-12 h-12 rounded-2xl ${style.iconBg} flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
