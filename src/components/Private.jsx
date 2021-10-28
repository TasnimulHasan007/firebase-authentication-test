import useAuth from '../hooks/useAuth'

const Private = () => {
  const { user } = useAuth()
  console.log(user)
  return (
    <div>
      <p>private route</p>
    </div>
  )
}

export default Private
