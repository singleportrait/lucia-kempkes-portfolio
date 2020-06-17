import Link from 'next/link'
import styles from './index.module.css'
import Header from '../components/header'
// import Container from '../components/container'
// import MoreStories from '../components/more-stories'
// import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getHomepage, getFooter } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

import JSONPretty from 'react-json-pretty';

export default function Index({ preview, homepageContent, footer }) {
  return (
    <div className="index">
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <>
          <Header />
          <div className="content">
            <div className="grid">
              <div className="grid-wide-center">
                <div className={styles.homepageImagesContainer}>
                  <div className={styles.homepageImages}>
                    { homepageContent.projects.map((project, i) =>
                      <React.Fragment key={i}>
                        {project.fields.horizontalPreviewImage && project.fields.horizontalPreviewImage.fields.file.contentType.includes("image") && i === 0 &&
                          <img src={project.fields.horizontalPreviewImage.fields.file.url} className={styles.homepageImage} />
                        }
                        {project.fields.horizontalPreviewImage && project.fields.horizontalPreviewImage.fields.file.contentType.includes("video") && i === 0 &&
                          "Movie preview file"
                        }
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid-center">
                <ul className={styles.homepageLinks}>
                  { homepageContent.projects.map((project, i) =>
                    <li className={styles.homepageLinkListItem} key={i}>
                      <h1>
                        <Link as={project.fields.slug} href="[slug]">
                          <a className={styles.homepageLink}>{project.fields.title}</a>
                        </Link>
                      </h1>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      </Layout>
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const homepageContent = await getHomepage(preview);
  const footer = await getFooter();

  return {
    props: { preview, homepageContent, footer },
  }
}
