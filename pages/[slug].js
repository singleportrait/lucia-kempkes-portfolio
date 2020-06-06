import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../components/container'
import Header from '../components/header'
import Layout from '../components/layout'
import PostTitle from '../components/post-title'
import { getPage, getAllPagesWithSlug, getFooter } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import JSONPretty from 'react-json-pretty';

export default function Page({ page, footer, preview }) {
  const router = useRouter();

  if (!router.isFallback && !page) {
    return (
      <ErrorPage statusCode={404} />
    )
  }

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={paragraphClass(node)}>{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl lg:text-6xl leading-tight">{children}</h1>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node) => (
        <>
          <div>(Embedded Entry)</div>
          <div style={{border: "1px solid #000", padding: "1rem"}}>
            {documentToReactComponents(node.data.target.fields.text, options)}
          </div>
        </>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        // JSON.stringify(node)
        <>
          <div>(Embedded Image)</div>
          <img src={node.data.target.fields.file.url} />
          <small>
            {node.data.target.fields.title}, {node.data.target.fields.description}
          </small>
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
    <Layout preview={preview} footer={footer}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <Head>
              <title>{page.title} - Lucia Kempkes</title>
            </Head>
            <div>
              <h1>{page.title}</h1>
              { page.parentPageSlug &&
                <div>
                  <Link as={page.parentPageSlug} href="[slug]">
                    <a>Back</a>
                  </Link>
                  Has a parent page
                </div>
              }
              <hr />
              { documentToReactComponents(page.body, options) }
            </div>
          </>
        )}
      </Container>
    </Layout>
  )

}

export async function getStaticProps({ params, preview = false }) {
  const page = await getPage(params.slug, preview);
  const footer = await getFooter();

  return {
    props: {
      page: page ?? null,
      footer,
      preview,
    }
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();

  return {
    paths: allPages?.map(({ slug }) => `/${slug}`) ?? [],
    fallback: true,
  }
}
