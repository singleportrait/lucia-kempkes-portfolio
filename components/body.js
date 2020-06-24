import Link from 'next/link'

import styles from './body.module.scss'

import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Body(props) {

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl lg:text-6xl leading-tight">{children}</h1>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node) => (
        <>
          <div style={{border: "1px solid #000", padding: "1rem"}}>
            <div>(Embedded Entry)</div>
            {node.data.target.fields && documentToReactComponents(node.data.target.fields.text, options)}
          </div>
        </>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        // JSON.stringify(node)
        <>
          {node.data.target.fields &&
            <>
              <img src={node.data.target.fields.file.url} />
              <small className={styles.imageCaption}>
                {node.data.target.fields.title}, {node.data.target.fields.description}
              </small>
            </>
          }
        </>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node) => (
        <>
          <Link as={node.data.target.fields.slug} href="[slug]">
            <a>{node.content[0].value}</a>
          </Link>
          {/* <JSONPretty data={node} /> */}
        </>
      ),
      [INLINES.HYPERLINK]: (node) => (
        <>
          <a href={node.data.uri} target="_blank">{node.content[0].value}</a>
        </>
      ),
    }
  }

  function paragraphClass(node) {
    const className = 'customClassExample';
    //alternate logic for 'odd' | 'even'
    return className;
  }

  return (
    <div className={styles.body}>
      { props.body && documentToReactComponents(props.body, options) }
    </div>
  )
}
