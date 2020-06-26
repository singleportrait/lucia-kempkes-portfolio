import Link from 'next/link'
import cn from 'classnames';

import styles from './homepageLinks.module.scss'

export default function HomepageLinks({projects, activeProject, setActiveProject, isPortraitAndMobile, imagesContainerHeight}) {
  return (
    <ul
      className={styles.homepageLinks}
      style={imagesContainerHeight}
    >
      { projects.map(({ fields: { slug, title }}, i) =>
      <li key={i}>
        {/* If desktop or there's an active project, only highlight one link,
         /* and allow them to be full links and click through */}
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
        {/* If mobile and there isn't an active project, show all as visible */}
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
