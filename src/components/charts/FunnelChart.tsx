import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TrendingDown, Users, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';

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
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-blue-600" />
            <span>{title}</span>
          </CardTitle>
          <Badge variant="info" size="sm">
            Overall: {calculateConversionRate(data[data.length - 1].value, data[0].value)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {data.map((stage, index) => {
            const widthPercentage = (stage.value / maxValue) * 100;
            const conversionRate = index > 0 ? calculateConversionRate(stage.value, data[index - 1].value) : 100;
            const dropOffRate = index > 0 ? (100 - parseFloat(conversionRate)).toFixed(1) : '0.0';
            
            return (
              <div key={stage.name} className="relative">
                {/* Stage Bar */}
                <div className="relative">
                  <div 
                    className="h-16 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between px-4 transition-all duration-300 hover:shadow-md"
                    style={{ 
                      width: `${widthPercentage}%`,
                      background: `linear-gradient(135deg, ${stage.color}15, ${stage.color}25)`,
                      borderLeft: `4px solid ${stage.color}`
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${stage.color}20` }}
                      >
                        <div style={{ color: stage.color }}>
                          {stage.icon}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{stage.name}</p>
                        <p className="text-sm text-gray-600">
                          {stage.value.toLocaleString()} users
                        </p>
                      </div>
                    </div>
                    
                    {showConversionRates && (
                      <div className="text-right">
                        <Badge 
                          variant={parseFloat(conversionRate) >= 70 ? 'success' : parseFloat(conversionRate) >= 40 ? 'warning' : 'error'}
                          size="sm"
                        >
                          {conversionRate}%
                        </Badge>
                        {index > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            -{dropOffRate}% drop-off
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Connection Line */}
                  {index < data.length - 1 && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-0.5 h-4 bg-gray-300"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full -mt-1 -ml-0.5"></div>
                    </div>
                  )}
                </div>
                
                {/* Drop-off Visualization */}
                {index > 0 && (
                  <div className="absolute -top-1 right-0 flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>{(data[index - 1].value - stage.value).toLocaleString()} lost</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {data[0].value.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Visitors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {data[data.length - 1].value.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Conversions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {calculateConversionRate(data[data.length - 1].value, data[0].value)}%
              </p>
              <p className="text-sm text-gray-600">Conversion Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {(data[0].value - data[data.length - 1].value).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Drop-offs</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};