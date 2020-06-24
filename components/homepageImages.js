import { useState, useEffect } from 'react'
import styles from './homepageImages.module.scss'
import cn from 'classnames'

export default function HomepageImages(props) {
  const [innerHeight, setInnerHeight] = useState("0");
  useEffect(() => {
    setInnerHeight(window.innerHeight + "px");
  })

  return (
    <div
      className={styles.homepageImagesContainer}
      style={{
        height: `calc(${innerHeight} - var(--header-height))`
      }}
    >
      <div className={styles.homepageImages}>
        { props.projects.map(({fields: { slug, horizontalPreviewImage, verticalPreviewImage }}, i) =>
          <React.Fragment key={i}>
            { props.verticalImages &&
              <>
                { verticalPreviewImage?.fields.file.contentType.includes("image") &&
                  <div
                    className={cn(styles.homepageVerticalImage, props.activeProject === slug && styles.show)}
                    style={{
                      backgroundImage: `url(${verticalPreviewImage.fields.file.url})`,
                      height: `calc(${innerHeight} - var(--header-height) - var(--footer-links-height) - 2rem)`,
                    }}
                  />
                }
                { verticalPreviewImage?.fields.file.contentType.includes("video") &&
                  <div
                    className={cn(styles.homepageVerticalImage, props.activeProject === slug && styles.show)}
                    style={{
                      height: `calc(${innerHeight} - var(--header-height) - var(--footer-links-height) - 2rem)`,
                    }}
                  >
                    "Move preview background"
                  </div>
                }
              </>
            }
            { !props.verticalImages &&
              <>
                { horizontalPreviewImage?.fields.file.contentType.includes("image") &&
                  <img
                    src={horizontalPreviewImage.fields.file.url}
                    className={cn(styles.homepageImage, props.activeProject === slug && styles.show)}
                  />
                }
                { horizontalPreviewImage?.fields.file.contentType.includes("video") &&
                  <div className={cn(styles.homepageImage, props.activeProject === slug && styles.show)}>
                    "Movie preview file"
                  </div>
                }
              </>
            }
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
