import { Link } from 'react-router-dom'

import TeacherForStudent from './TeacherForStudent'
import UserVotes from './UserVotes'

export default function StudentCard({ student }) {
  return (
    <div>
      <Link to={`/students/${student.id}`}>
        {student.name} {student.surname}
      </Link>

      <p>{student.specialty}</p>

      <TeacherForStudent student={student} />

      <UserVotes student={student} />

      <hr />
    </div>
  )
}
