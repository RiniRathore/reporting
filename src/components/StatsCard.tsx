import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
  iconBg,
}) => {
  const changeVariant = {
    positive: 'success',
    negative: 'error',
    neutral: 'default',
  }[changeType] as 'success' | 'error' | 'default';

  const changePrefix = changeType === 'positive' ? '+' : changeType === 'negative' ? '-' : '';

  return (
    <Card hover className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            <Badge variant={changeVariant} size="sm">
              {changePrefix}{change}
            </Badge>
          </div>
          <div className={cn('p-3 rounded-xl', iconBg)}>
            <Icon className={cn('w-6 h-6', iconColor)} />
          </div>
        </div>
        
        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <Icon className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
};