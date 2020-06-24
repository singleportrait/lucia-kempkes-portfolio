export default function RightArrow(props) {
  return (
    <svg width="21" height="15" xmlns="http://www.w3.org/2000/svg"><g stroke={props.color} strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="square"><path d="M13.5 1.5l6 6-6 6M18.5 7.5h-17"/></g></svg>
  )
}

RightArrow.defaultProps = {
  color: "#ffe600"
}
