import {
  createSlice,
  createAsyncThunk,
  nanoid,
} from '@reduxjs/toolkit'

import { client } from '../api/client'

const initialState = {
  students: [],
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
  async (student) => {
    const response = await client.post('/fakeServer/students', student)
    return response.data
  }
)

const studentsSlice = createSlice({
  name: 'students',
  initialState,

  reducers: {
    studentAdded: {
      reducer(state, action) {
        state.students.push(action.payload)
      },

      prepare(name, surname, age, specialty, teacher) {
        return {
          payload: {
            id: nanoid(),
            name,
            surname,
            age,
            specialty,
            teacher,
            votes: {
              leader: 0,
              captain: 0,
            },
          },
        }
      },
    },

    studentUpdated(state, action) {
      const {
        id,
        name,
        surname,
        age,
        specialty,
      } = action.payload

      const student = state.students.find(s => s.id === id)

      if (student) {
        student.name = name
        student.surname = surname
        student.age = age
        student.specialty = specialty
      }
    },

    voteClicked(state, action) {
      const { studentId, voteName } = action.payload

      const student = state.students.find(
        s => s.id === studentId
      )

      if (student) {
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
        state.students = action.payload
      })

      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload)
      })
  },
})

export const {
  studentAdded,
  studentUpdated,
  voteClicked,
} = studentsSlice.actions

export const selectAllStudents = (state) =>
  state.students.students

export const selectStudentById = (state, studentId) =>
  state.students.students.find(
    student => student.id === studentId
  )

export default studentsSlice.reducer