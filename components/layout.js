import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, footer, children }) {
  return (
    <>
      <Meta />
      <div>
        <div className="grid grid--background">
          <div className="grid-left"></div>
          <div className="grid-right"></div>
        </div>

        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer footer={footer} />
    </>
  )
}
