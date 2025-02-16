import React, { ButtonHTMLAttributes } from 'react'
import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    default: 'button-default'
} as const

type ButtonType = keyof typeof BUTTON_TYPE_CLASSES

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    buttonType: ButtonType
}

const Button = ({children, buttonType, ...otherProps}: ButtonProps) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
        {children}
    </button>
  )
}

export default Button