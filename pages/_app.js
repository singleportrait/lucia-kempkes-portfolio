import { useState, useEffect } from 'react'

import '../styles/reset.css'
import '../styles/fonts.css'
import '../styles/base.scss'

function MyApp({ Component, pageProps }) {
  const [innerHeight, setInnerHeight] = useState("0");
  useEffect(() => {
    setInnerHeight(window.innerHeight + "px");
  })

  return <Component {...pageProps} innerHeight={innerHeight} />
}

export default MyApp
