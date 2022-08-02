import Meta from '../components/meta'

import styles from './stream.module.scss';

export default function StreamPage(props) {
  return (
    <>
      <Meta
        title="Stream"
        // metaDescription={props.metaDescription}
      />
      <div className={styles.container} style={{height: props.innerHeight}}>
        <div className={styles.videoContainer}>
          <iframe
            src="https://player.vimeo.com/video/653361710?h=08379efee3&autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1"
            className={styles.video}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    </>
  );
};