import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout
      description="Lighthouse documentation powered by Docusaurus"
      title="Lighthouse Docs"
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            Permanent storage, simplified
          </Heading>
          <p className={styles.heroSubtitle}>
            Explore guides, tutorials, and references for building with Lighthouse on Filecoin and IPFS.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/quick-start"
            >
              Start building
            </Link>
            <Link className="button button--secondary button--lg" to="/how-to/create-an-api-key">
              Generate an API key
            </Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className={styles.grid}>
          <div className={styles.card}>
            <Heading as="h3">How-to guides</Heading>
            <p>Follow step-by-step instructions for uploading, encrypting, and managing data on Lighthouse.</p>
            <Link to="/how-to/upload-data">Browse guides →</Link>
          </div>
          <div className={styles.card}>
            <Heading as="h3">Tutorials</Heading>
            <p>Build applications end-to-end with walkthroughs covering NFTs, token gating, and more.</p>
            <Link to="/tutorials/create-pay-to-view-media">Explore tutorials →</Link>
          </div>
          <div className={styles.card}>
            <Heading as="h3">Concepts</Heading>
            <p>Learn the fundamentals behind Lighthouse, Filecoin storage, and IPFS CID formats.</p>
            <Link to="/concepts/glossary">Read concepts →</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
