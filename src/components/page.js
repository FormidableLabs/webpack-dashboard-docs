import React from "react";
import { Link } from "react-router";
import { ScrollContainer } from "react-router-scroll";
import { Footer } from "formidable-landers";

// Child Components
import Sidebar from "./sidebar";
import { config } from "./config";

class Page extends React.Component {
  shouldUpdateScroll(scrollBehavior, prevRouterProps) {
    if (scrollBehavior && scrollBehavior.location && prevRouterProps && prevRouterProps.location) {
      // if the previous URL remains unchanged, don’t scroll the container pls
      if (prevRouterProps.location.pathname === scrollBehavior.location.pathname) {
        return false;
      }
    }
    return true;
  }
  render() {
    /* eslint-disable max-len */
    return (
      <main className="Page">
        <Sidebar
          active={this.props.sidebar}
          location={this.props.location}
          tocArray={this.props.tocArray}
        >
          <div className="Sidebar-Grid">
            <p className="Sidebar-Heading u-noMargin u-noPadding">
              Introduction
            </p>
            <ul className="Sidebar-List">
              <li key="sidebarlink-index" className="Sidebar-List-Item">
                <Link to="/docs" activeClassName="is-active">
                  Getting Started
                </Link>
              </li>
              <li key="sidebarlink-native" className="Sidebar-List-Item">
                <Link to="/docs/native" activeClassName="is-active">
                  Native
                </Link>
              </li>
              <li key="sidebarlink-contributing" className="Sidebar-List-Item">
                <a href="https://github.com/FormidableLabs/victory/#contributing">
                  Contributing
                </a>
              </li>
            </ul>
            <p className="Sidebar-Heading u-noMarginTop">
              Documentation
            </p>
            {this.renderList(this.props.docs, "docs", "chart")}
            {this.renderList(this.props.docs, "docs", "core")}
            {this.renderList(this.props.docs, "docs", "more")}
          </div>
        </Sidebar>
        <ScrollContainer
          scrollKey="page-content"
          shouldUpdateScroll={this.shouldUpdateScroll}
        >
          <div className="Page-content">
            <article className="Article">
              {this.props.children}
            </article>
            <Footer className="default" />
          </div>
        </ScrollContainer>
      </main>
    );
  /* eslint-enable max-len */
  }
}

Page.propTypes = {
  children: React.PropTypes.node,
  docs: React.PropTypes.array,
  location: React.PropTypes.object,
  sidebar: React.PropTypes.string,
  tocArray: React.PropTypes.array
};

Page.defaultProps = {
  children: null,
  docs: config,
  sidebar: "index",
  tocArray: []
};

export default Page;
