const Notification = ({ msg, type }) => {
  if (msg === null) {
    return null
  }
  const typeColors = {
    notification: 'lightgreen',
    error: 'lightcoral'
  }
  const notificationStyle = {
    color: 'white',
    background: typeColors[type],
    fontSize: 15,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={notificationStyle}>{msg}</div>
}
export default Notification
