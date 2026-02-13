import { create } from 'zustand';
import type { User, MacroIndicator, Report, NewsItem, ChatMessage, Session, AdminStats, BlogPost, Announcement } from '../types';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// Dashboard Store
interface DashboardState {
  macroIndicators: MacroIndicator[];
  reports: Record<string, Report[]>;
  news: NewsItem[];
  setMacroIndicators: (indicators: MacroIndicator[]) => void;
  setReports: (module: string, reports: Report[]) => void;
  setNews: (news: NewsItem[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  macroIndicators: [],
  reports: {},
  news: [],
  setMacroIndicators: (indicators) => set({ macroIndicators: indicators }),
  setReports: (module, reports) => set((state) => ({
    reports: { ...state.reports, [module]: reports }
  })),
  setNews: (news) => set({ news }),
}));

// Chat Store
interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  addMessage: (message: ChatMessage) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  setIsOpen: (isOpen) => set({ isOpen }),
  setIsLoading: (isLoading) => set({ isLoading }),
  clearMessages: () => set({ messages: [] }),
}));

// Admin Store
interface AdminState {
  stats: AdminStats | null;
  sessions: Session[];
  users: User[];
  announcements: Announcement[];
  blogPosts: BlogPost[];
  setStats: (stats: AdminStats) => void;
  setSessions: (sessions: Session[]) => void;
  setUsers: (users: User[]) => void;
  setAnnouncements: (announcements: Announcement[]) => void;
  setBlogPosts: (posts: BlogPost[]) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  stats: null,
  sessions: [],
  users: [],
  announcements: [],
  blogPosts: [],
  setStats: (stats) => set({ stats }),
  setSessions: (sessions) => set({ sessions }),
  setUsers: (users) => set({ users }),
  setAnnouncements: (announcements) => set({ announcements }),
  setBlogPosts: (posts) => set({ blogPosts: posts }),
}));

// UI Store
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  currentPage: string;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentPage: (page: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  currentPage: 'home',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
