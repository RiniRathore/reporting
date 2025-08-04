import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { PieChart as PieChartIcon } from 'lucide-react';

interface DonutChartProps {
  title: string;
  data: Array<{ name: string; value: number; color: string }>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-4 border-0 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-100">
        <p className="text-sm font-bold text-gray-900 mb-2">{data.name}</p>
        <p className="text-sm font-medium text-gray-600 mb-1">
          Value: {data.value.toLocaleString()}
        </p>
        <p className="text-sm font-medium text-gray-600">
          Percentage: {((data.value / data.payload.total) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
          <div 
            className="w-4 h-4 rounded-full shadow-sm" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-gray-700">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const DonutChart: React.FC<DonutChartProps> = ({ title, data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total }));

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0">
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <PieChartIcon className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 relative">
        <div className="h-80 bg-white rounded-xl p-4 shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithTotal}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-4">
          <div className="text-center bg-white rounded-full p-4 shadow-lg">
            <p className="text-3xl font-bold text-gray-900">{total.toLocaleString()}</p>
            <p className="text-sm font-medium text-gray-500">Total Sales</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};