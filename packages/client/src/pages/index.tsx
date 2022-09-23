import React, { FunctionComponent } from "react";
import type { HeadFC, PageProps } from "gatsby";

export const Head: HeadFC = () => <title>Borg Plays - Home</title>;

const IndexPage: FunctionComponent<PageProps> = () => {
  return (
    <main>
      <h1>Borg Plays</h1>
      <section>
        <p>Game will display here.</p>
      </section>
    </main>
  );
};

export default IndexPage;
