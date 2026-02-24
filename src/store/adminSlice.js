import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    metrics: {
      activeStudents: 2847,
      weeklyActiveUsers: 1832,
      appointmentsToday: 38,
      appointmentsMonth: 286,
      satisfactionRate: 91,
      avgWellnessScore: 68.4,
      totalEnrollments: 1204,
      resourcesPublished: 134,
    },
    usageData: [
      { week: 'Jan W1', users: 1420, appointments: 62 },
      { week: 'Jan W2', users: 1580, appointments: 71 },
      { week: 'Jan W3', users: 1690, appointments: 68 },
      { week: 'Jan W4', users: 1750, appointments: 74 },
      { week: 'Feb W1', users: 1832, appointments: 80 },
    ],
    announcements: [
      { id: 'ann-001', title: 'New Peer Support Group Starting', body: 'A new anxiety support group meets every Wednesday at 5 PM in the Counseling Center.', date: '2025-02-18', priority: 'high' },
      { id: 'ann-002', title: 'Wellness Week — Feb 24–28', body: 'Join us for a week of free yoga, nutrition workshops, and mindfulness sessions on campus.', date: '2025-02-20', priority: 'medium' },
    ],
    adminTab: 'overview',
  },
  reducers: {
    setAdminTab(state, action) { state.adminTab = action.payload },
    addAnnouncement(state, action) { state.announcements.unshift(action.payload) },
    removeAnnouncement(state, action) {
      state.announcements = state.announcements.filter(a => a.id !== action.payload)
    },
  },
})

export const { setAdminTab, addAnnouncement, removeAnnouncement } = adminSlice.actions
export default adminSlice.reducer
