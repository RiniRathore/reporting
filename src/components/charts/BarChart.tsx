import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { BarChart3 } from 'lucide-react';

interface BarChartProps {
  title: string;
  data: Array<{ name: string; value: number; category?: string }>;
  color?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border-0 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-100">
        <p className="text-sm font-bold text-gray-900 mb-2">{label}</p>
        <p className="text-sm font-medium flex items-center space-x-2" style={{ color: payload[0].color }}>
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].color }}></span>
          <span>Value: {payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const BarChart: React.FC<BarChartProps> = ({ 
  title, 
  data, 
  color = '#3B82F6' 
}) => {
  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0">
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80 bg-white rounded-xl p-4 shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill={`url(#barGradient)`}
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1}/>
                  <stop offset="100%" stopColor={color} stopOpacity={0.6}/>
                </linearGradient>
              </defs>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};