import React from "react";
import { ScrollContainer } from "react-router-scroll";

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
    const wrapperClasses = this.props.home ? "PageBg" : "PageBg PageBg--gray";
    /* eslint-disable max-len */
    return (
      <div className={wrapperClasses}>
        <div className="Grid">
          <main className="Page">
            <Sidebar
              active={this.props.sidebar}
              docs={config}
              location={this.props.location}
              tocArray={this.props.tocArray}
            />
            <ScrollContainer
              scrollKey="page-content"
              shouldUpdateScroll={this.shouldUpdateScroll}
            >
              <div className="Page-content Grid-col">
                {this.props.children}
              </div>
            </ScrollContainer>
          </main>
        </div>
      </div>
    );
  /* eslint-enable max-len */
  }
}

Page.propTypes = {
  children: React.PropTypes.node,
  home: React.PropTypes.bool,
  location: React.PropTypes.object,
  sidebar: React.PropTypes.string,
  tocArray: React.PropTypes.array
};

Page.defaultProps = {
  children: null,
  sidebar: "index",
  tocArray: []
};

export default Page;
