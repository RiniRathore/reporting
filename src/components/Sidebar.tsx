import React from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Calendar,
  Folder,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, badge }) => {
  return (
    <a
      href="#"
      className={cn(
        'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
        active 
          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      )}
    >
      <div className="flex items-center space-x-3">
        <div className={cn('w-5 h-5', active ? 'text-blue-600' : 'text-gray-400')}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        {/* Navigation */}
        <nav className="space-y-1">
          <div className="pb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Main
            </p>
            <div className="space-y-1">
              <SidebarItem icon={<Home />} label="Dashboard" active />
              <SidebarItem icon={<BarChart3 />} label="Analytics" />
              <SidebarItem icon={<Users />} label="Users" badge="12" />
              <SidebarItem icon={<FileText />} label="Reports" />
            </div>
          </div>

          <div className="pb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Management
            </p>
            <div className="space-y-1">
              <SidebarItem icon={<Calendar />} label="Calendar" />
              <SidebarItem icon={<Folder />} label="Projects" />
              <SidebarItem icon={<Settings />} label="Settings" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-1">
              <SidebarItem icon={<HelpCircle />} label="Help & Support" />
              <SidebarItem icon={<LogOut />} label="Logout" />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};