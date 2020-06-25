import styles from './homepageLinks.module.scss'
import cn from 'classnames';
import Link from 'next/link'

export default function HomepageLinks({projects, activeProject, setActiveProject, isPortraitAndMobile, imagesContainerHeight}) {
  return (
    <ul
      className={styles.homepageLinks}
      style={imagesContainerHeight}
    >
      { projects.map(({ fields: { slug, title }}, i) =>
      <li key={i}>
        { (!isPortraitAndMobile || activeProject === slug) &&
          <h2 className={cn(styles.homepageH1, "h1")}>
            <Link as={slug} href="[slug]">
              <a
                className={cn(
                  styles.homepageLink,
                  (activeProject === slug || !activeProject) && styles.activeLink
                )}
                onMouseEnter={() => !isPortraitAndMobile && setActiveProject(slug)}
                onMouseLeave={() => !isPortraitAndMobile && setActiveProject()}
              >
                {title}
              </a>
            </Link>
          </h2>
        }
        { isPortraitAndMobile && activeProject !== slug &&
          <h2 className={cn(styles.homepageH1, "h1")}>
            <span className={styles.homepageLink} onClick={() => setActiveProject(slug)}>{title}</span>
          </h2>
        }
      </li>
      )}
    </ul>
  )
}

HomepageLinks.defaultProps = {
  imagesContainerHeight: {}
}
