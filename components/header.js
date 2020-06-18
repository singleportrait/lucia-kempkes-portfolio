import Link from 'next/link'
import styles from './header.module.scss'
import cn from 'classnames';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className="grid">
        <div className="grid-left">
          <a href="/" className={cn(styles.navigation, styles.navigationPrevious)}>Previous</a>
        </div>
        <div className={cn("grid-center", styles.siteTitle)}>
          <Link href="/">
            <a>Lucia Kempkes</a>
          </Link>
        </div>
        <div className="grid-right">
          <a href="/" className={cn(styles.navigation, styles.navigationNext)}>Next</a>
        </div>
      </div>
    </div>
  )
}
