import { createSlice } from '@reduxjs/toolkit'

const initialResources = [
  { id: 'res-001', emoji: '🧠', title: 'Understanding Anxiety in College', category: 'Mental Health', time: '5 min', description: 'Evidence-based strategies to recognize and manage academic anxiety before it escalates.', author: 'Dr. Sarah Park', date: '2024-12-10', views: 1240, status: 'active' },
  { id: 'res-002', emoji: '🍎', title: 'Eating Well on a Student Budget', category: 'Nutrition', time: '7 min', description: 'Simple, affordable meal ideas to fuel your brain and body throughout the semester.', author: 'Dietitian Chen', date: '2024-11-22', views: 892, status: 'active' },
  { id: 'res-003', emoji: '💪', title: '15-Minute Dorm Room Workouts', category: 'Fitness', time: '4 min', description: 'No equipment needed. Science-backed micro-workouts that actually fit your schedule.', author: 'Coach Marcus', date: '2025-01-05', views: 764, status: 'active' },
  { id: 'res-004', emoji: '🌙', title: 'Sleep Hygiene for Exam Season', category: 'Wellness', time: '6 min', description: 'How to protect your sleep even when deadlines loom and stress peaks.', author: 'Dr. Patel', date: '2025-01-18', views: 583, status: 'active' },
  { id: 'res-005', emoji: '🤝', title: 'Building Social Connections on Campus', category: 'Mental Health', time: '8 min', description: 'Loneliness is common. Here\'s how to build meaningful relationships from scratch.', author: 'Counseling Team', date: '2024-10-30', views: 421, status: 'active' },
  { id: 'res-006', emoji: '🌿', title: 'Nature & Mental Well-being', category: 'Wellness', time: '5 min', description: 'The science behind green spaces and why stepping outside matters for your health.', author: 'Dr. Rivera', date: '2024-12-01', views: 340, status: 'active' },
  { id: 'res-007', emoji: '📚', title: 'Managing Academic Stress Effectively', category: 'Mental Health', time: '9 min', description: 'Practical frameworks for balancing workload without burning out.', author: 'Dr. Sarah Park', date: '2025-02-01', views: 2100, status: 'active' },
  { id: 'res-008', emoji: '🏊', title: 'Swimming & Aquatic Wellness', category: 'Fitness', time: '5 min', description: 'Benefits of swimming for mental and physical health - plus how to access the campus pool.', author: 'Coach Marcus', date: '2025-01-28', views: 215, status: 'pending' },
  { id: 'res-009', emoji: '🥦', title: 'Plant-Based Eating for Beginners', category: 'Nutrition', time: '6 min', description: 'Transition to plant-based eating without sacrificing taste, convenience, or nutrients.', author: 'Dietitian Chen', date: '2025-02-10', views: 0, status: 'pending' },
]

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    list: initialResources,
    searchQuery: '',
    categoryFilter: 'All',
  },
  reducers: {
    setSearch(state, action)         { state.searchQuery = action.payload },
    setCategoryFilter(state, action) { state.categoryFilter = action.payload },
    addResource(state, action)       { state.list.unshift(action.payload) },
    updateResource(state, action) {
      const idx = state.list.findIndex(r => r.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
    toggleResourceStatus(state, action) {
      const res = state.list.find(r => r.id === action.payload)
      if (res) {
        if (res.status === 'active') res.status = 'inactive'
        else if (res.status === 'inactive') res.status = 'active'
        else if (res.status === 'pending') res.status = 'active'
      }
    },
    deleteResource(state, action) {
      state.list = state.list.filter(r => r.id !== action.payload)
    },
  },
})

export const { setSearch, setCategoryFilter, addResource, updateResource, toggleResourceStatus, deleteResource } = resourcesSlice.actions
export default resourcesSlice.reducer
