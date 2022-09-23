import React, { FunctionComponent } from "react";
import { Link, HeadFC, PageProps } from "gatsby";

export const Head: HeadFC = () => <title>Borg Plays - Not found</title>;

const NotFoundPage: FunctionComponent<PageProps> = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <p>Sorry 😔, we couldn’t find what you were looking for.</p>
      <p>
        <Link to="/">Go home</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;
