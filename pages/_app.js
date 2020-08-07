import { useState, useEffect } from 'react'

import AnimateElement from '../components/AnimateElement';

import '../styles/reset.css'
import '../styles/fonts.css'
import '../styles/base.scss'

function MyApp({ Component, pageProps, router }) {
  const [innerHeight, setInnerHeight] = useState("0");
  useEffect(() => {
    setInnerHeight(window.innerHeight + "px");
  })

  // Including this AnimatePresence here allows [slug] pages to animate when leaving and coming back to the index page
  const animationVariants = {
    // This allows the underlying index and [slug] pages to only animate the elements we want,
    // not the whole page like if the initial value were `opacity: 0`
    initial: { opacity: 1 },
    animate: { opacity: 1 },
  };

  return (
    <AnimateElement
      id={router.asPath}
      variants={animationVariants}
    >
      <Component {...pageProps} innerHeight={innerHeight} />
    </AnimateElement>
  )
}

export default MyApp
