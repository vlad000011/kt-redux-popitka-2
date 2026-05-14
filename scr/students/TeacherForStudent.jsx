import { useSelector } from 'react-redux'
export default function TeacherForStudent({ student }) {
  const teacher = useSelector(state =>
    state.teachers.find(
      t => t.id === student.teacher
    )
  )
  if (!teacher) {
    return <p>anonym</p>
  }
  return (
    <p>
      {teacher.name} ({teacher.subject})
    </p>
  )
}
