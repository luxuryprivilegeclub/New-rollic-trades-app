import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Activity, Globe, Shield, FileText,
  Settings, BarChart3, Clock, AlertTriangle, Check, X,
  UserCheck, UserX, Mail, TrendingUp, Plus,
  Save, Edit3, Trash2, Send,
  BookOpen, Search, Filter, Download,
  MessageSquare, Megaphone, PenTool
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { mockAdminStats, mockUsers, mockSessions } from '@/data/mockData';

type AdminTab = 'overview' | 'users' | 'sessions' | 'reports' | 'blog' | 'announcements' | 'settings';

// Blog Post type for CMS
interface BlogPostDraft {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  status: 'draft' | 'published';
  coverColor: string;
}

// Report draft type
interface ReportDraft {
  module: string;
  title: string;
  htmlContent: string;
  footer: string;
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Blog CMS State
  const [blogPosts, setBlogPosts] = useState<BlogPostDraft[]>([
    { id: '1', title: 'Understanding Market Cycles in 2025', excerpt: 'A comprehensive guide to market cycles.', content: '<h2>Market Cycles</h2><p>Understanding market cycles is crucial for trading success...</p>', tags: 'Markets, Analysis', status: 'published', coverColor: 'from-blue-600 to-purple-600' },
    { id: '2', title: 'Gold vs Bitcoin: The Safe Haven Debate', excerpt: 'Analyzing safe haven assets.', content: '<h2>Safe Haven Assets</h2><p>Both gold and bitcoin serve as alternative stores of value...</p>', tags: 'Gold, Bitcoin', status: 'published', coverColor: 'from-amber-500 to-orange-500' },
    { id: '3', title: 'Fed Policy Impact on Commodities (Draft)', excerpt: 'How monetary policy affects commodities.', content: '<h2>Fed Policy</h2><p>Draft content here...</p>', tags: 'Macro, Fed', status: 'draft', coverColor: 'from-red-500 to-pink-500' },
  ]);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPostDraft | null>(null);
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', tags: '', coverColor: 'from-blue-600 to-purple-600' });

  // Report Management State
  const [showReportEditor, setShowReportEditor] = useState(false);
  const [reportForm, setReportForm] = useState<ReportDraft>({ module: 'money_flow', title: '', htmlContent: '', footer: '' });
  const [publishedReports, setPublishedReports] = useState<Array<{ module: string; title: string; date: string; status: string }>>([
    { module: 'Money Flow Track', title: 'Weekly Money Flow Analysis', date: 'Today 10:30 AM', status: 'published' },
    { module: 'Gold Intelligence', title: 'Gold Market Intelligence Report', date: 'Today 08:15 AM', status: 'published' },
    { module: 'OI Analyzer', title: 'Open Interest Weekly Review', date: 'Yesterday 04:00 PM', status: 'published' },
    { module: 'Forex Intelligence', title: 'EUR/USD Analysis Q1', date: 'Yesterday 02:30 PM', status: 'published' },
    { module: 'BTC Intelligence', title: 'Bitcoin Weekly Outlook', date: '2 days ago', status: 'published' },
  ]);

  // Announcement State
  const [announcements, setAnnouncements] = useState([
    { id: '1', title: 'Platform Maintenance', message: 'Scheduled maintenance on Sunday 2AM-4AM EST.', type: 'warning', date: 'Jan 20, 2025' },
    { id: '2', title: 'New Feature: AI Assistant', message: 'Our AI trading assistant is now available for all members.', type: 'success', date: 'Jan 18, 2025' },
  ]);
  const [announcementForm, setAnnouncementForm] = useState({ title: '', message: '', type: 'info' });

  // User management State
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'pending' | 'active' | 'expired'>('all');

  const stats = mockAdminStats;

  const tabs: Array<{ id: AdminTab; name: string; icon: typeof BarChart3; badge?: number }> = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users, badge: stats.pending_approval },
    { id: 'sessions', name: 'Live Sessions', icon: Activity, badge: stats.live_sessions },
    { id: 'reports', name: 'Report CMS', icon: FileText },
    { id: 'blog', name: 'Blog CMS', icon: BookOpen },
    { id: 'announcements', name: 'Announcements', icon: Megaphone },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const filteredUsers = mockUsers.filter(u => {
    if (userSearch && !u.full_name.toLowerCase().includes(userSearch.toLowerCase()) && !u.email.toLowerCase().includes(userSearch.toLowerCase())) return false;
    if (userFilter === 'pending' && u.approved) return false;
    if (userFilter === 'active' && u.subscription_status !== 'active') return false;
    if (userFilter === 'expired' && u.subscription_status !== 'expired') return false;
    return true;
  });

  // Blog handlers
  const handleNewBlog = () => {
    setBlogForm({ title: '', excerpt: '', content: '', tags: '', coverColor: 'from-blue-600 to-purple-600' });
    setEditingBlog(null);
    setShowBlogEditor(true);
  };

  const handleEditBlog = (post: BlogPostDraft) => {
    setBlogForm({ title: post.title, excerpt: post.excerpt, content: post.content, tags: post.tags, coverColor: post.coverColor });
    setEditingBlog(post);
    setShowBlogEditor(true);
  };

  const handleSaveBlog = (status: 'draft' | 'published') => {
    if (editingBlog) {
      setBlogPosts(posts => posts.map(p => p.id === editingBlog.id ? { ...p, ...blogForm, status } : p));
    } else {
      setBlogPosts(posts => [...posts, { id: Date.now().toString(), ...blogForm, status }]);
    }
    setShowBlogEditor(false);
  };

  const handleDeleteBlog = (id: string) => {
    setBlogPosts(posts => posts.filter(p => p.id !== id));
  };

  // Report handler
  const handlePublishReport = () => {
    if (reportForm.title && reportForm.htmlContent) {
      setPublishedReports(prev => [{ module: reportForm.module, title: reportForm.title, date: 'Just now', status: 'published' }, ...prev]);
      setReportForm({ module: 'money_flow', title: '', htmlContent: '', footer: '' });
      setShowReportEditor(false);
    }
  };

  // Announcement handler
  const handleSendAnnouncement = () => {
    if (announcementForm.title && announcementForm.message) {
      setAnnouncements(prev => [{ id: Date.now().toString(), ...announcementForm, date: 'Just now' }, ...prev]);
      setAnnouncementForm({ title: '', message: '', type: 'info' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400">Manage users, content, reports &amp; platform settings</p>
            </div>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-sm text-emerald-400">✅ آپ Admin Panel میں ہیں۔ نیچے tabs سے Users, Reports, Blog, Announcements اور Settings manage کر سکتے ہیں۔</p>
          </div>
        </motion.div>

        {/* Tabs - scrollable on mobile */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
              {tab.badge ? (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-red-500 text-white">{tab.badge}</span>
              ) : null}
            </button>
          ))}
        </div>

        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Total Users', value: stats.total_users, icon: Users, color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/10' },
                { label: 'Active Users', value: stats.active_users, icon: UserCheck, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-600/10' },
                { label: 'Live Sessions', value: stats.live_sessions, icon: Activity, color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-600/10' },
                { label: 'Expiring Soon', value: stats.expiring_soon, icon: Clock, color: 'text-amber-400', bg: 'from-amber-500/20 to-amber-600/10' },
                { label: 'Pending', value: stats.pending_approval, icon: AlertTriangle, color: 'text-red-400', bg: 'from-red-500/20 to-red-600/10' },
                { label: 'Revenue MTD', value: `$${stats.revenue_mtd.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-600/10' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className={`p-4 bg-gradient-to-br ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Manage Users', icon: Users, action: () => setActiveTab('users'), color: 'from-blue-500 to-indigo-600' },
                { label: 'Publish Report', icon: FileText, action: () => { setActiveTab('reports'); setShowReportEditor(true); }, color: 'from-emerald-500 to-teal-600' },
                { label: 'Write Blog Post', icon: PenTool, action: () => { setActiveTab('blog'); handleNewBlog(); }, color: 'from-purple-500 to-pink-600' },
                { label: 'Send Announcement', icon: Megaphone, action: () => setActiveTab('announcements'), color: 'from-amber-500 to-orange-600' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.08 }}>
                  <Card className="cursor-pointer group" hover onClick={item.action}>
                    <CardContent className="p-5 text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white font-medium text-sm">{item.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pending Approvals & Expiring */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    Pending Approvals ({mockUsers.filter(u => !u.approved).length})
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockUsers.filter(u => !u.approved).length === 0 ? (
                    <p className="text-gray-500 text-sm py-4 text-center">No pending approvals ✓</p>
                  ) : (
                    mockUsers.filter(u => !u.approved).map((user, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                            {user.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{user.full_name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors" title="Approve">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors" title="Reject">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    Expiring Soon (48h)
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockUsers.filter(u => u.subscription_status === 'active').slice(0, 3).map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-medium">
                          {user.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.full_name}</p>
                          <p className="text-sm text-amber-400">Expires in 2 days</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Remind
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Map placeholder */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Active Users Map
                </h3>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cellipse cx='500' cy='250' rx='400' ry='180' fill='none' stroke='%234F46E5' stroke-width='1'/%3E%3Cellipse cx='500' cy='250' rx='300' ry='135' fill='none' stroke='%234F46E5' stroke-width='0.5'/%3E%3Cellipse cx='500' cy='250' rx='200' ry='90' fill='none' stroke='%234F46E5' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
                  }} />
                  {/* Fake dots for user locations */}
                  <div className="absolute w-3 h-3 bg-emerald-500 rounded-full animate-ping" style={{ top: '35%', left: '25%' }} />
                  <div className="absolute w-2 h-2 bg-emerald-400 rounded-full" style={{ top: '35%', left: '25%' }} />
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ top: '40%', left: '72%' }} />
                  <div className="absolute w-2 h-2 bg-blue-400 rounded-full" style={{ top: '40%', left: '72%' }} />
                  <div className="absolute w-3 h-3 bg-purple-500 rounded-full animate-ping" style={{ top: '30%', left: '48%' }} />
                  <div className="absolute w-2 h-2 bg-purple-400 rounded-full" style={{ top: '30%', left: '48%' }} />
                  <div className="text-center relative z-10">
                    <p className="text-gray-400 text-sm">{stats.live_sessions} active sessions worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ==================== USERS TAB ==================== */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Search & Filter */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                {(['all', 'pending', 'active', 'expired'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setUserFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      userFilter === f
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="font-semibold text-white">All Users ({filteredUsers.length})</h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">User</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Approval</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Subscription</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Joined</th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredUsers.map((user, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                                {user.full_name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-white font-medium">{user.full_name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={user.approved ? 'success' : 'warning'}>
                              {user.approved ? 'Approved' : 'Pending'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={
                              user.subscription_status === 'active' ? 'success' :
                              user.subscription_status === 'expired' ? 'danger' : 'warning'
                            }>
                              {user.subscription_status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {!user.approved && (
                                <button className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors" title="Approve User">
                                  <UserCheck className="w-4 h-4" />
                                </button>
                              )}
                              <button className="p-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors" title="Send Email">
                                <Mail className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors" title="Suspend User">
                                <UserX className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ==================== LIVE SESSIONS TAB ==================== */}
        {activeTab === 'sessions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    Live Sessions ({mockSessions.length})
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm text-emerald-400">Real-time</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSessions.map((session, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {session.user.full_name.charAt(0)}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{session.user.full_name}</p>
                        <p className="text-sm text-gray-500">{session.user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-400 flex items-center gap-1"><Globe className="w-3 h-3" /> {session.geo_location.city}, {session.geo_location.country}</p>
                        <p className="text-xs text-gray-500">{session.ip_address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{session.device_info.browser}</p>
                        <p className="text-xs text-gray-500">{session.device_info.os} • {session.device_info.device_type}</p>
                      </div>
                      <div>
                        <Badge variant="success" size="sm">Online</Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((Date.now() - new Date(session.started_at).getTime()) / 60000)}m ago
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ==================== REPORT CMS TAB ==================== */}
        {activeTab === 'reports' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* How to use guide */}
            <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/20">
              <CardContent className="p-4">
                <h4 className="text-blue-400 font-medium mb-2">📘 Report CMS کیسے استعمال کریں:</h4>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li><strong>"New Report"</strong> بٹن دبائیں</li>
                  <li>Module چنیں (مثلاً Gold Intelligence, Money Flow وغیرہ)</li>
                  <li>Title لکھیں اور HTML content paste کریں</li>
                  <li>Optional footer لکھیں</li>
                  <li><strong>"Publish"</strong> بٹن دبائیں - Users کو notification جائے گی</li>
                </ol>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Published Reports</h3>
              <Button onClick={() => setShowReportEditor(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {publishedReports.map((report, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="hover:border-white/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{report.title}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge size="sm" variant="info">{report.module}</Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {report.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="success" size="sm">{report.status}</Badge>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Report Editor Modal */}
            <Modal isOpen={showReportEditor} onClose={() => setShowReportEditor(false)} title="Publish New Report" size="xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Module</label>
                  <select
                    value={reportForm.module}
                    onChange={(e) => setReportForm(f => ({ ...f, module: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="money_flow" className="bg-gray-900">Money Flow Track</option>
                    <option value="oi_analyzer" className="bg-gray-900">OI Analyzer</option>
                    <option value="gold_intelligence" className="bg-gray-900">Gold Intelligence</option>
                    <option value="forex_intelligence" className="bg-gray-900">Forex Intelligence</option>
                    <option value="btc_intelligence" className="bg-gray-900">BTC Intelligence</option>
                    <option value="sp500_report" className="bg-gray-900">S&P 500 Report</option>
                    <option value="expert_learning" className="bg-gray-900">Expert Learning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Report Title</label>
                  <input
                    type="text"
                    value={reportForm.title}
                    onChange={(e) => setReportForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g., Weekly Gold Intelligence Report"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">HTML Content (paste your report HTML here)</label>
                  <textarea
                    rows={10}
                    value={reportForm.htmlContent}
                    onChange={(e) => setReportForm(f => ({ ...f, htmlContent: e.target.value }))}
                    placeholder="<h2>Report Title</h2><p>Your report content here...</p>"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Custom Footer (optional)</label>
                  <input
                    type="text"
                    value={reportForm.footer}
                    onChange={(e) => setReportForm(f => ({ ...f, footer: e.target.value }))}
                    placeholder="Disclaimer or footer text..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                {reportForm.htmlContent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 prose prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: reportForm.htmlContent }} />
                  </div>
                )}
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" onClick={() => setShowReportEditor(false)}>Cancel</Button>
                  <Button onClick={handlePublishReport}>
                    <Send className="w-4 h-4 mr-2" />
                    Publish &amp; Notify Users
                  </Button>
                </div>
              </div>
            </Modal>
          </motion.div>
        )}

        {/* ==================== BLOG CMS TAB ==================== */}
        {activeTab === 'blog' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Guide */}
            <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-purple-500/20">
              <CardContent className="p-4">
                <h4 className="text-purple-400 font-medium mb-2">📝 Blog CMS کیسے استعمال کریں:</h4>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li><strong>"New Post"</strong> بٹن دبائیں</li>
                  <li>Title, Excerpt اور Content لکھیں</li>
                  <li>Tags لگائیں (comma separated)</li>
                  <li><strong>"Save as Draft"</strong> یا <strong>"Publish"</strong> کریں</li>
                  <li>Published posts public Blog page پر نظر آئیں گے</li>
                </ol>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Blog Posts ({blogPosts.length})</h3>
              <Button onClick={handleNewBlog}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {blogPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="hover:border-white/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${post.coverColor} flex items-center justify-center flex-shrink-0`}>
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-medium truncate">{post.title}</p>
                            <p className="text-sm text-gray-400 truncate">{post.excerpt}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={post.status === 'published' ? 'success' : 'warning'} size="sm">
                                {post.status}
                              </Badge>
                              {post.tags.split(',').map((tag, j) => (
                                <Badge key={j} size="sm">{tag.trim()}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEditBlog(post)}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(post.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Blog Editor Modal */}
            <Modal isOpen={showBlogEditor} onClose={() => setShowBlogEditor(false)} title={editingBlog ? 'Edit Blog Post' : 'New Blog Post'} size="xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Post Title</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Enter blog post title..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt (short description)</label>
                  <input
                    type="text"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm(f => ({ ...f, excerpt: e.target.value }))}
                    placeholder="Brief summary of the post..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Content (HTML supported)</label>
                  <textarea
                    rows={8}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm(f => ({ ...f, content: e.target.value }))}
                    placeholder="<h2>Your heading</h2><p>Your blog content here...</p>"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm(f => ({ ...f, tags: e.target.value }))}
                    placeholder="Markets, Gold, Analysis"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cover Color</label>
                  <div className="flex gap-3">
                    {[
                      'from-blue-600 to-purple-600',
                      'from-emerald-500 to-teal-500',
                      'from-amber-500 to-orange-500',
                      'from-red-500 to-pink-500',
                      'from-indigo-500 to-purple-500',
                    ].map(color => (
                      <button
                        key={color}
                        onClick={() => setBlogForm(f => ({ ...f, coverColor: color }))}
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} ${blogForm.coverColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
                      />
                    ))}
                  </div>
                </div>
                {blogForm.content && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preview</label>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 prose prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: blogForm.content }} />
                  </div>
                )}
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" onClick={() => setShowBlogEditor(false)}>Cancel</Button>
                  <Button variant="secondary" onClick={() => handleSaveBlog('draft')}>
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button onClick={() => handleSaveBlog('published')}>
                    <Send className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            </Modal>
          </motion.div>
        )}

        {/* ==================== ANNOUNCEMENTS TAB ==================== */}
        {activeTab === 'announcements' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Send New Announcement */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-400" />
                  Send New Announcement
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Announcement title..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={announcementForm.message}
                    onChange={(e) => setAnnouncementForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Write your announcement message..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <div className="flex gap-3">
                    {[
                      { value: 'info', label: 'ℹ️ Info', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
                      { value: 'warning', label: '⚠️ Warning', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
                      { value: 'success', label: '✅ Success', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
                    ].map(t => (
                      <button
                        key={t.value}
                        onClick={() => setAnnouncementForm(f => ({ ...f, type: t.value }))}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                          announcementForm.type === t.value ? t.color : 'bg-white/5 text-gray-400 border-white/10'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button onClick={handleSendAnnouncement} disabled={!announcementForm.title || !announcementForm.message}>
                    <Send className="w-4 h-4 mr-2" />
                    Send to All Users
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Previous Announcements */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Previous Announcements</h3>
              <div className="space-y-3">
                {announcements.map((ann, i) => (
                  <motion.div key={ann.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              ann.type === 'warning' ? 'bg-amber-500/20' :
                              ann.type === 'success' ? 'bg-emerald-500/20' : 'bg-blue-500/20'
                            }`}>
                              <MessageSquare className={`w-5 h-5 ${
                                ann.type === 'warning' ? 'text-amber-400' :
                                ann.type === 'success' ? 'text-emerald-400' : 'text-blue-400'
                              }`} />
                            </div>
                            <div>
                              <p className="text-white font-medium">{ann.title}</p>
                              <p className="text-sm text-gray-400 mt-1">{ann.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{ann.date}</p>
                            </div>
                          </div>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== SETTINGS TAB ==================== */}
        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Macro Indicators */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Macro Dashboard Indicators
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">Select which indicators appear on the Macro Analysis dashboard</p>
                <div className="space-y-2">
                  {['CPI (Consumer Price Index)', 'Core PCE', 'US 10Y Treasury Yield', 'DXY (Dollar Index)', 'COT Net Positions (Gold)', 'Federal Funds Rate', 'Non-Farm Payrolls', 'ISM Manufacturing'].map((indicator, i) => (
                    <label key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                      <span className="text-white">{indicator}</span>
                      <input
                        type="checkbox"
                        defaultChecked={i < 6}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50"
                      />
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Email & Notification Settings
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Send expiry warning emails (48h before expiration)', default: true },
                  { label: 'Notify users when new report is published', default: true },
                  { label: 'Send weekly digest emails', default: false },
                  { label: 'Send welcome email on approval', default: true },
                  { label: 'Admin alert on new user registration', default: true },
                ].map((setting, i) => (
                  <label key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-white text-sm">{setting.label}</span>
                    <input type="checkbox" defaultChecked={setting.default} className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500" />
                  </label>
                ))}
              </CardContent>
            </Card>

            {/* Platform Settings */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  Platform Settings
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="TradePro Terminal"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Support Email</label>
                  <input
                    type="email"
                    defaultValue="support@tradepro.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subscription Price ($/month)</label>
                  <input
                    type="number"
                    defaultValue={49}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
