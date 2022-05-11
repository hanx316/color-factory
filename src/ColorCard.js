function ColorCard(props) {
  const style = {
    'backgroundColor': props.color
  }
  return (
    <div className="color-card" data-color={props.color}>
      <div className="color" data-color={props.color} style={style}></div>
      <div className="name" data-color={props.color}>{props.color}</div>
    </div>
  )
}

export default ColorCard;
