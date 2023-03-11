import React from 'react'
import { Link } from 'react-router-dom'

export default function ProtectedRoute({ children, ...props }) {
  return props.loggedIn ? children : <Link  to='/' />
}