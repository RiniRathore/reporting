import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StatsCard } from './components/StatsCard';
import { LineChart } from './components/charts/LineChart';
import { BarChart } from './components/charts/BarChart';
import { DonutChart } from './components/charts/DonutChart';
import { FunnelChart } from './components/charts/FunnelChart';
import { RecentActivity } from './components/RecentActivity';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  CreditCard,
  CheckCircle
} from 'lucide-react';

// Sample data
const revenueData = [
  { name: 'Jan', value: 4000, previous: 3500 },
  { name: 'Feb', value: 3000, previous: 2800 },
  { name: 'Mar', value: 5000, previous: 4200 },
  { name: 'Apr', value: 4500, previous: 4000 },
  { name: 'May', value: 6000, previous: 5200 },
  { name: 'Jun', value: 5500, previous: 5000 },
  { name: 'Jul', value: 7000, previous: 6200 },
];

const salesData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 190 },
  { name: 'Wed', value: 300 },
  { name: 'Thu', value: 250 },
  { name: 'Fri', value: 420 },
  { name: 'Sat', value: 380 },
  { name: 'Sun', value: 290 },
];

const categoryData = [
  { name: 'Electronics', value: 4500, color: '#3B82F6' },
  { name: 'Clothing', value: 3200, color: '#10B981' },
  { name: 'Books', value: 1800, color: '#F59E0B' },
  { name: 'Home & Garden', value: 2100, color: '#EF4444' },
  { name: 'Sports', value: 1500, color: '#8B5CF6' },
];

const funnelData = [
  { 
    name: 'Website Visitors', 
    value: 10000, 
    color: '#3B82F6',
    icon: <Eye className="w-4 h-4" />
  },
  { 
    name: 'Product Views', 
    value: 6500, 
    color: '#10B981',
    icon: <MousePointer className="w-4 h-4" />
  },
  { 
    name: 'Add to Cart', 
    value: 2800, 
    color: '#F59E0B',
    icon: <ShoppingCart className="w-4 h-4" />
  },
  { 
    name: 'Checkout Started', 
    value: 1200, 
    color: '#EF4444',
    icon: <CreditCard className="w-4 h-4" />
  },
  { 
    name: 'Purchase Complete', 
    value: 850, 
    color: '#8B5CF6',
    icon: <CheckCircle className="w-4 h-4" />
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1">
          <Header />
          
          <main className="p-6">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Revenue"
                value="$54,239"
                change="12.5%"
                changeType="positive"
                icon={DollarSign}
                iconColor="text-green-600"
                iconBg="bg-green-100"
              />
              <StatsCard
                title="Total Users"
                value="2,847"
                change="8.2%"
                changeType="positive"
                icon={Users}
                iconColor="text-blue-600"
                iconBg="bg-blue-100"
              />
              <StatsCard
                title="Total Orders"
                value="1,423"
                change="3.1%"
                changeType="negative"
                icon={ShoppingCart}
                iconColor="text-purple-600"
                iconBg="bg-purple-100"
              />
              <StatsCard
                title="Growth Rate"
                value="23.5%"
                change="2.4%"
                changeType="positive"
                icon={TrendingUp}
                iconColor="text-orange-600"
                iconBg="bg-orange-100"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <LineChart 
                title="Revenue Trend" 
                data={revenueData} 
                color="#3B82F6"
                showComparison={true}
              />
              <BarChart 
                title="Weekly Sales" 
                data={salesData} 
                color="#10B981"
              />
            </div>

            {/* Conversion Funnel */}
            <div className="mb-8">
              <FunnelChart 
                title="Sales Conversion Funnel" 
                data={funnelData}
                showConversionRates={true}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <DonutChart 
                  title="Sales by Category" 
                  data={categoryData}
                />
              </div>
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;