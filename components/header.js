import { useState } from 'react'
import Link from 'next/link'
import styles from './header.module.scss'
import cn from 'classnames';

import LeftArrow from './LeftArrow.js'
import RightArrow from './RightArrow.js'
import BackArrow from './BackArrow.js'

export default function Header(props) {
  const [previousHoverColor, setPreviousHoverColor] = useState();
  const [nextHoverColor, setNextHoverColor] = useState();
  const [backHoverColor, setBackHoverColor] = useState();

  return (
    <div className={cn(styles.header, props.lightBackground && styles.lightBackground)}>
      <div className="grid">
        <div className="grid-left">
          { props.parentPage &&
            <Link as={props.parentPage} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationBack)}
                onMouseEnter={() => setBackHoverColor("#000")}
                onMouseLeave={() => setBackHoverColor()}
              >
                <BackArrow color={backHoverColor} />
              </a>
            </Link>
          }
          { !props.parentPage && props.previousPage &&
            <Link as={props.previousPage} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationPrevious)}
                onMouseEnter={() => setPreviousHoverColor("#000")}
                onMouseLeave={() => setPreviousHoverColor()}
              >
                <LeftArrow color={previousHoverColor} />
              </a>
            </Link>
          }
        </div>
        <div className={cn("grid-center", styles.siteTitle)}>
          <Link href="/">
            <a class={styles.siteTitle}>Lucia Kempkes</a>
          </Link>
        </div>
        <div className="grid-right">
          { !props.parentPage && props.nextPage &&
            <Link as={props.nextPage} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationNext)}
                onMouseEnter={() => setNextHoverColor("#000")}
                onMouseLeave={() => setNextHoverColor()}
              >
                <RightArrow color={nextHoverColor} />
              </a>
            </Link>
            }
        </div>
      </div>
    </div>
  )
}

Header.defaultProps = {
  parentPage: null,
};
