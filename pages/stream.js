import Meta from '../components/meta'

import styles from './stream.module.scss';

export default function StreamPage() {
  return (
    <>
      <Meta
        title="Stream"
        // metaDescription={props.metaDescription}
      />
      <div className={styles.container}>
        <h1>Stream coming soon</h1>
      </div>
    </>
  );
};