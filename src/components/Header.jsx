import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const { user, logOut } = useAuth()
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/private">private</Link>

      {user.email ? (
        <>
          <span>{user.displayName}</span>
          <button onClick={logOut}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/login">login</Link>
          <Link to="/register">register</Link>
        </>
      )}
    </div>
  )
}

export default Header
