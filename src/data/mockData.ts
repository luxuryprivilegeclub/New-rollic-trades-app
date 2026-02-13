import type { User, MacroIndicator, Report, NewsItem, Session, AdminStats, BlogPost } from '../types';

export const mockUser: User = {
  id: '1',
  email: 'trader@example.com',
  full_name: 'John Anderson',
  role: 'user',
  subscription_status: 'active',
  subscription_expires_at: '2025-02-15T00:00:00Z',
  approved: true,
  created_at: '2024-01-15T00:00:00Z',
  last_login: new Date().toISOString(),
};

export const mockAdminUser: User = {
  id: '0',
  email: 'admin@tradepro.com',
  full_name: 'Admin User',
  role: 'super_admin',
  subscription_status: 'active',
  approved: true,
  created_at: '2024-01-01T00:00:00Z',
};

export const mockMacroIndicators: MacroIndicator[] = [
  {
    id: '1',
    name: 'Consumer Price Index',
    code: 'CPI',
    current_value: 3.4,
    previous_value: 3.2,
    trend: 'up',
    next_release: '2025-02-12T13:30:00Z',
    ai_impact_analysis: 'Rising CPI indicates persistent inflationary pressures. The Fed may maintain hawkish stance, supporting USD strength and pressuring gold prices in the short term.',
    gold_impact: 'bearish',
    usd_impact: 'bullish',
    unit: '%',
    source: 'FRED',
    enabled: true,
  },
  {
    id: '2',
    name: 'Core PCE',
    code: 'PCEPILFE',
    current_value: 2.9,
    previous_value: 2.8,
    trend: 'up',
    next_release: '2025-01-31T13:30:00Z',
    ai_impact_analysis: 'Core PCE remains above Fed target. This supports continued restrictive monetary policy, creating headwinds for risk assets.',
    gold_impact: 'bearish',
    usd_impact: 'bullish',
    unit: '%',
    source: 'FRED',
    enabled: true,
  },
  {
    id: '3',
    name: 'US 10Y Treasury Yield',
    code: 'DGS10',
    current_value: 4.65,
    previous_value: 4.58,
    trend: 'up',
    next_release: 'Daily',
    ai_impact_analysis: 'Rising yields increase opportunity cost of holding gold. Strong correlation with USD strength. Watch for 4.75% resistance level.',
    gold_impact: 'bearish',
    usd_impact: 'bullish',
    unit: '%',
    source: 'FRED',
    enabled: true,
  },
  {
    id: '4',
    name: 'US Dollar Index',
    code: 'DXY',
    current_value: 104.25,
    previous_value: 103.80,
    trend: 'up',
    next_release: 'Continuous',
    ai_impact_analysis: 'DXY strength reflects risk-off sentiment and yield differentials. Key resistance at 105.00. Break above could accelerate gold selling.',
    gold_impact: 'bearish',
    usd_impact: 'bullish',
    unit: '',
    source: 'ICE',
    enabled: true,
  },
  {
    id: '5',
    name: 'COT Net Positions (Gold)',
    code: 'COT_GOLD',
    current_value: 185420,
    previous_value: 192350,
    trend: 'down',
    next_release: '2025-01-24T20:30:00Z',
    ai_impact_analysis: 'Managed money reducing long positions. Commercial hedgers increasing shorts. Short-term bearish signal but watch for positioning extremes.',
    gold_impact: 'bearish',
    usd_impact: 'neutral',
    unit: 'contracts',
    source: 'CFTC',
    enabled: true,
  },
  {
    id: '6',
    name: 'Federal Funds Rate',
    code: 'FEDFUNDS',
    current_value: 5.50,
    previous_value: 5.50,
    trend: 'neutral',
    next_release: '2025-01-29T19:00:00Z',
    ai_impact_analysis: 'Fed holding rates at restrictive levels. Market pricing first cut in Q2 2025. Any hawkish shift would support USD.',
    gold_impact: 'neutral',
    usd_impact: 'bullish',
    unit: '%',
    source: 'FRED',
    enabled: true,
  },
];

export const mockReports: Record<string, Report[]> = {
  money_flow: [
    {
      id: '1',
      module: 'money_flow',
      title: 'Weekly Money Flow Analysis',
      content: `<div class="report-content">
        <h2>Institutional Flow Summary</h2>
        <p>Major institutional inflows detected in Gold ETFs this week. GLD saw $420M net inflows while IAU added $180M.</p>
        <h3>Key Observations:</h3>
        <ul>
          <li>Central bank buying continues from China and India</li>
          <li>Hedge fund positioning turning cautiously bullish</li>
          <li>Retail sentiment remains neutral</li>
        </ul>
        <h3>Flow Metrics:</h3>
        <table>
          <tr><th>Asset</th><th>Weekly Flow</th><th>MTD Flow</th></tr>
          <tr><td>GLD</td><td>+$420M</td><td>+$890M</td></tr>
          <tr><td>IAU</td><td>+$180M</td><td>+$340M</td></tr>
          <tr><td>SLV</td><td>-$45M</td><td>-$120M</td></tr>
        </table>
      </div>`,
      published_at: new Date().toISOString(),
      created_by: 'Admin',
      version: 1,
    },
  ],
  gold_intelligence: [
    {
      id: '2',
      module: 'gold_intelligence',
      title: 'Gold Market Intelligence Report',
      content: `<div class="report-content">
        <h2>Gold Technical & Fundamental Analysis</h2>
        <h3>Technical Setup:</h3>
        <p>Gold trading at $2,045 with key support at $2,020 and resistance at $2,075.</p>
        <h3>Fundamental Drivers:</h3>
        <ul>
          <li>Real yields declining favors gold</li>
          <li>Geopolitical tensions providing safe-haven bid</li>
          <li>USD strength capping upside</li>
        </ul>
        <h3>Outlook:</h3>
        <p>Neutral to slightly bullish bias. Wait for break of $2,075 for long entries.</p>
      </div>`,
      published_at: new Date().toISOString(),
      created_by: 'Admin',
      version: 1,
    },
  ],
};

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Fed Minutes Signal Prolonged Restrictive Policy',
    summary: 'FOMC minutes reveal policymakers prefer maintaining current rates through H1 2025.',
    impact: 'high',
    assets: ['USD', 'Gold', 'Bonds'],
    source: 'Federal Reserve',
    published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    ai_analysis: 'Hawkish Fed stance supports USD and pressures gold. Watch for yield curve movements.',
  },
  {
    id: '2',
    title: 'China Gold Imports Surge to 6-Month High',
    summary: 'Chinese gold imports via Hong Kong rose 35% in December, signaling strong physical demand.',
    impact: 'medium',
    assets: ['Gold', 'CNY'],
    source: 'Bloomberg',
    published_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    ai_analysis: 'Strong Asian demand provides floor support for gold prices despite macro headwinds.',
  },
  {
    id: '3',
    title: 'US Jobless Claims Fall Below Expectations',
    summary: 'Initial claims at 187K vs 205K expected, showing resilient labor market.',
    impact: 'medium',
    assets: ['USD', 'Equities'],
    source: 'DOL',
    published_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    ai_analysis: 'Strong labor data reduces probability of near-term rate cuts. USD supportive.',
  },
  {
    id: '4',
    title: 'ECB Lagarde Hints at Rate Cuts by Summer',
    summary: 'ECB President suggests rate adjustments possible if inflation continues declining.',
    impact: 'high',
    assets: ['EUR', 'USD', 'Gold'],
    source: 'ECB',
    published_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    ai_analysis: 'Dovish ECB vs hawkish Fed widens rate differential, supportive for USD/EUR shorts.',
  },
  {
    id: '5',
    title: 'Oil Prices Rally on Middle East Tensions',
    summary: 'Brent crude jumps 3% on renewed geopolitical concerns in the Red Sea region.',
    impact: 'medium',
    assets: ['Oil', 'Gold', 'USD'],
    source: 'Reuters',
    published_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    ai_analysis: 'Rising oil adds inflationary pressures, could delay Fed pivot. Mixed for gold.',
  },
];

export const mockSessions: Session[] = [
  {
    id: '1',
    user_id: '1',
    user: { ...mockUser, full_name: 'John Anderson' },
    started_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    last_activity: new Date().toISOString(),
    ip_address: '192.168.1.100',
    device_info: { browser: 'Chrome 120', os: 'Windows 11', device_type: 'desktop' },
    geo_location: { country: 'United States', city: 'New York', lat: 40.7128, lng: -74.006 },
  },
  {
    id: '2',
    user_id: '2',
    user: { ...mockUser, id: '2', full_name: 'Sarah Chen', email: 'sarah@example.com' },
    started_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    last_activity: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    ip_address: '203.45.67.89',
    device_info: { browser: 'Safari 17', os: 'macOS Sonoma', device_type: 'desktop' },
    geo_location: { country: 'Singapore', city: 'Singapore', lat: 1.3521, lng: 103.8198 },
  },
  {
    id: '3',
    user_id: '3',
    user: { ...mockUser, id: '3', full_name: 'Michael Torres', email: 'mike@example.com' },
    started_at: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    last_activity: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    ip_address: '85.123.45.67',
    device_info: { browser: 'Firefox 121', os: 'Ubuntu 22.04', device_type: 'desktop' },
    geo_location: { country: 'Germany', city: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
  },
];

export const mockAdminStats: AdminStats = {
  total_users: 1247,
  active_users: 892,
  live_sessions: 47,
  expiring_soon: 23,
  pending_approval: 8,
  revenue_mtd: 45680,
};

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Market Cycles in 2025',
    slug: 'understanding-market-cycles-2025',
    excerpt: 'A comprehensive guide to navigating market cycles in the current economic environment.',
    content: 'Full blog content here...',
    cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    author: 'Research Team',
    published_at: '2025-01-15T00:00:00Z',
    tags: ['Markets', 'Analysis', 'Strategy'],
    status: 'published',
  },
  {
    id: '2',
    title: 'Gold vs Bitcoin: The Safe Haven Debate',
    slug: 'gold-vs-bitcoin-safe-haven',
    excerpt: 'Analyzing the role of gold and bitcoin as safe haven assets in modern portfolios.',
    content: 'Full blog content here...',
    cover_image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
    author: 'Research Team',
    published_at: '2025-01-10T00:00:00Z',
    tags: ['Gold', 'Bitcoin', 'Research'],
    status: 'published',
  },
];

export const mockUsers: User[] = [
  mockUser,
  { ...mockUser, id: '2', full_name: 'Sarah Chen', email: 'sarah@example.com', subscription_status: 'active' },
  { ...mockUser, id: '3', full_name: 'Michael Torres', email: 'mike@example.com', subscription_status: 'active' },
  { ...mockUser, id: '4', full_name: 'Emma Wilson', email: 'emma@example.com', subscription_status: 'expired', approved: true },
  { ...mockUser, id: '5', full_name: 'James Park', email: 'james@example.com', subscription_status: 'pending', approved: false },
  { ...mockUser, id: '6', full_name: 'Lisa Kumar', email: 'lisa@example.com', subscription_status: 'pending', approved: false },
];
