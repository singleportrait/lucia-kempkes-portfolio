import { createClient } from 'contentful';
import stringify from 'json-stringify-safe';

const client = createClient({
  space: process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_ACCESS_TOKEN,
})

const previewClient = createClient({
  space: process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: 'preview.contentful.com',
})

const getClient = (preview) => (preview ? previewClient : client)

function parseHomepage(entry) {
  if (entry && entry.items) {
    return {
      title: entry.items[0].fields.title,
      projects: entry.items[0].fields.projects,
    }
  }
}

function parsePage({ fields }) {

  return {
    title: fields.title,
    slug: fields.slug,
    body: fields.body ? fields.body : null,
    // Image is causing trouble for some reason
    // previewImage: fields.previewImage.fields.file,
    parentPageSlug: fields.parentPage ? fields.parentPage.fields.slug : null,
  }
}

function parsePageEntries(entries, cb = parsePage) {
  return entries?.items?.map(cb);
}

function parseFooter(footer) {
  if (footer && footer.items) {
    return {
      links: footer.items[0].fields.links,
    }
  }
}

export async function getHomepage(preview) {
  const entry = await getClient(preview).getEntries({
    content_type: 'homepage',
    limit: '1',
  })
  return parseHomepage(entry);
}

export async function getPage(slug, preview) {
  const entry = await getClient(preview).getEntries({
    content_type: 'page',
    limit: 1,
    'fields.slug[in]': slug,
  })

  /* When entries link to other entries, it becomes a circular reference,
   * which trips up getStaticProps(). This stringify solution "ends" the
   * circular references by linking to them like so:
   * > "parentPage": "[Circular ~.items.0]"
   * which you could then reference separately if you needed
   * More info on this solution can be found here:
   * https://github.com/contentful/contentful.js/issues/249
   * and
   * https://github.com/contentful/contentful.js/issues/377
   */
  const entriesWithoutCircularReferences = stringify(entry, null, 2)
  const decircularizedEntry = JSON.parse(entriesWithoutCircularReferences)

  return parsePageEntries(decircularizedEntry)[0];
}

export async function getAllPagesWithSlug() {
  const entries = await client.getEntries({
    content_type: 'page',
    select: 'fields.slug',
  })

  return parsePageEntries(entries, (page) => page.fields);
}

// Get list of slugs to include in header "Previous" and "Next" navigation,
// in order to find the current page's slug and the previous/next one(s).
export async function getAllPreviousNextPages() {
  // TODO
}

export async function getPreviewPageBySlug(slug) {
  const entry = await getClient(true).getEntries({
    content_type: 'page',
    limit: 1,
    'fields.slug[in]': slug,
  })

  return parsePageEntries(entry)[0];
}

export async function getFooter() {
  const footer = await getClient().getEntries({
    content_type: 'footer',
    limit: 1,
  })

  return parseFooter(footer);
}

/////////

// function parseAuthor({ fields }) {
//   return {
//     name: fields.name,
//     picture: fields.picture.fields.file,
//   }
// }

// function parsePost({ fields }) {
//   return {
//     title: fields.title,
//     slug: fields.slug,
//     // date: fields.date,
//     content: fields.content,
//     excerpt: fields.excerpt,
//     coverImage: fields.coverImage.fields.file,
//     author: parseAuthor(fields.author),
//   }
// }

// function parsePostEntries(entries, cb = parsePost) {
//   return entries?.items?.map(cb)
// }

// export async function getPreviewPostBySlug(slug) {
//   const entries = await getClient(true).getEntries({
//     content_type: 'post',
//     limit: 1,
//     'fields.slug[in]': slug,
//   })
//   return parsePostEntries(entries)[0]
// }

// export async function getAllPostsWithSlug() {
//   const entries = await client.getEntries({
//     content_type: 'post',
//     select: 'fields.slug',
//   })
//   return parsePostEntries(entries, (post) => post.fields)
// }

// export async function getAllPostsForHome(preview) {
//   const entries = await getClient(preview).getEntries({
//     content_type: 'post',
//     order: '-fields.date',
//   })
//   return parsePostEntries(entries)
// }

// export async function getPostAndMorePosts(slug, preview) {
//   const entry = await getClient(preview).getEntries({
//     content_type: 'post',
//     limit: 1,
//     'fields.slug[in]': slug,
//   })
//   const entries = await getClient(preview).getEntries({
//     content_type: 'post',
//     limit: 2,
//     order: '-fields.date',
//     'fields.slug[nin]': slug,
//   })

//   return {
//     post: parsePostEntries(entry)[0],
//     morePosts: parsePostEntries(entries),
//   }
// }
