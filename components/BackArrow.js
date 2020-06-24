export default function BackArrow(props) {
  return (
    <svg width="26" height="18" xmlns="http://www.w3.org/2000/svg"><g stroke={props.color} strokeWidth="2" fill="none" fillRule="evenodd"><path d="M20 16.5c2.761 0 5-2.015 5-4.5s-2.239-4.5-5-4.5H2"/><path strokeLinecap="square" d="M7.5 1.5l-6 6 6 6"/></g></svg>
  )
}

BackArrow.defaultProps = {
  color: "#ffe600"
}
