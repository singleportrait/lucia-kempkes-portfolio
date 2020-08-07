import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive'

import { motion, AnimatePresence } from 'framer-motion';

import Header from '../components/header'
import Layout from '../components/layout'
import HomepageImages from '../components/homepageImages'
import HomepageLinks from '../components/homepageLinks'
import { getHomepage, getFooter } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

import styles from './index.module.scss'

export default function Index({ preview, homepage, footer, innerHeight }) {

  const router = useRouter();

  const handleMediaQueryChange = (matches) => {
    if (matches) {
      setActiveProject(homepage.projects[0].fields.slug)
    } else {
      setActiveProject()
    }
  }

  const isPortraitAndMobile = useMediaQuery({
    maxWidth: 700,
    orientation: 'portrait',
  }, undefined, handleMediaQueryChange)

  const [activeProject, setActiveProject] = useState(
    isPortraitAndMobile ? homepage.projects[0].fields.slug : null
  );

  const imagesContainerHeight = {
    height: `calc(${innerHeight} - var(--header-height) - var(--footer-links-height) - 2rem)`
  }

  const animationVariants = {
    pageInitial: { opacity: 0.1 },
    pageAnimate: { opacity: 1 },
  };

  return (
    <div
      className={cn(
        "index",
        styles.index,
        !activeProject && styles.noActiveProject
      )}
      style={{
        height: `${parseInt(innerHeight) + 1}px`
      }}
    >
      <Layout
        preview={preview}
        footer={footer}
        innerHeight={innerHeight}
        title={CMS_NAME}
        shareImage={homepage.shareImage}
        metaDescription={homepage.metaDescription}
      >
        <Header lightBackground={!isPortraitAndMobile && activeProject} homepage />
        <div className="content">
          <div className="grid">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                className="grid-wide-center"
                key={router.asPath}
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageInitial"
                variants={animationVariants}
              >
                <HomepageImages
                  projects={homepage.projects}
                  activeProject={activeProject}
                  verticalImages={isPortraitAndMobile}
                  imagesContainerHeight={imagesContainerHeight}
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence exitBeforeEnter>
              <motion.div
                className="grid-center"
                key={router.asPath}
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageInitial"
                variants={animationVariants}
              >
                <HomepageLinks
                  projects={homepage.projects}
                  activeProject={activeProject}
                  setActiveProject={setActiveProject}
                  isPortraitAndMobile={isPortraitAndMobile}
                  imagesContainerHeight={imagesContainerHeight}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const homepage = await getHomepage(preview);
  const footer = await getFooter();

  return {
    props: { preview, homepage, footer },
  }
}
