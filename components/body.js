import Link from 'next/link'

import styles from './body.module.scss'

import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Body(props) {

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => (
        <>
          <div style={{border: "1px solid #000", padding: "1rem"}}>
            <div>(Embedded Entry)</div>
            {node.data.target.fields && documentToReactComponents(node.data.target.fields.text, options)}
          </div>
        </>
      ),
      [BLOCKS.EMBEDDED_ASSET]: ({data: {target: { fields }}}) => (
        <>
          {/* { JSON.stringify(fields) } */}
          { fields?.file.contentType.includes("image") &&
            <img src={`${fields.file.url}?fl=progressive`} />
          }
          { fields?.file.contentType.includes("video") &&
            <video
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
          <small className={styles.caption}>
            <span className={styles.captionTitle}>{fields.title}</span>
            {fields.description && ", "}
            {fields.description}
          </small>
        </>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node) => (
        <>
          <Link as={node.data.target.fields.slug} href="[slug]">
            <a href={node.data.target.fields.slug}>{node.content[0].value}</a>
          </Link>
          {/* <JSONPretty data={node} /> */}
        </>
      ),
      [INLINES.HYPERLINK]: (node) => (
        <>
          <a href={node.data.uri} target="_blank" rel="noreferrer noopener">{node.content[0].value}</a>
        </>
      ),
    }
  }

  return (
    <div className={styles.body}>
      { props.body && documentToReactComponents(props.body, options) }
    </div>
  )
}
