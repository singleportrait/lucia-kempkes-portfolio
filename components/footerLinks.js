import Link from 'next/link'
import cn from 'classnames';

import styles from './footerLinks.module.scss'

export default function FooterLinks(props) {
  return (
    <div className={styles.footerLinksContainer}>
      <div className="grid">
        <ul className={cn("grid-center", styles.footerLinks)}>
          { props.footer?.links.map(({ fields: { text, url } }, i) =>
            <li key={i}>
              { url.includes("http") &&
                <a href={url} target="_blank" rel="noreferrer noopener">
                  {text}
                </a>
              }
              { !url.includes("http") &&
                <Link as={url} href="[slug]">
                  <a href={url}>{text}</a>
                </Link>
              }
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
