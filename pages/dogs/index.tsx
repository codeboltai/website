import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Doggo: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Our Doggos</title>
      </Head>

      <main>
        <h1>Check out our doggos.</h1>

        

        <p style={{ color: "#0070f3" }}>
          <Link href="/">Back Home</Link>
        </p>
      </main>
    </div>
  );
};

export default Doggo;
