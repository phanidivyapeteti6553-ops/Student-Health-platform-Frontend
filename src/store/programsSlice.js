import { createSlice } from '@reduxjs/toolkit'

const initialPrograms = [
  {
    id: 'prog-001',
    emoji: '🧘',
    title: 'Mindfulness & Stress Relief',
    description: '8-week program combining meditation, breathwork, and journaling to lower cortisol and improve focus.',
    category: 'Mental Health',
    duration: '8 weeks',
    sessions: 24,
    level: 'Beginner',
    enrolled: 312,
    progress: 0,
    color: '#9b89b415',
    colorSolid: '#9b89b4',
    status: 'active',
  },
  {
    id: 'prog-002',
    emoji: '🏃',
    title: 'Campus Fitness Challenge',
    description: '30-day movement challenge with guided workouts designed for dorm-room and campus gym settings.',
    category: 'Fitness',
    duration: '30 days',
    sessions: 30,
    level: 'Intermediate',
    enrolled: 527,
    progress: 0,
    color: '#c4824a15',
    colorSolid: '#c4824a',
    status: 'active',
  },
  {
    id: 'prog-003',
    emoji: '🥗',
    title: 'Balanced Nutrition for Students',
    description: 'Practical meal-planning on a budget: campus dining hacks, grocery guides, and easy dorm recipes.',
    category: 'Nutrition',
    duration: '4 weeks',
    sessions: 12,
    level: 'Beginner',
    enrolled: 198,
    progress: 80,
    color: '#4a7c5915',
    colorSolid: '#4a7c59',
    status: 'active',
  },
  {
    id: 'prog-004',
    emoji: '😴',
    title: 'Sleep Optimization Program',
    description: 'Science-backed strategies to improve sleep quality and consistency, especially during exam season.',
    category: 'Wellness',
    duration: '2 weeks',
    sessions: 10,
    level: 'All Levels',
    enrolled: 144,
    progress: 0,
    color: '#6aaccc15',
    colorSolid: '#6aaccc',
    status: 'active',
  },
  {
    id: 'prog-005',
    emoji: '🤸',
    title: 'Flexibility & Recovery',
    description: 'Daily stretching and mobility routines to prevent injury, reduce muscle tension, and aid recovery.',
    category: 'Fitness',
    duration: '3 weeks',
    sessions: 15,
    level: 'Beginner',
    enrolled: 89,
    progress: 0,
    color: '#c4824a15',
    colorSolid: '#c4824a',
    status: 'active',
  },
  {
    id: 'prog-006',
    emoji: '🧠',
    title: 'Cognitive Wellness Bootcamp',
    description: 'Brain-training exercises, focus protocols, and digital detox strategies for peak academic performance.',
    category: 'Mental Health',
    duration: '6 weeks',
    sessions: 18,
    level: 'Advanced',
    enrolled: 76,
    progress: 0,
    color: '#9b89b415',
    colorSolid: '#9b89b4',
    status: 'active',
  },
]

const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    list: initialPrograms,
    filter: 'All',
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload
    },
    updateProgress(state, action) {
      const { id, progress } = action.payload
      const prog = state.list.find(p => p.id === id)
      if (prog) prog.progress = progress
    },
    addProgram(state, action) {
      state.list.push(action.payload)
    },
    updateProgram(state, action) {
      const idx = state.list.findIndex(p => p.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
    toggleProgramStatus(state, action) {
      const prog = state.list.find(p => p.id === action.payload)
      if (prog) prog.status = prog.status === 'active' ? 'inactive' : 'active'
    },
  },
})

export const { setFilter, updateProgress, addProgram, updateProgram, toggleProgramStatus } = programsSlice.actions
export default programsSlice.reducer
