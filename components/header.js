import Link from 'next/link'
import styles from './header.module.scss'
import cn from 'classnames';

import LeftArrow from './LeftArrow.js'
import RightArrow from './RightArrow.js'
import BackArrow from './BackArrow.js'

export default function Header(props) {

  return (
    <div className={cn(styles.header, props.lightBackground && styles.lightBackground)}>
      <div className="grid">
        <div className="grid-left">
          { props.parentPage &&
            <Link as={props.parentPage} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationBack)}
              >
                <BackArrow />
              </a>
            </Link>
          }
          { !props.parentPage && props.previousPage &&
            <Link as={props.previousPage} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationPrevious)}
              >
                <LeftArrow />
              </a>
            </Link>
          }
        </div>
        <div className={cn("grid-center", styles.siteTitle)}>
          <Link href="/">
            <a className={styles.siteTitle}>Lucia Kempkes</a>
          </Link>
        </div>
        <div className="grid-right">
          { !props.parentPage && props.nextPage &&
            <Link as={props.nextPage} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationNext)}
              >
                <RightArrow />
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
