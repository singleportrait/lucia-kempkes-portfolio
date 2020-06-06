import Link from 'next/link'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getHomepage, getFooter } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

import JSONPretty from 'react-json-pretty';

export default function Index({ preview, homepageContent, allPosts, footer }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <h1>{ homepageContent.title }</h1>
          <ul>
            { homepageContent.projects.map((project, i) =>
              <li key={i}>
                {project.fields.previewImage && project.fields.previewImage.fields.file.contentType.includes("image") &&
                  <img src={project.fields.previewImage.fields.file.url} />
                }
                {project.fields.previewImage && project.fields.previewImage.fields.file.contentType.includes("video") &&
                  "Movie preview file"
                }
                <Link as={project.fields.slug} href="[slug]">
                  <a className="hover:underline">XX {project.fields.title}</a>
                </Link>
              </li>
            )}
          </ul>
          {/* heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          ) */}
          {/* morePosts.length > 0 && <MoreStories posts={morePosts} /> */}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const homepageContent = await getHomepage(preview);
  const allPosts = await getAllPostsForHome(preview)
  const footer = await getFooter();

  return {
    props: { preview, homepageContent, allPosts, footer },
  }
}
