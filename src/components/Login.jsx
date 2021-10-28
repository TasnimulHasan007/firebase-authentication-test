import { useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const { login, setIsLoading, setUser } = useAuth()

  const history = useHistory()
  const location = useLocation()

  const url = location.state?.from || '/'

  const emailRef = useRef('')
  const passRef = useRef('')

  const handleLogin = e => {
    e.preventDefault()

    const email = emailRef.current.value
    const pass = passRef.current.value

    login(email, pass)
      .then(res => {
        setIsLoading(true)
        setUser(res.user)
        history.push(url)
      })
      .catch(error => {
        console.log(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <form onSubmit={handleLogin}>
      <input ref={emailRef} type="email" placeholder="email" />
      <br />
      <input ref={passRef} type="password" placeholder="password" />
      <br />
      <input type="submit" value="Login" />
      <br />
      <br />
      <Link to="/register">Don't have an account?</Link>
    </form>
  )
}

export default Login
