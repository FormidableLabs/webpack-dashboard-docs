import React from "react";
import { findIndex } from "lodash";

import MarkdownIt from "markdown-it";
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor";
import Prism from "prismjs";
/* eslint-disable no-unused-vars */
// add more language support
import jsx from "prismjs/components/prism-jsx";
import sh from "prismjs/components/prism-bash";
import yaml from "prismjs/components/prism-yaml";
/* eslint-enable no-unused-vars */

class Markdown extends React.Component {
  constructor() {
    super();
    this.state = {
      renderedMd: ""
    };
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentWillMount() {
    this.renderMd(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.active !== this.props.active) {
      this.renderMd(newProps);
    }
  }

  renderMd(props) {
    if (!props.location || !props.location.pathname) {
      this.setState({
        renderedMd: ""
      });
      return;
    }
    this.setMarkdownRenderer(props.location.pathname);
    this.setState({
      renderedMd: this.md.render(props.markdownFile)
    });
  }

  /* eslint-disable camelcase, max-params */
  // Create a markdown renderer that builds relative links
  // based on the currentPath and site's base href
  setMarkdownRenderer(currentPath) {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });

    md.use(markdownItTocAndAnchor, {
      anchorLinkSymbol: "",
      anchorClassName: "Anchor",
      tocCallback: (tocMarkdown, tocArray) => {
        this.props.updateTocArray(tocArray);
      }
    });

    // store the original rule
    const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, renderer) {
      return renderer.renderToken(tokens, idx, options);
    };

    const basename = this.props.basename;

    // Update anchor links to include the basename
    md.renderer.rules.link_open = function (tokens, idx, options, env, renderer) {
      const tokenAttrs = tokens[idx].attrs;
      const hrefIdx = findIndex(tokenAttrs, (arr) => arr.indexOf("href") >= 0);
      if (hrefIdx >= 0) {
        const href = tokenAttrs[hrefIdx];
        if (href.length > 1) {
          if (href[1].indexOf("#") === 0) {
            href[1] = `${basename}${currentPath}${href[1]}`;
            tokenAttrs.push(["aria-hidden", "true"]);
          }
        }
      }
      return defaultRender(tokens, idx, options, env, renderer);
    };

    this.md = md;
  }

  render() {
    return (
      <article
        className="Markdown"
        dangerouslySetInnerHTML={{
          __html: this.state.renderedMd
        }}
      />
    );
  }
}

Markdown.propTypes = {
  active: React.PropTypes.string.isRequired,
  basename: React.PropTypes.string.isRequired,
  location: React.PropTypes.object.isRequired,
  markdownFile: React.PropTypes.string,
  params: React.PropTypes.object,
  updateTocArray: React.PropTypes.func.isRequired
};

Markdown.defaultProps = {
  active: "index",
  params: null
};

export default Markdown;
