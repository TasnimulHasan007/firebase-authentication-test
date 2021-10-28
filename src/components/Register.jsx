import { useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Register = () => {
  const { signUp, updateName, setIsLoading, setUser } = useAuth()

  const history = useHistory()
  const location = useLocation()
  const url = location.state?.from || '/'

  const nameRef = useRef('')
  const emailRef = useRef('')
  const passRef = useRef('')

  const handleRegister = e => {
    e.preventDefault()
    const name = nameRef.current.value
    const email = emailRef.current.value
    const pass = passRef.current.value

    signUp(email, pass)
      .then(res => {
        setIsLoading(true)
        updateName(name)
        setUser(res.user)
        history.push(url)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <form onSubmit={handleRegister}>
      <input
        ref={nameRef}
        type="text"
        placeholder="name"
        required
        autoComplete="disabled"
      />
      <br />
      <input ref={emailRef} type="email" placeholder="email" required />
      <br />
      <input ref={passRef} type="password" placeholder="password" required />
      <br />
      <input type="submit" value="Register" required />
      <br />
      <br />
      <Link to="/login">Already registered?</Link>
    </form>
  )
}

export default Register
