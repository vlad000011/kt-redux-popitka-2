import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

const initialState = {
  items: [],
  status: 'idle',
}

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async () => {
    const response = await client.get('/fakeServer/teachers')
    return response.data
  }
)

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'succeeded'
    })
  },
})

export const selectAllTeachers = (state) => state.teachers.items
export const selectTeacherById = (state, teacherId) =>
  state.teachers.items.find(t => t.id === teacherId)

export default teachersSlice.reducer
