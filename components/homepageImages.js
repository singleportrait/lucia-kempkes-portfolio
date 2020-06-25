import styles from './homepageImages.module.scss'
import cn from 'classnames'

export default function HomepageImages(props) {
  return (
    <div
      className={styles.homepageImagesContainer}
      style={props.imagesContainerHeight}
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
                      backgroundImage: `url(${verticalPreviewImage.fields.file.url}?fl=progressive)`,
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
                    src={`${horizontalPreviewImage.fields.file.url}?fl=progressive&w=1500`}
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
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

HomepageImages.defaultProps = {
  imagesContainerHeight: {}
}
