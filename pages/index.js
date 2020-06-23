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

export default function Index({ preview, homepage, footer }) {
  const isPortraitAndMobile = useMediaQuery({
    maxDeviceWidth: 700,
    orientation: 'portrait',
  })

  const [activeProject, setActiveProject] = useState(
    isPortraitAndMobile ? homepage.projects[0].fields.slug : null
  );

  return (
    <div className={cn(
      "index",
      !activeProject && "noActiveProject",
      styles.index,
      !activeProject && styles.noActiveProject
    )}>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header />
        <div className="content">
          <div className="grid">
            <div className="grid-wide-center">
              <HomepageImages
                projects={homepage.projects}
                activeProject={activeProject}
                verticalImages={isPortraitAndMobile}
              />
            </div>

            <div className="grid-center">
              <HomepageLinks
                projects={homepage.projects}
                activeProject={activeProject}
                isPortraitAndMobile={isPortraitAndMobile}
                setActiveProject={setActiveProject}
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
