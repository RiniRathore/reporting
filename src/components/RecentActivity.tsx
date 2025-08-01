import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Avatar } from './ui/Avatar';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'login';
}

const activities: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'John Doe', initials: 'JD' },
    action: 'created',
    target: 'New project "Dashboard Redesign"',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: 'create'
  },
  {
    id: '2',
    user: { name: 'Sarah Wilson', initials: 'SW' },
    action: 'updated',
    target: 'User profile settings',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'update'
  },
  {
    id: '3',
    user: { name: 'Mike Johnson', initials: 'MJ' },
    action: 'logged in',
    target: 'from mobile device',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'login'
  },
  {
    id: '4',
    user: { name: 'Emily Chen', initials: 'EC' },
    action: 'deleted',
    target: 'Old backup files',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: 'delete'
  },
  {
    id: '5',
    user: { name: 'David Brown', initials: 'DB' },
    action: 'created',
    target: 'Weekly report template',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    type: 'create'
  }
];

const getActivityBadge = (type: ActivityItem['type']) => {
  switch (type) {
    case 'create':
      return <Badge variant="success" size="sm">Created</Badge>;
    case 'update':
      return <Badge variant="info" size="sm">Updated</Badge>;
    case 'delete':
      return <Badge variant="error" size="sm">Deleted</Badge>;
    case 'login':
      return <Badge variant="default" size="sm">Login</Badge>;
    default:
      return <Badge variant="default" size="sm">Activity</Badge>;
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <Avatar 
                  name={activity.user.name}
                  src={activity.user.avatar}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user.name}
                    </p>
                    {getActivityBadge(activity.type)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {activity.action} <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all activity
          </button>
        </div>
      </CardContent>
    </Card>
  );
};