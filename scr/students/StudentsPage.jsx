import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  selectStudentById,
} from './studentsSlice'

import TeacherForStudent from './TeacherForStudent'
import UserVotes from './UserVotes'

export default function StudentPage() {
  const { studentId } = useParams()

  const student = useSelector(state =>
    selectStudentById(state, studentId)
  )

  if (!student) {
    return <p>Student not found</p>
  }

  return (
    <div>
      <h2>
        {student.name} {student.surname}
      </h2>

      <p>Age: {student.age}</p>
      <p>Specialty: {student.specialty}</p>

      <TeacherForStudent student={student} />

      <UserVotes student={student} />

      <Link to={`/students/edit/${student.id}`}>
        Edit student
      </Link>
    </div>
  )
}