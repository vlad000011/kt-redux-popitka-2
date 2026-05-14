import { useState } from 'react'
import {
  useDispatch,
  useSelector,
} from 'react-redux'
import { addStudent } from './studentsSlice'
export default function NewStudentForm() {
  const dispatch = useDispatch()
  const teachers = useSelector(
    state => state.teachers
  )
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [teacher, setTeacher] = useState('')
  const [requestStatus, setRequestStatus] =
    useState('idle')
  const canBeSaved =
    [name, surname, age, specialty].every(Boolean)
    && requestStatus === 'idle'
  const onSaveStudentClick = async () => {
    if (canBeSaved) {
      try {
        setRequestStatus('pending')
        await dispatch(
          addStudent({
            name,
            surname,
            age,
            specialty,
            teacher,
          })
        ).unwrap()
        setName('')
        setSurname('')
        setAge('')
        setSpecialty('')
      }
      catch (err) {
        console.error(err)
      }
      finally {
        setRequestStatus('idle')
      }
    }
  }
  const teachersList = teachers.map(teacher => (
    <option
      key={teacher.id}
      value={teacher.id}
    >
      {teacher.name}
    </option>
  ))
  return (
    <form>
      <h2>New Student</h2>
      <p>
        <input
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </p>
      <p>
        <input
          placeholder='Surname'
          value={surname}
          onChange={e => setSurname(e.target.value)}
        />
      </p>
      <p>
        <input
          placeholder='Age'
          value={age}
          onChange={e => setAge(e.target.value)}
        />
      </p>
      <p>
        <input
          placeholder='Specialty'
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
        />
      </p>
      <p>
        <select
          value={teacher}
          onChange={e => setTeacher(e.target.value)}
        >
          <option value=''>Teacher</option>
          {teachersList}
        </select>
      </p>
      <button
        type='button'
        onClick={onSaveStudentClick}
      >
        Save
      </button>
    </form>
  )
}
