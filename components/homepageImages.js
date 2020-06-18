import styles from './homepageImages.module.css'
import JSONPretty from 'react-json-pretty'

export default function HomepageImages(props) {
  return (
    <div className={styles.homepageImagesContainer}>
      <div className={styles.homepageImages}>
        { props.projects.map(({fields: { slug, horizontalPreviewImage, verticalPreviewImage }}, i) =>
          <React.Fragment key={i}>
            { props.activeProject === slug &&
              <>
                { props.verticalImages &&
                  <>
                    { verticalPreviewImage?.fields.file.contentType.includes("image") &&
                      <div
                        className={styles.homepageVerticalImage}
                        style={{
                          backgroundImage: `url(${verticalPreviewImage.fields.file.url})`
                        }}
                      />
                    }
                  </>
                }
                { !props.verticalImages &&
                  <>
                    {horizontalPreviewImage?.fields.file.contentType.includes("image") &&
                    <img src={horizontalPreviewImage.fields.file.url} className={styles.homepageImage} />
                    }
                    {horizontalPreviewImage?.fields.file.contentType.includes("video") &&
                      "Movie preview file"
                    }
                  </>
                }
              </>
            }
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
