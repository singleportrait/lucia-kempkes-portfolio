import { useRouter } from 'next/router'
import cn from 'classnames';
import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Header from '../components/header'
import Layout from '../components/layout'
import { getPage, getFooter, getHomepageProjectSlugs, getAllPagesWithSlug } from '../lib/api'
// import { CMS_NAME } from '../lib/constants'

import styles from './[slug].module.scss'

import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import JSONPretty from 'react-json-pretty';

export default function Page({
  page,
  previousPage,
  nextPage,
  parentPageSlug,
  footer,
  preview
}) {
  const router = useRouter();

  if (!router.isFallback && !page) {
    return (
      <ErrorPage statusCode={404} />
    )
  }

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
              <small>
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
    <Layout preview={preview} footer={footer}>
      <>
        <Header
          previousPage={previousPage}
          nextPage={nextPage}
          parentPage={parentPageSlug}
        />
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <Head>
              <title>{page.title} - Lucia Kempkes</title>
            </Head>
            <div className="content">
              <div className="grid">
                <div className="grid-left"></div>
                <div className="grid-center">
                  <h1 className={styles.bodyHeader}>{page.title}</h1>
                </div>
                <div className="grid-right"></div>
              </div>

              <div className="grid">
                <div className="grid-widescreen-left"></div>
                <div className={cn("grid-widescreen-center", styles.bodyContent)}>
                  { page.body && documentToReactComponents(page.body, options) }
                  {/* <JSONPretty data={carouselSlugs} /> */}
                  {/* <div style={{backgroundColor: "beige"}}> */}
                  {/*   <JSONPretty data={page} /> */}
                  {/* </div> */}
                </div>
                <div className="grid-widescreen-right"></div>
              </div>
            </div>

            <div className={styles.footer}>
              <div className="grid">
                <div className="grid-left"></div>
                <div className={cn("grid-center", styles.footerCopyright)}>
                  &copy; 2020 Lucia Kempkes
                </div>
                <div className="grid-right"></div>
              </div>
            </div>

            { parentPageSlug &&
              <div>
                <Link as={parentPageSlug} href="[slug]">
                  <a>Back</a>
                </Link>
                Has a parent page
              </div>
            }
          </>
        )}
      </>
    </Layout>
  )

}

export async function getStaticProps({ params, preview = false }) {
  const page = await getPage(params.slug, preview);
  const footer = await getFooter();

  const carouselSlugs = await getHomepageProjectSlugs();
  const pageIndex = carouselSlugs.indexOf(params.slug);
  let previousPage, nextPage;

  if (pageIndex !== -1) {
    previousPage = pageIndex === 0 ? carouselSlugs[carouselSlugs.length - 1] : carouselSlugs[pageIndex - 1];
    nextPage = pageIndex === carouselSlugs.length - 1 ? carouselSlugs[0] : carouselSlugs[pageIndex + 1];
  }

  return {
    props: {
      page: page ?? null,
      previousPage: previousPage || null,
      nextPage: nextPage || null,
      parentPageSlug: page.parentPageSlug || null,
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
