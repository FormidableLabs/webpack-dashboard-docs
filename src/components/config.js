//
// Import markdown files from /docs folder in the repo
//

import DocsGettingStarted from "webpack-dashboard/docs/getting-started.md";
import DocsIndex from "webpack-dashboard/docs/api.md";

export const config = [
  {
    text: "Getting Started",
    slug: "getting-started",
    docs: DocsGettingStarted
  }, {
    text: "API",
    slug: "api",
    docs: DocsIndex
  }
];
