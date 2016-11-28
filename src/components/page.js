import React from "react";
import { Link } from "react-router";
import { ScrollContainer } from "react-router-scroll";
import { times } from "lodash";
import MarkdownIt from "markdown-it";

// Child Components
import Sidebar from "./sidebar";
import Icon from "./icon";
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

  renderTransformedToc(siblings, targetLocation) {
    const md = MarkdownIt();

    return (
      <ul className="Sidebar-toc">
        {
          siblings.map((sibling, id) => {
            if (Array.isArray(sibling)) {
              return (
                <li className="Sidebar-toc-item" key={id}>
                  {this.renderTransformedToc(sibling, targetLocation)}
                </li>
              );
            }

            return sibling && (
              <li key={id} className="Sidebar-toc-item">
                <Link
                  to={`${targetLocation}#${sibling.anchor}`}
                  dangerouslySetInnerHTML={{__html: md.renderInline(sibling.content)}}
                />
              </li>
            );
          })
        }
      </ul>
    );
  }

  pushToLevel(siblings, level, heading) {
    siblings = siblings.slice(0);
    let parentTarget = siblings;
    let target;

    times(level, () => {
      target = parentTarget[parentTarget.length - 1];

      if (Array.isArray(target)) {
        parentTarget = target;
      } else {
        parentTarget.push([]);
        parentTarget = parentTarget[parentTarget.length - 1];
      }
    });

    if (Array.isArray(target)) {
      target.push(heading);
    } else {
      parentTarget.push(heading);
    }

    return siblings;
  }

  transformTocArray(headings) {
    const topHeading = headings[0];

    return headings.reduce((siblings, heading) => {
      const level = heading.level - topHeading.level;
      return this.pushToLevel(siblings, level, heading);
    }, []);
  }

  renderToc(targetLocation) {
    if (!this.props.location || (this.props.location.pathname !== targetLocation)) {
      return null;
    }

    const list = this.props.tocArray.filter((heading) => heading.level !== 1 && heading.level < 4);

    return this.renderTransformedToc(
      this.transformTocArray(list),
      targetLocation
    );
  }

  renderList(items, route) {
    const listItems = items.map((item) => {
      return (
        <li key={item.slug} className="Sidebar-list-item">
          <Link to={`/${route}/${item.slug}/`} className="btn btn--dark" activeClassName="is-active">
            <span>
              {item.text} <Icon />
            </span>
          </Link>
          {this.renderToc(`/${route}/${item.slug}/`)}
        </li>
      );
    });
    return (
      <div className="u-noMargin">
        <ul className="Sidebar-list">
          {listItems}
        </ul>
      </div>
    );
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
              location={this.props.location}
              tocArray={this.props.tocArray}
            >
              <div className="Sidebar-Grid">
                <h3 className="u-noMarginTop">
                  Documentation
                </h3>
                {this.renderList(this.props.docs, "docs")}
                <ul className="Sidebar-list">
                  <li className="Sidebar-list-item">
                    <a className="btn btn--dark"
                      href="https://github.com/FormidableLabs/webpack-dashboard/blob/master/CONTRIBUTING.md"
                      target="_blank"
                    >
                      <span>
                        Contributing <Icon />
                      </span>
                    </a>
                  </li>
                  <li className="Sidebar-list-item">
                    <Link to="/about/" className="btn btn--dark" activeClassName="is-active">
                      <span>
                        About <Icon />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Sidebar>
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
  docs: React.PropTypes.array,
  home: React.PropTypes.bool,
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
