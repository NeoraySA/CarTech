import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html dir="rtl" lang="he">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
