import {
  useDispatch,
} from 'react-redux'
import { voteClicked } from './studentsSlice'
const votesObj = {
  leader: 'GL',
  captain: 'TC',
}
export default function UserVotes({ student }) {
  const dispatch = useDispatch()
  const renderedVotes = Object.entries(votesObj)
    .map(([name, image]) => {
      return (
        <button
          key={name}
          onClick={() => dispatch(
            voteClicked({
              studentId: student.id,
              voteName: name,
            })
          )}
        >
          {image} {student.votes[name]}
        </button>
      )
    })
  return <div>{renderedVotes}</div>
}
