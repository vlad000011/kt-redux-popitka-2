import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectAllTeachers,
} from './teachersSlice'
export default function TeachersList() {
  const teachers = useSelector(selectAllTeachers)
  const teachersToRender = teachers.map(teacher => (
    <li key={teacher.id}>
      <Link to={`/teachers/${teacher.id}`}>
        {teacher.name}
      </Link>
      ({teacher.subject})
    </li>
  ))
  return (
    <div>
      <h2>Teachers</h2>
      <ul>{teachersToRender}</ul>
    </div>
  )
}