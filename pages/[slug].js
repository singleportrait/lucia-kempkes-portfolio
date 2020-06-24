import { useRouter } from 'next/router'
import cn from 'classnames';
import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Header from '../components/header'
import Layout from '../components/layout'
import Body from '../components/body'
import { getPage, getFooter, getHomepageProjectSlugs, getAllPagesWithSlug } from '../lib/api'

import styles from './[slug].module.scss'

import JSONPretty from 'react-json-pretty';

export default function Page({ page, previousPage, nextPage, parentPageSlug, footer, preview, innerHeight }) {
  const router = useRouter();

  if (!router.isFallback && !page) {
    return (
      <ErrorPage statusCode={404} />
    )
  }

  return (
    <Layout preview={preview} footer={footer} innerHeight={innerHeight}>
      <>
        <Header
          previousPage={previousPage}
          nextPage={nextPage}
          parentPage={parentPageSlug}
          lightBackground
        />
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <Head>
              <title>{page.title} - Lucia Kempkes</title>
            </Head>
            <div
              className="content"
              style={{
                minHeight: `calc(${innerHeight} - var(--header-height) - var(--footer-height))`
              }}
            >
              <div className="grid">
                <div className="grid-left"></div>
                <div className="grid-center">
                  <h1 className={styles.bodyHeader}>{page.title}</h1>
                </div>
                <div className="grid-right"></div>
              </div>

              <div className="grid">
                <div className="grid-widescreen-left"></div>
                <div className="grid-widescreen-center">
                  <Body body={page.body} />

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
