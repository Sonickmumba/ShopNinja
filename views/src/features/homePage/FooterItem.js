const FooterItem = ( { icon: Icon, size, label, onClick, isActive }) => {
  return (
    <div className="footer-item" onClick={onClick} style={{ cursor: "pointer" }}>
      <Icon  size={size} className={isActive ? "footer-icon" : "icon-inactive"} />
      {/* <span>{label}</span> */}
    </div>
  )
}

export default FooterItem
