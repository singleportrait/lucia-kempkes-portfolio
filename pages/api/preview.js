import { getHomepage, getPreviewPageBySlug } from '../../lib/api'

export default async function preview(req, res) {
  const { secret, slug } = req.query

  if (secret !== process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  let url;

  if (!slug) {
    // Homepage, perhaps
    const homepage = await getHomepage(true)

    if (!homepage) {
      return res.status(401).json({ message: "Couldn't find homepage" })
    }

    url = '/';
  } else {

    // Fetch the headless CMS to check if the provided `slug` exists
    const page = await getPreviewPageBySlug(slug)

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!page) {
      return res.status(401).json({ message: 'Invalid slug' })
    }

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    // res.writeHead(307, { Location: `/posts/${post.slug}` })
    url = `/${page.slug}`
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`
  )
  res.end()
}
