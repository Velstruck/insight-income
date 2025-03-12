import React, { useState } from 'react'

const Input = ({value, onChange, placeholder,label,type}) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

  return (
    <div>
        <label className=''>{label}</label>
        <div>
            
        </div>
    </div>
  )
}

export default Input