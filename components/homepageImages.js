import { Fragment } from 'react';
import cn from 'classnames'

import styles from './homepageImages.module.scss'

export default function HomepageImages(props) {
  return (
    <div
      className={styles.homepageImagesContainer}
      style={props.imagesContainerHeight}
    >
      <div className={styles.homepageImages}>
        { props.projects.map(({fields: { slug, horizontalPreviewImage, verticalPreviewImage }}, i) =>
          <Fragment key={i}>
            { props.verticalImages &&
              <>
                { verticalPreviewImage?.fields.file.contentType.includes("image") &&
                  <div
                    className={cn(styles.homepageVerticalImage, props.activeProject === slug && styles.show)}
                    style={{
                      backgroundImage: `url(${verticalPreviewImage.fields.file.url}?fm=jpg&fl=progressive&w=2000&q=80)`,
                    }}
                  />
                }
                { verticalPreviewImage?.fields.file.contentType.includes("video") &&
                  <div
                    className={cn(styles.homepageVerticalVideo, props.activeProject === slug && styles.show)}
                  >
                    <video
                      autoPlay
                      muted
                      preload="true"
                      playsInline
                    >
                      <source
                        src={horizontalPreviewImage.fields.file.url}
                        type={horizontalPreviewImage.fields.contentType}
                      />
                    </video>
                  </div>
                }
              </>
            }
            { !props.verticalImages &&
              <>
                { horizontalPreviewImage?.fields.file.contentType.includes("image") &&
                  <img
                    src={`${horizontalPreviewImage.fields.file.url}?fm=jpg&fl=progressive&w=2000&q=80`}
                    className={cn(styles.homepageImage, props.activeProject === slug && styles.show)}
                  />
                }
                { horizontalPreviewImage?.fields.file.contentType.includes("video") &&
                  <video
                    className={cn(styles.homepageImage, props.activeProject === slug && styles.show)}
                    autoPlay
                    muted
                    preload="true"
                    playsInline
                  >
                    <source
                      src={horizontalPreviewImage.fields.file.url}
                      type={horizontalPreviewImage.fields.contentType}
                    />
                  </video>
                }
              </>
            }
          </Fragment>
        )}
      </div>
    </div>
  );
}

HomepageImages.defaultProps = {
  imagesContainerHeight: {}
}
