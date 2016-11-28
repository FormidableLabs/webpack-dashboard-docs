import React from "react";
import { find } from "lodash";

// Child components
import basename from "../../basename";
import { config } from "../../components/config";
import Page from "../../components/page";
import TitleMeta from "../../components/title-meta";
import Markdown from "../../components/markdown";

class Docs extends React.Component {
  constructor() {
    super();

    this.state = {
      tocArray: []
    };
  }

  updateTocArray(tocArray) {
    this.setState({tocArray});
  }

  renderContent(activePage) {
    const conf = find(config, { slug: activePage });
    const markdownDocs = conf.docs;
    const editUrl = `https://github.com/FormidableLabs/webpack-dashboard/blob/master/docs/${activePage}/docs.md`;
    return (
      <div>
        <a href={editUrl} className="SubHeading">Edit this page</a>
        <Markdown
          active={activePage}
          basename={basename}
          location={this.props.location}
          markdownFile={markdownDocs}
          updateTocArray={this.updateTocArray.bind(this)}
        />
      </div>
    );
  }

  render() {
    const activePage = this.props.params.component ?
      this.props.params.component : "index";

    return (
      <TitleMeta title="Webpack Dashboard | Documentation">
        <Page
          location={this.props.location}
          sidebar={activePage}
          tocArray={this.state.tocArray}
        >
          { this.renderContent(activePage) }
        </Page>
      </TitleMeta>
    );
  }
}

Docs.propTypes = {
  location: React.PropTypes.object,
  params: React.PropTypes.object
};

Docs.defaultProps = {
  params: null
};

export default Docs;
