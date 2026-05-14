import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { client } from '../api/client'

const initialState = {
  items: [],        // ← изменил с students на items
  status: 'idle',
  error: null,
}

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const response = await client.get('/fakeServer/students')
    return response.data
  }
)

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (newStudent) => {
    const response = await client.post('/fakeServer/students', newStudent)
    return response.data
  }
)

const studentsSlice = createSlice({
  name: 'students',
  initialState,

  reducers: {
    studentUpdated(state, action) {
      const { id, name, surname, age, specialty } = action.payload
      const student = state.items.find(s => s.id === id)
      if (student) {
        student.name = name
        student.surname = surname
        student.age = age
        student.specialty = specialty
      }
    },

    voteClicked(state, action) {
      const { studentId, voteName } = action.payload
      const student = state.items.find(s => s.id === studentId)
      if (student?.votes) {
        student.votes[voteName]++
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
  },
})

export const { studentUpdated, voteClicked } = studentsSlice.actions

export const selectAllStudents = (state) => state.students.items
export const selectStudentById = (state, studentId) =>
  state.students.items.find(student => student.id === studentId)

export default studentsSlice.reducer
