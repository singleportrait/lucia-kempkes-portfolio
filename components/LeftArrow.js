export default function LeftArrow(props) {
  return (
    <svg width="21" height="15" xmlns="http://www.w3.org/2000/svg"><g stroke={props.color} strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="square"><path d="M7.5 1.5l-6 6 6 6M2.5 7.5h17"/></g></svg>
  )
}

LeftArrow.defaultProps = {
  color: "#ffe600"
}
