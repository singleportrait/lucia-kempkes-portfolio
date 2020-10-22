import Link from 'next/link'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import cn from 'classnames';

import styles from './body.module.scss'

export default function Body(props) {

  const options = {
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => (
        <div style={{border: "1px solid #000", padding: "1rem"}}>
          {node.data.target.fields && documentToReactComponents(node.data.target.fields.text, options)}
        </div>
      ),
      [BLOCKS.EMBEDDED_ASSET]: ({data: {target: { fields }}}) => (
        <figure className={cn(styles.figure, (!fields.title && !fields.description) && styles.figureWithoutCaption)}>
          { fields?.file.contentType.includes("image") &&
            <div
              className={styles.imageContainer}
              style={{
                paddingTop: `${fields.file.details.image.height/fields.file.details.image.width*100}%`,
              }}
            >
              <img className={styles.image} src={`${fields.file.url}?fm=jpg&fl=progressive&w=2000&q=80`} />
            </div>
          }
          { fields?.file.contentType.includes("video") &&
            <video
              className={styles.video}
              controls
              muted
              autoPlay
              preload="true"
              playsInline
            >
              <source
                src={fields.file.url}
                type={fields.contentType}
              />
            </video>
          }
          { (fields.title || fields.description) &&
            <figcaption className={styles.caption}>
              {fields.title}
              {fields.description && `, ${fields.description}`}
            </figcaption>
          }
        </figure>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node) => (
        <Link as={node.data.target.fields.slug} href="[slug]">
          <a href={node.data.target.fields.slug}>{node.content[0].value}</a>
        </Link>
      ),
      [INLINES.HYPERLINK]: (node) => (
        <a href={node.data.uri} target="_blank" rel="noreferrer noopener">{node.content[0].value}</a>
      ),
    }
  }

  return (
    <div className={styles.body}>
      { props.body && documentToReactComponents(props.body, options) }
    </div>
  )
}
