import Alert from '../components/alert'
import FooterLinks from '../components/footerLinks'
import Meta from '../components/meta'

export default function Layout({ preview, footer, innerHeight, children }) {
  return (
    <>
      <Meta />
      <div>
        <div
          className="grid grid--background"
          style={{
            height: innerHeight || "100vh"
          }}
        >
          <div className="grid-left"></div>
          <div className="grid-right"></div>
        </div>

        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <FooterLinks footer={footer} />
    </>
  )
}
