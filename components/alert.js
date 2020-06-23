import styles from './alert.module.css'
import cn from 'classnames'

export default function Alert({ preview }) {
  return (
    <>
      {preview &&
        <div className={styles.alert}>
          <div class="grid">
            <div class="grid-left" />
            <div class="grid-center">
              This is page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className={styles.alertLink}
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </div>
          </div>
        </div>
      }
    </>
  )
}
