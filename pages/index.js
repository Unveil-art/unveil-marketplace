import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button className="btn btn-secondary">Button</button>
      <button className="btn btn-primary">Button</button>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <h6>Header 6</h6>
      <p className="s1">S 1</p>
      <p className="s2">S 2</p>
      <p className="b1">Body 1</p>
      <p className="b2">Body 2</p>
      <p className="b3">Body 3</p>
      <p className="b4">Body 4</p>
      <p className="b5">Body 5</p>
    </div>
  );
}
