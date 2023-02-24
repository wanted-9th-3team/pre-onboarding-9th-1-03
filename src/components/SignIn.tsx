import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../apis/user-api'
import { emailRegex, passwordRegex } from '../utils/regex'

function SignIn() {
  const navigate = useNavigate()
  const [formIsValid, setFormIsValid] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!(emailRegex(email) && passwordRegex(password))) {
      setFormIsValid(false)
      return
    }
    setFormIsValid(true)
  }, [password, email])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const signInResponse = await signIn({ email, password })
    if (signInResponse.status === 200) {
      localStorage.setItem('ACCESS_TOKEN', signInResponse.data.access_token)
      setEmail('')
      setPassword('')
    }
  }
  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const emailInput = event.target.value
    setEmail(emailInput)
  }

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const passwordInput = event.target.value
    setPassword(passwordInput)
  }

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN') !== null) {
      navigate('/todo')
    }
  }, [localStorage.getItem('ACCESS_TOKEN')])

  return (
    <div>
      <h1>Sign in</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          onChange={emailChangeHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          required
          onChange={passwordChangeHandler}
        />
        <div>
          <button
            type="submit"
            disabled={!formIsValid}
            style={{ marginRight: '10px' }}
          >
            log in
          </button>
          <button type="button" onClick={() => navigate('/signup')}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
