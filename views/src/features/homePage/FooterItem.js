import React from 'react'

const FooterItem = ( { icon: Icon, size, label, onClick }) => {
  return (
    <div className="footer-item" onClick={onClick} style={{ cursor: "pointer" }}>
      <Icon  size={size} />
      <span>{label}</span>
    </div>
  )
}

export default FooterItem
