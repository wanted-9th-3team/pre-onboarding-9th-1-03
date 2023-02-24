import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../apis/user-api'
import { emailRegex, passwordRegex } from '../utils/regex'

function SignUp() {
  const navigate = useNavigate()
  const [formIsValid, setFormIsValid] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  useEffect(() => {
    if (
      !(
        emailRegex(email) &&
        passwordRegex(password) &&
        password === passwordConfirm
      )
    ) {
      setFormIsValid(false)
      return
    }
    setFormIsValid(true)
  }, [password, email, passwordConfirm])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const signUpResponse = await signUp({ email, password })
    if (signUpResponse.status === 201) {
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
      navigate('/signin')
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
  const confirmPasswordChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const passwordConfirmInput = event.target.value
    setPasswordConfirm(passwordConfirmInput)
  }

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN') !== null) {
      navigate('/todo')
    }
  }, [localStorage.getItem('ACCESS_TOKEN')])

  return (
    <div>
      <h1>Sign up</h1>
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
        <label htmlFor="passwordConfirm">Password Confirm</label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          required
          onChange={confirmPasswordChangeHandler}
        />
        <div>
          <button type="submit" disabled={!formIsValid}>
            sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
