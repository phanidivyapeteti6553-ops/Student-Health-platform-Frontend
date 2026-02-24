import { useQuery } from '@tanstack/react-query'

/* Simulated async fetch (replace with real API calls later) */
const delay = (ms) => new Promise(res => setTimeout(res, ms))

/* ── Fetch wellness score for a user ── */
export function useWellnessScore(userId) {
  return useQuery({
    queryKey: ['wellnessScore', userId],
    queryFn: async () => {
      await delay(400)
      return {
        overall: 70,
        dimensions: [
          { label: 'Mental',    value: 72, color: '#9b89b4' },
          { label: 'Physical',  value: 58, color: '#4a7c59' },
          { label: 'Social',    value: 84, color: '#6aaccc' },
          { label: 'Sleep',     value: 64, color: '#c4824a' },
          { label: 'Nutrition', value: 70, color: '#7fb99a' },
        ],
      }
    },
    enabled: !!userId,
  })
}

/* ── Fetch upcoming appointments ── */
export function useAppointments(userId) {
  return useQuery({
    queryKey: ['appointments', userId],
    queryFn: async () => {
      await delay(300)
      return [
        { id: 'apt-1', provider: 'Dr. Emily Park',  type: 'Counseling', date: 'Tomorrow',  time: '10:00 AM', color: '#9b89b4' },
        { id: 'apt-2', provider: 'Nurse Rivera',     type: 'Check-up',   date: 'Mar 2',     time: '2:30 PM',  color: '#6aaccc' },
        { id: 'apt-3', provider: 'Dr. Chen',         type: 'Nutrition',  date: 'Mar 8',     time: '11:00 AM', color: '#4a7c59' },
      ]
    },
    enabled: !!userId,
  })
}

/* ── Fetch platform stats (admin) ── */
export function usePlatformStats() {
  return useQuery({
    queryKey: ['platformStats'],
    queryFn: async () => {
      await delay(500)
      return {
        activeStudents:   2847,
        weeklyUsers:      1832,
        appointments:     38,
        satisfaction:     '91%',
        avgWellness:      68.4,
        totalEnrollments: 1204,
      }
    },
  })
}

/* ── Fetch top resources ── */
export function useTopResources() {
  return useQuery({
    queryKey: ['topResources'],
    queryFn: async () => {
      await delay(350)
      return [
        { title: 'Managing Academic Stress',       views: 2100, category: 'Mental Health', avgTime: '9 min' },
        { title: 'Understanding Anxiety in College', views: 1240, category: 'Mental Health', avgTime: '6 min' },
        { title: 'Eating Well on a Student Budget', views: 892,  category: 'Nutrition',     avgTime: '7 min' },
        { title: 'Sleep Hygiene for Exam Season',   views: 583,  category: 'Wellness',      avgTime: '6 min' },
        { title: '15-Minute Dorm Room Workouts',    views: 764,  category: 'Fitness',        avgTime: '4 min' },
      ]
    },
  })
}
