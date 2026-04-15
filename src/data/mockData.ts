// ============================================
// KinderBase — Mock Data
// ============================================

export interface Child {
  id: string;
  name: string;
  age: number;
  classroom: string;
  parentName: string;
  parentId: string;
  avatar: string;
  avatarBg: string;
  allergies: string[];
  emergencyContact: string;
  status: 'present' | 'absent' | 'late' | 'on-way';
}

export interface Activity {
  id: string;
  childId: string;
  type: 'meal' | 'nap' | 'play' | 'diaper' | 'note' | 'photo';
  title: string;
  description: string;
  time: string;
  staffName: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'parent' | 'staff';
  time: string;
}

export interface Alert {
  id: string;
  parentName: string;
  childName: string;
  type: 'absent' | 'late' | 'on-way';
  message: string;
  time: string;
  read: boolean;
  avatarBg: string;
  avatar: string;
}

export interface Payment {
  id: string;
  parentName: string;
  childName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  plan: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  audience: string;
}

// ---- Children ----
export const children: Child[] = [
  { id: 'c1', name: 'Emma Thompson', age: 4, classroom: 'Butterflies', parentName: 'Sarah Thompson', parentId: 'p1', avatar: 'ET', avatarBg: '#DBEAFE', allergies: ['Peanuts'], emergencyContact: '(555) 123-4567', status: 'present' },
  { id: 'c2', name: 'Liam Johnson', age: 3, classroom: 'Ladybugs', parentName: 'Michael Johnson', parentId: 'p2', avatar: 'LJ', avatarBg: '#D1FAE5', allergies: [], emergencyContact: '(555) 234-5678', status: 'present' },
  { id: 'c3', name: 'Sophia Martinez', age: 5, classroom: 'Butterflies', parentName: 'Maria Martinez', parentId: 'p3', avatar: 'SM', avatarBg: '#FEF3C7', allergies: ['Dairy'], emergencyContact: '(555) 345-6789', status: 'absent' },
  { id: 'c4', name: 'Noah Williams', age: 4, classroom: 'Sunflowers', parentName: 'David Williams', parentId: 'p4', avatar: 'NW', avatarBg: '#CCFBF1', allergies: [], emergencyContact: '(555) 456-7890', status: 'present' },
  { id: 'c5', name: 'Olivia Brown', age: 3, classroom: 'Ladybugs', parentName: 'Jennifer Brown', parentId: 'p5', avatar: 'OB', avatarBg: '#FEE2E2', allergies: ['Eggs'], emergencyContact: '(555) 567-8901', status: 'late' },
  { id: 'c6', name: 'Ethan Davis', age: 5, classroom: 'Sunflowers', parentName: 'Robert Davis', parentId: 'p6', avatar: 'ED', avatarBg: '#E0E7FF', allergies: [], emergencyContact: '(555) 678-9012', status: 'present' },
  { id: 'c7', name: 'Ava Wilson', age: 4, classroom: 'Butterflies', parentName: 'Lisa Wilson', parentId: 'p7', avatar: 'AW', avatarBg: '#FCE7F3', allergies: ['Gluten'], emergencyContact: '(555) 789-0123', status: 'on-way' },
  { id: 'c8', name: 'Mason Taylor', age: 3, classroom: 'Ladybugs', parentName: 'Chris Taylor', parentId: 'p8', avatar: 'MT', avatarBg: '#DBEAFE', allergies: [], emergencyContact: '(555) 890-1234', status: 'present' },
];

// ---- Activities ----
export const activities: Activity[] = [
  { id: 'a1', childId: 'c1', type: 'meal', title: 'Morning Snack', description: 'Emma ate apple slices and crackers. Drank all her milk.', time: '9:30 AM', staffName: 'Ms. Rachel' },
  { id: 'a2', childId: 'c1', type: 'play', title: 'Outdoor Play', description: 'Enjoyed sandbox time with friends. Built a sandcastle!', time: '10:15 AM', staffName: 'Ms. Rachel' },
  { id: 'a3', childId: 'c1', type: 'nap', title: 'Nap Time', description: 'Slept from 12:30 to 2:00 PM. Peaceful rest.', time: '12:30 PM', staffName: 'Ms. Kim' },
  { id: 'a4', childId: 'c1', type: 'meal', title: 'Lunch', description: 'Had pasta with vegetables and fruit salad. Ate well.', time: '11:45 AM', staffName: 'Ms. Rachel' },
  { id: 'a5', childId: 'c1', type: 'diaper', title: 'Diaper Change', description: 'Clean diaper change. All good!', time: '2:15 PM', staffName: 'Ms. Kim' },
  { id: 'a6', childId: 'c1', type: 'note', title: 'Teacher Note', description: 'Emma was very engaged during story time today. She\'s making great progress with her letters!', time: '3:00 PM', staffName: 'Ms. Rachel' },
  { id: 'a7', childId: 'c1', type: 'photo', title: 'Art Project', description: 'Emma painted a beautiful picture of her family today.', time: '2:45 PM', staffName: 'Ms. Rachel' },
  { id: 'a8', childId: 'c2', type: 'meal', title: 'Morning Snack', description: 'Liam enjoyed banana and yogurt.', time: '9:30 AM', staffName: 'Mr. James' },
  { id: 'a9', childId: 'c2', type: 'play', title: 'Circle Time', description: 'Great participation in songs and counting.', time: '10:00 AM', staffName: 'Mr. James' },
  { id: 'a10', childId: 'c2', type: 'nap', title: 'Nap Time', description: 'Rested well for 1.5 hours.', time: '12:30 PM', staffName: 'Mr. James' },
];

// ---- Messages ----
export const initialMessages: Message[] = [
  { id: 'm1', text: 'Good morning! Emma is excited about art class today.', sender: 'parent', time: '8:15 AM' },
  { id: 'm2', text: 'That\'s wonderful! We have a special art project planned. She\'ll love it!', sender: 'staff', time: '8:22 AM' },
  { id: 'm3', text: 'Great! Also, she had a light breakfast today so she might be hungry for snack time.', sender: 'parent', time: '8:25 AM' },
  { id: 'm4', text: 'Noted! We\'ll make sure she gets a good snack. Don\'t worry, we\'ll take great care of her. 😊', sender: 'staff', time: '8:30 AM' },
  { id: 'm5', text: 'Thank you so much! You guys are amazing.', sender: 'parent', time: '8:32 AM' },
];

// ---- Alerts ----
export const initialAlerts: Alert[] = [
  { id: 'al1', parentName: 'Maria Martinez', childName: 'Sophia Martinez', type: 'absent', message: 'Sophia will be absent today — not feeling well.', time: '7:45 AM', read: false, avatarBg: '#FEF3C7', avatar: 'MM' },
  { id: 'al2', parentName: 'Jennifer Brown', childName: 'Olivia Brown', type: 'late', message: 'Running about 15 minutes late. Doctor appointment ran over.', time: '8:10 AM', read: false, avatarBg: '#FEE2E2', avatar: 'JB' },
  { id: 'al3', parentName: 'Lisa Wilson', childName: 'Ava Wilson', type: 'on-way', message: 'On our way! Should arrive in about 10 minutes.', time: '8:20 AM', read: true, avatarBg: '#FCE7F3', avatar: 'LW' },
  { id: 'al4', parentName: 'Sarah Thompson', childName: 'Emma Thompson', type: 'on-way', message: 'Heading out now. See you soon!', time: '7:55 AM', read: true, avatarBg: '#DBEAFE', avatar: 'ST' },
];

// ---- Payments ----
export const payments: Payment[] = [
  { id: 'pay1', parentName: 'Sarah Thompson', childName: 'Emma Thompson', amount: 1200, status: 'paid', date: 'Apr 1, 2025', plan: 'Full-Day Care' },
  { id: 'pay2', parentName: 'Michael Johnson', childName: 'Liam Johnson', amount: 1200, status: 'paid', date: 'Apr 1, 2025', plan: 'Full-Day Care' },
  { id: 'pay3', parentName: 'Maria Martinez', childName: 'Sophia Martinez', amount: 800, status: 'pending', date: 'Apr 1, 2025', plan: 'Half-Day Care' },
  { id: 'pay4', parentName: 'David Williams', childName: 'Noah Williams', amount: 1200, status: 'paid', date: 'Apr 1, 2025', plan: 'Full-Day Care' },
  { id: 'pay5', parentName: 'Jennifer Brown', childName: 'Olivia Brown', amount: 800, status: 'overdue', date: 'Mar 1, 2025', plan: 'Half-Day Care' },
  { id: 'pay6', parentName: 'Robert Davis', childName: 'Ethan Davis', amount: 1500, status: 'paid', date: 'Apr 1, 2025', plan: 'Premium Care' },
  { id: 'pay7', parentName: 'Lisa Wilson', childName: 'Ava Wilson', amount: 1200, status: 'pending', date: 'Apr 1, 2025', plan: 'Full-Day Care' },
  { id: 'pay8', parentName: 'Chris Taylor', childName: 'Mason Taylor', amount: 800, status: 'paid', date: 'Apr 1, 2025', plan: 'Half-Day Care' },
];

// ---- Announcements ----
export const initialAnnouncements: Announcement[] = [
  { id: 'ann1', title: 'Spring Photo Day — April 18th', body: 'Reminder: Spring photo day is this Friday! Please dress your little ones in their best outfits. Individual and class photos will be taken.', author: 'Admin Team', date: 'Apr 14, 2025', audience: 'All Parents' },
  { id: 'ann2', title: 'Updated Pick-Up Policy', body: 'Starting April 21st, all pick-ups after 5:30 PM will require prior notification. Please update your pick-up schedule in the app if needed.', author: 'Director', date: 'Apr 12, 2025', audience: 'All Parents' },
  { id: 'ann3', title: 'Staff Training Day — April 25th', body: 'The center will close at 3:00 PM on April 25th for staff professional development. Please arrange early pick-up.', author: 'Admin Team', date: 'Apr 10, 2025', audience: 'All Parents & Staff' },
];

// ---- Plans ----
export const plans = [
  { id: 'plan1', name: 'Half-Day Care', price: 800, description: 'Morning program (7 AM – 12 PM)', features: ['Structured learning', 'Snack included', 'Outdoor play'] },
  { id: 'plan2', name: 'Full-Day Care', price: 1200, description: 'Full program (7 AM – 5:30 PM)', features: ['All meals included', 'Nap time', 'Extended activities'] },
  { id: 'plan3', name: 'Premium Care', price: 1500, description: 'Full program + enrichment', features: ['Everything in Full-Day', 'Music & art classes', 'Weekly progress reports'] },
];
