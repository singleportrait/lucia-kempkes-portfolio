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
          { props.parentPageSlug &&
            <Link as={props.parentPageSlug} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationBack)}
                href={props.parentPageSlug}
              >
                <BackArrow />
              </a>
            </Link>
          }
          { !props.parentPageSlug && props.previousPageSlug &&
            <Link as={props.previousPageSlug} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationPrevious)}
                href={props.previousPageSlug}
              >
                <LeftArrow />
              </a>
            </Link>
          }
        </div>
        <div className={cn("grid-center", styles.siteTitle)}>
          { props.homepage &&
            <h1 className={styles.siteTitle}>Lucia Kempkes</h1>
          }
          { !props.homepage &&
            <Link href="/">
              <a href="/" className={styles.siteTitle}>Lucia Kempkes</a>
            </Link>
          }
        </div>
        <div className="grid-right">
          { !props.parentPageSlug && props.nextPageSlug &&
            <Link as={props.nextPageSlug} href="[slug]">
              <a
                className={cn(styles.navigation, styles.navigationNext)}
                href={props.parentPageSlug}
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
  parentPageSlug: null,
};
