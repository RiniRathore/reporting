import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TrendingDown } from 'lucide-react';

interface FunnelStage {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

interface FunnelChartProps {
  title: string;
  data: FunnelStage[];
  showConversionRates?: boolean;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ 
  title, 
  data, 
  showConversionRates = true 
}) => {
  const maxValue = Math.max(...data.map(stage => stage.value));
  
  const calculateConversionRate = (currentValue: number, previousValue: number) => {
    return ((currentValue / previousValue) * 100).toFixed(1);
  };

  return (
    <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white border-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3 text-white">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">{title}</span>
          </CardTitle>
          <Badge variant="default" size="sm" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
            Overall: {calculateConversionRate(data[data.length - 1].value, data[0].value)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          {data.map((stage, index) => {
            const widthPercentage = (stage.value / maxValue) * 100;
            const conversionRate = index > 0 ? calculateConversionRate(stage.value, data[index - 1].value) : 100;
            const dropOffRate = index > 0 ? (100 - parseFloat(conversionRate)).toFixed(1) : '0.0';
            
            return (
              <div key={stage.name} className="relative group">
                {/* Stage Bar */}
                <div className="relative">
                  <div 
                    className="h-20 rounded-2xl shadow-lg border-0 flex items-center justify-between px-6 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                    style={{ 
                      width: `${widthPercentage}%`,
                      background: `linear-gradient(135deg, ${stage.color}20, ${stage.color}35, ${stage.color}20)`,
                      borderLeft: `6px solid ${stage.color}`,
                      boxShadow: `0 8px 32px ${stage.color}20`
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="p-3 rounded-xl shadow-lg backdrop-blur-sm"
                        style={{ 
                          backgroundColor: `${stage.color}25`,
                          boxShadow: `0 4px 16px ${stage.color}30`
                        }}
                      >
                        <div style={{ color: stage.color }} className="w-6 h-6">
                          {stage.icon}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{stage.name}</p>
                        <p className="text-gray-600 font-medium">
                          {stage.value.toLocaleString()} users
                        </p>
                      </div>
                    </div>
                    
                    {showConversionRates && (
                      <div className="text-right">
                        <Badge 
                          variant={parseFloat(conversionRate) >= 70 ? 'success' : parseFloat(conversionRate) >= 40 ? 'warning' : 'error'}
                          size="md"
                          className="font-bold shadow-lg"
                        >
                          {conversionRate}%
                        </Badge>
                        {index > 0 && (
                          <p className="text-sm text-gray-500 mt-2 font-medium">
                            -{dropOffRate}% drop-off
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Enhanced Connection Line */}
                  {index < data.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-300 rounded-full"></div>
                      <div className="w-4 h-4 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full -mt-2 -ml-1.5 shadow-lg border-2 border-white"></div>
                    </div>
                  )}
                </div>
                
                {/* Enhanced Drop-off Visualization */}
                {index > 0 && (
                  <div className="absolute -top-2 right-4 flex items-center space-x-2 text-sm">
                    <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                      <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-sm"></div>
                      <span className="text-red-700 font-medium">{(data[index - 1].value - stage.value).toLocaleString()} lost</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Enhanced Summary Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {data[0].value.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <p className="text-3xl font-bold text-green-600 mb-1">
                {data[data.length - 1].value.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
              <p className="text-3xl font-bold text-purple-600 mb-1">
                {calculateConversionRate(data[data.length - 1].value, data[0].value)}%
              </p>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100">
              <p className="text-3xl font-bold text-red-600 mb-1">
                {(data[0].value - data[data.length - 1].value).toLocaleString()}
              </p>
              <p className="text-sm font-medium text-gray-600">Total Drop-offs</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};