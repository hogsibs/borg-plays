import type { HeadFC, PageProps } from "gatsby";
import React, { FunctionComponent } from "react";
import { Connector } from "../modules/Connector";

export const Head: HeadFC = () => <title>Borg Plays - Home</title>;

const IndexPage: FunctionComponent<PageProps> = () => {
  return (
    <main>
      <h1>Borg Plays</h1>
      <section>
        <p>Game will display here.</p>
        <Connector />
      </section>
    </main>
  );
};

export default IndexPage;
