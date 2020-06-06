import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, footer, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
        <ul>
          { footer && footer.links.map(({ fields: { text, url } }, i) =>
            <li key={i}><a href={url}>{text}</a></li>
          )}
        </ul>
    </>
  )
}
