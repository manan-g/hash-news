import React from 'react'
import { Link } from 'react-router-dom'
import { StyledDarkButton } from './Button'

export default function SignUpButton() {
  return (
    <Link to = "/signup">
    <StyledDarkButton>Sign Up</StyledDarkButton>
    </Link>
  )
}
