import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from './students/studentsSlice'
import teachersReducer from './teachers/teachersSlice'

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teachersReducer,
  },
})

export default store
