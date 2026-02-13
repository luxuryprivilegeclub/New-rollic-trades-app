// Core Types for Trading Research SaaS Platform

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'super_admin';
  subscription_status: 'active' | 'expired' | 'pending' | 'suspended';
  subscription_expires_at?: string;
  approved: boolean;
  created_at: string;
  last_login?: string;
  ip_address?: string;
  device_info?: DeviceInfo;
  geo_location?: GeoLocation;
}

export interface DeviceInfo {
  browser: string;
  os: string;
  device_type: 'desktop' | 'mobile' | 'tablet';
}

export interface GeoLocation {
  country: string;
  city: string;
  lat: number;
  lng: number;
}

export interface MacroIndicator {
  id: string;
  name: string;
  code: string;
  current_value: number;
  previous_value: number;
  trend: 'up' | 'down' | 'neutral';
  next_release: string;
  ai_impact_analysis: string;
  gold_impact: 'bullish' | 'bearish' | 'neutral';
  usd_impact: 'bullish' | 'bearish' | 'neutral';
  unit: string;
  source: string;
  enabled: boolean;
}

export interface Report {
  id: string;
  module: ReportModule;
  title: string;
  content: string;
  custom_footer?: string;
  published_at: string;
  created_by: string;
  version: number;
}

export type ReportModule = 
  | 'money_flow'
  | 'oi_analyzer'
  | 'gold_intelligence'
  | 'forex_intelligence'
  | 'btc_intelligence'
  | 'sp500_report'
  | 'expert_learning';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
  assets: string[];
  source: string;
  published_at: string;
  ai_analysis?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  context?: AIContext;
}

export interface AIContext {
  current_page: string;
  macro_data?: MacroIndicator[];
  recent_reports?: Report[];
  user_activity?: string[];
}

export interface Session {
  id: string;
  user_id: string;
  user: User;
  started_at: string;
  last_activity: string;
  ip_address: string;
  device_info: DeviceInfo;
  geo_location: GeoLocation;
}

export interface AdminStats {
  total_users: number;
  active_users: number;
  live_sessions: number;
  expiring_soon: number;
  pending_approval: number;
  revenue_mtd: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author: string;
  published_at: string;
  tags: string[];
  status: 'draft' | 'published';
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  created_at: string;
  expires_at?: string;
}
