import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  children as initialChildren,
  initialMessages,
  initialAlerts,
  initialAnnouncements,
  type Child,
  type Message,
  type Alert,
  type Announcement,
} from '../data/mockData';

export type Role = 'parent' | 'staff' | 'admin' | null;
export type ParentPage = 'dashboard' | 'profile' | 'messages' | 'activity' | 'payment';
export type StaffPage = 'attendance' | 'alerts' | 'messages' | 'activities' | 'transport';
export type AdminPage = 'overview' | 'attendance' | 'logs' | 'messages' | 'payments' | 'announcements';

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  parentPage: ParentPage;
  setParentPage: (p: ParentPage) => void;
  staffPage: StaffPage;
  setStaffPage: (p: StaffPage) => void;
  adminPage: AdminPage;
  setAdminPage: (p: AdminPage) => void;
  children: Child[];
  updateChildStatus: (id: string, status: Child['status']) => void;
  messages: Message[];
  addMessage: (text: string, sender: 'parent' | 'staff') => void;
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  markAlertRead: (id: string) => void;
  announcements: Announcement[];
  addAnnouncement: (a: Omit<Announcement, 'id'>) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children: childrenProp }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [parentPage, setParentPage] = useState<ParentPage>('dashboard');
  const [staffPage, setStaffPage] = useState<StaffPage>('attendance');
  const [adminPage, setAdminPage] = useState<AdminPage>('overview');
  const [childrenState, setChildrenState] = useState<Child[]>(initialChildren);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [toast, setToast] = useState<string | null>(null);

  const updateChildStatus = useCallback((id: string, status: Child['status']) => {
    setChildrenState(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  }, []);

  const addMessage = useCallback((text: string, sender: 'parent' | 'staff') => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const time = `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
    setMessages(prev => [...prev, { id: `m${Date.now()}`, text, sender, time }]);
  }, []);

  const addAlert = useCallback((alert: Omit<Alert, 'id'>) => {
    setAlerts(prev => [{ ...alert, id: `al${Date.now()}` }, ...prev]);
  }, []);

  const markAlertRead = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }, []);

  const addAnnouncement = useCallback((a: Omit<Announcement, 'id'>) => {
    setAnnouncements(prev => [{ ...a, id: `ann${Date.now()}` }, ...prev]);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <AppContext.Provider value={{
      role, setRole,
      parentPage, setParentPage,
      staffPage, setStaffPage,
      adminPage, setAdminPage,
      children: childrenState, updateChildStatus,
      messages, addMessage,
      alerts, addAlert, markAlertRead,
      announcements, addAnnouncement,
      toast, showToast,
    }}>
      {childrenProp}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
