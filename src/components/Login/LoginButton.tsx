import React from 'react'
import { Button } from 'rsuite'
import { login,signout } from '../../firebase/auth'

const LoginButton = () => {
  return (
    <div>
      <Button onClick={login}>in</Button>
      <Button onClick={signout}>out</Button>

    </div>
  )
}

export default LoginButton
