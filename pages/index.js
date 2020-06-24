import { useState } from 'react'
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import styles from './index.module.scss'
import Header from '../components/header'
import Layout from '../components/layout'
import HomepageImages from '../components/homepageImages'
import HomepageLinks from '../components/homepageLinks'
import { getHomepage, getFooter } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

import JSONPretty from 'react-json-pretty';

export default function Index({ preview, homepage, footer, innerHeight }) {
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

  return (
    <div className={cn(
      "index",
      !activeProject && "noActiveProject",
      styles.index,
      !activeProject && styles.noActiveProject
    )}>
      <Layout preview={preview} footer={footer} innerHeight={innerHeight}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header lightBackground={!isPortraitAndMobile && activeProject} />
        <div className="content">
          <div className="grid">
            <div className="grid-wide-center">
              <HomepageImages
                projects={homepage.projects}
                activeProject={activeProject}
                verticalImages={isPortraitAndMobile}
                imagesContainerHeight={imagesContainerHeight}
              />
            </div>

            <div className="grid-center">
              <HomepageLinks
                projects={homepage.projects}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                isPortraitAndMobile={isPortraitAndMobile}
                imagesContainerHeight={imagesContainerHeight}
              />
            </div>
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
