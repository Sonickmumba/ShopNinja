import React from 'react'

const FooterItem = ( { icon: Icon, size, label }) => {
  return (
    <div className="footer-item">
      <Icon  size={size} />
      <span>{label}</span>
    </div>
  )
}

export default FooterItem
