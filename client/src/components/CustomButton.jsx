import { color } from 'framer-motion'
import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'

const CustomButton = ({ customStyles = '', type, handleClick, tittle, children }) => {
  const snap = useSnapshot(state)
  const generateStyle = (type) => {
    switch (type) {
      case 'primary':
        return { backgroundColor: snap.color, color: 'white' }
      case 'secondary':
        return { backgroundColor: '#000', color: '#fff' }
      default:
        return {}
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      onClick={handleClick}
      style={generateStyle(type)}
    >
      {children ? children : tittle}
    </button>
  )
}

export default CustomButton
