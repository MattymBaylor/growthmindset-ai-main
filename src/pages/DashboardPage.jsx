// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
import { 
  Phone, 
  Users, 
  DollarSign, 
  TrendingUp,
  Activity,
  Calendar,
  Settings,
  ChevronRight,
  Bell,
  Download,
  RefreshCw,
  Zap,
  MessageSquare,
  FileText,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [metrics, setMetrics] = useState({
    totalCalls: 0,
    totalLeads: 0,
    totalRevenue: 0,
    activeServices: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  
  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load user's services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id);
      
      if (servicesData) {
        setServices(servicesData);
        setMetrics(prev => ({
          ...prev,
          activeServices: servicesData.filter(s => s.status === 'active').length
        }));
      }
      
      // Simulate metrics (in production, these would come from your analytics)
      setMetrics(prev => ({
        ...prev,
        totalCalls: 1247,
        totalLeads: 89,
        totalRevenue: 12458
      }));
      
      // Simulate recent activity
      setRecentActivity([
        { id: 1, type: 'call', message: 'Voice AI handled 23 calls', time: new Date(Date.now() - 3600000) },
        { id: 2, type: 'lead', message: 'New lead captured from website', time: new Date(Date.now() - 7200000) },
        { id: 3, type: 'payment', message: 'Monthly subscription renewed', time: new Date(Date.now() - 86400000) },
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { icon: Phone, label: 'Configure Voice AI', action: '/services/voice-ai' },
    { icon: Users, label: 'Manage Team', action: '/team' },
    { icon: FileText, label: 'View Reports', action: '/reports' },
    { icon: Settings, label: 'Settings', action: '/settings' },
  ];

  const statsCards = [
    {
      title: 'Total Calls Handled',
      value: metrics.totalCalls.toLocaleString(),
      change: '+12%',
      icon: Phone,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Leads Generated',
      value: metrics.totalLeads.toLocaleString(),
      change: '+23%',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Revenue Saved',
      value: formatCurrency(metrics.totalRevenue),
      change: '+18%',
      icon: DollarSign,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Active Services',
      value: metrics.activeServices,
      change: '0',
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.user_metadata?.full_name || 'User'}</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your AI services today
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <Badge variant={stat.change.startsWith('+') ? 'default' : 'secondary'} className="ml-2">
                    {stat.change}
                  </Badge>
                </div>
                {/* <Progress value={75} className="mt-3 h-1" /> */}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center py-4"
                    onClick={() => navigate(action.action)}
                  >
                    <action.icon className="h-6 w-6 mb-2 text-accent" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Services</CardTitle>
                <CardDescription>Your AI automation services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Zap className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">{service.service_type}</p>
                          <p className="text-sm text-muted-foreground">
                            Status: {service.status}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No services configured yet</p>
                    <Button onClick={() => navigate('/services')}>
                      Explore Services
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest events and actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {activity.type === 'call' && <Phone className="h-4 w-4" />}
                      {activity.type === 'lead' && <Users className="h-4 w-4" />}
                      {activity.type === 'payment' && <DollarSign className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(activity.time)}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Activity
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Service Management</CardTitle>
              <CardDescription>Configure and monitor your AI services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Service configuration coming soon
                </p>
                <Button onClick={() => navigate('/services')}>
                  Browse Available Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Advanced analytics coming soon
                </p>
                <Button variant="outline">
                  Download Sample Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Complete history of all actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="p-2 rounded-lg bg-muted">
                      {activity.type === 'call' && <Phone className="h-4 w-4" />}
                      {activity.type === 'lead' && <Users className="h-4 w-4" />}
                      {activity.type === 'payment' && <DollarSign className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatRelativeTime(activity.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
