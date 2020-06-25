import Alert from '../components/alert'
import FooterLinks from '../components/footerLinks'
import Meta from '../components/meta'

export default function Layout(props) {
  return (
    <>
      <Meta
        title={props.title}
        shareImage={props.shareImage}
        metaDescription={props.metaDescription}
      />
      <div>
        <div
          className="grid grid--background"
          style={{
            height: props.innerHeight || "100vh"
          }}
        >
          <div className="grid-left"></div>
          <div className="grid-right"></div>
        </div>

        <Alert preview={props.preview} />
        <main>{props.children}</main>
      </div>
      <FooterLinks footer={props.footer} />
    </>
  )
}
