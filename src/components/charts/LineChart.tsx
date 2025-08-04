import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { TrendingUp } from 'lucide-react';

interface LineChartProps {
  title: string;
  data: Array<{ name: string; value: number; previous?: number }>;
  color?: string;
  showComparison?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border-0 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-100">
        <p className="text-sm font-bold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium flex items-center space-x-2" style={{ color: entry.color }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span>{entry.dataKey === 'value' ? 'Current' : 'Previous'}: {entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const LineChart: React.FC<LineChartProps> = ({ 
  title, 
  data, 
  color = '#3B82F6',
  showComparison = false 
}) => {
  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80 bg-white rounded-xl p-4 shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color}
                strokeWidth={4}
                dot={{ fill: color, strokeWidth: 3, r: 5, shadow: true }}
                activeDot={{ r: 8, stroke: color, strokeWidth: 3, fill: '#fff', shadow: true }}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              />
              {showComparison && (
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#9CA3AF"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={false}
                  opacity={0.7}
                />
              )}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};