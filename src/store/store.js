import { configureStore } from '@reduxjs/toolkit'
import programsReducer from './programsSlice.js'
import resourcesReducer from './resourcesSlice.js'
import adminReducer from './adminSlice.js'

export const store = configureStore({
  reducer: {
    programs:  programsReducer,
    resources: resourcesReducer,
    admin:     adminReducer,
  },
})
