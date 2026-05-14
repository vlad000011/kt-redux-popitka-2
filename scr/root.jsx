import { NavLink, Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <div>
      <h1>I'm number one in React!</h1>

      <nav>
        <ul>
          <li>
            <NavLink to='/students'>Students</NavLink>
          </li>

          <li>
            <NavLink to='/teachers'>Teachers</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
}