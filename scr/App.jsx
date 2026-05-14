import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Root from './root'

import StudentsList from './students/StudentsList'
import StudentPage from './students/StudentPage'
import EditStudentForm from './students/EditStudentForm'

import TeachersList from './teachers/TeachersList'
import TeacherPage from './teachers/TeacherPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='students' element={<StudentsList />} />
          <Route path='students/:studentId' element={<StudentPage />} />
          <Route path='students/edit/:studentId' element={<EditStudentForm />} />

          <Route path='teachers' element={<TeachersList />} />
          <Route path='teachers/:teacherId' element={<TeacherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}