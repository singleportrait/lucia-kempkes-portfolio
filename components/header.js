import Link from 'next/link'
import styles from './header.module.scss'
import cn from 'classnames';

export default function Header(props) {
  return (
    <div className={styles.header}>
      <div className="grid">
        <div className="grid-left">
          { props.parentPage &&
            <Link as={props.parentPage} href="[slug]">
              <a className={cn(styles.navigation, styles.navigationBack)}>Back</a>
            </Link>
          }
          { !props.parentPage && props.previousPage &&
            <Link as={props.previousPage} href="[slug]">
              <a className={cn(styles.navigation, styles.navigationPrevious)}>Previous</a>
            </Link>
          }
        </div>
        <div className={cn("grid-center", styles.siteTitle)}>
          <Link href="/">
            <a>Lucia Kempkes</a>
          </Link>
        </div>
        <div className="grid-right">
          { !props.parentPage && props.nextPage &&
            <Link as={props.nextPage} href="[slug]">
              <a className={cn(styles.navigation, styles.navigationNext)}>Next</a>
            </Link>
            }
        </div>
      </div>
    </div>
  )
}
