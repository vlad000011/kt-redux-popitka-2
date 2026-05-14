import { useEffect } from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'

import NewStudentForm from './NewStudentForm'
import StudentCard from './StudentCard'

import {
  fetchStudents,
  selectAllStudents,
} from './studentsSlice'

export default function StudentsList() {
  const dispatch = useDispatch()

  const students = useSelector(selectAllStudents)

  const studentStatus = useSelector(
    state => state.students.status
  )

  const error = useSelector(
    state => state.students.error
  )

  useEffect(() => {
    if (studentStatus === 'idle') {
      dispatch(fetchStudents())
    }
  }, [studentStatus, dispatch])

  let content

  if (studentStatus === 'loading') {
    content = <p>Loading...</p>
  }

  else if (studentStatus === 'succeeded') {
    content = students.map(student => (
      <StudentCard
        key={student.id}
        student={student}
      />
    ))
  }

  else if (studentStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <div>
      <NewStudentForm />

      <h2>Students</h2>

      {content}
    </div>
  )
}