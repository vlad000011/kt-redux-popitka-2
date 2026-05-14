import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { client } from '../api/client'
export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async () => {
    const response = await client.get('/fakeServer/teachers')
    return response.data
  }
)
const teachersSlice = createSlice({
  name: 'teachers',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchTeachers.fulfilled,
      (state, action) => {
        return action.payload
      }
    )
  },
})
export const selectAllTeachers = state =>
  state.teachers
export const selectTeacherById = (
  state,
  teacherId
) =>
  state.teachers.find(
    teacher => teacher.id === teacherId
  )
export default teachersSlice.reducer