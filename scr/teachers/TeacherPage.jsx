import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectTeacherById,
} from './teachersSlice'
export default function TeacherPage() {
  const { teacherId } = useParams()
  const teacher = useSelector(state =>
    selectTeacherById(state, teacherId)
  )
  const students = useSelector(state =>
    state.students.students.filter(
      s => s.teacher === teacherId
    )
  )
  const studentsList = students.map(student => (
    <li key={student.id}>
      <Link to={`/students/${student.id}`}>
        {student.name} {student.surname}
      </Link>
    </li>
  ))
  return (
    <div>
      <h2>{teacher.name}</h2>
      <h3>{teacher.subject}</h3>
      <ul>{studentsList}</ul>
    </div>
  )
}
