import React from 'react'

const Wallet = ({ width = 16, height = 13 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="14" height="11" rx="2" stroke="#141414" stroke-width="1.3"/>
    <path d="M4 8.5H7" stroke="#141414" stroke-linecap="round"/>
    <line x1="1" y1="4.35" x2="15" y2="4.35" stroke="#141414" stroke-width="1.3"/>
    </svg>
  )
}

export default Wallet