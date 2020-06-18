import Link from 'next/link'
import styles from './footerLinks.module.scss'
import { EXAMPLE_PATH } from '../lib/constants'
import cn from 'classnames';

export default function FooterLinks(props) {
  return (
    <div className={styles.footerLinksContainer}>
      <div className="grid">
        <ul className={cn("grid-center", styles.footerLinks)}>
          { props.footer && props.footer.links.map(({ fields: { text, url } }, i) =>
            <li key={i}>
              <Link as={url} href="[slug]">
                <a href={url}>{text}</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
