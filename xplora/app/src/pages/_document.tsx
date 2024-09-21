import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body className="flex flex-col min-h-[100vh]">
        <div className="flex-1 bg-[#00d5ff1c]">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
