import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import TodoPage from './pages/TodoPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index element={<SignInPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
