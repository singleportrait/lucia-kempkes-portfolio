import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import ErrorPage from 'next/error'
import cn from 'classnames';

import { motion, AnimatePresence } from 'framer-motion';

import Header from '../components/header'
import Layout from '../components/layout'
import Body from '../components/body'
import { getPage, getFooter, getHomepageProjectSlugs, getAllPagesWithSlug } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

import styles from './[slug].module.scss'

export default function Page({ page, previousPageSlug, nextPageSlug, parentPageSlug, footer, preview, innerHeight }) {

  const router = useRouter();

  if (!router.isFallback && !page) {
    return (
      <ErrorPage statusCode={404} />
    )
  }

  const today = new Date();

  const animationVariants = {
    pageInitial: { opacity: 0.1 },
    pageAnimate: { opacity: 1 },
  };

  return (
    <Layout
      preview={preview}
      footer={footer}
      innerHeight={innerHeight}
      title={`${page.title} - ${CMS_NAME}`}
      shareImage={page.shareImage ?? null}
      metaDescription={page.metaDescription ?? null}
    >
      <>
        <Header
          previousPageSlug={previousPageSlug}
          nextPageSlug={nextPageSlug}
          parentPageSlug={parentPageSlug}
          lightBackground
        />
        {router.isFallback ? (
          <div className="grid">
            <div className="grid-left"></div>
            <div className="grid-center">
              <h1 className={styles.bodyHeader}>Loading…</h1>
            </div>
            <div className="grid-right"></div>
          </div>
        ) : (
          <>
            <div
              className="content"
              style={{
                minHeight: `calc(${innerHeight} - var(--header-height) - var(--footer-height))`
              }}
            >
              <div className="grid">
                <div className="grid-left"></div>
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    className="grid-center"
                    key={router.asPath}
                    initial="pageInitial"
                    animate="pageAnimate"
                    exit="pageInitial"
                    variants={animationVariants}
                  >
                    <h1 className={styles.bodyHeader}>{page.title}</h1>
                  </motion.div>
                </AnimatePresence>
                <div className="grid-right"></div>
              </div>

              <div className="grid">
                <div className="grid-widescreen-left"></div>
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    className="grid-widescreen-center"
                    key={router.asPath}
                    initial="pageInitial"
                    animate="pageAnimate"
                    exit="pageInitial"
                    variants={animationVariants}
                  >
                    <Body body={page.body} />
                  </motion.div>
                </AnimatePresence>
                <div className="grid-widescreen-right"></div>
              </div>
            </div>

            <div className={styles.bodyFooter}>
              <div className="grid">
                <div className="grid-left"></div>
                <div className={cn("grid-center", styles.copyright)}>
                  &copy; { today.getFullYear() } Lucia Kempkes
                </div>
                <div className="grid-right"></div>
              </div>
            </div>

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
  let previousPageSlug, nextPageSlug;

  if (pageIndex !== -1) {
    previousPageSlug = pageIndex === 0 ? carouselSlugs[carouselSlugs.length - 1] : carouselSlugs[pageIndex - 1];
    nextPageSlug = pageIndex === carouselSlugs.length - 1 ? carouselSlugs[0] : carouselSlugs[pageIndex + 1];
  }

  return {
    props: {
      page: page ?? null,
      previousPageSlug: previousPageSlug || null,
      nextPageSlug: nextPageSlug || null,
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
    fallback: false,
  }
}
