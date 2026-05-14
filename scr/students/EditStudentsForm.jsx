import { useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  useDispatch,
  useSelector,
} from 'react-redux'

import {
  selectStudentById,
  studentUpdated,
} from './studentsSlice'

export default function EditStudentForm() {
  const { studentId } = useParams()

  const student = useSelector(state =>
    selectStudentById(state, studentId)
  )

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [name, setName] = useState(student.name)
  const [surname, setSurname] = useState(student.surname)
  const [age, setAge] = useState(student.age)
  const [specialty, setSpecialty] = useState(student.specialty)

  const onSaveStudentClick = () => {
    dispatch(
      studentUpdated({
        id: studentId,
        name,
        surname,
        age,
        specialty,
      })
    )

    navigate(`/students/${studentId}`)
  }

  return (
    <div>
      <h2>Edit Student</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        value={surname}
        onChange={e => setSurname(e.target.value)}
      />

      <input
        value={age}
        onChange={e => setAge(e.target.value)}
      />

      <input
        value={specialty}
        onChange={e => setSpecialty(e.target.value)}
      />

      <button onClick={onSaveStudentClick}>
        Save
      </button>
    </div>
  )
}