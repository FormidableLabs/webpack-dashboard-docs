import React from "react";
import { Link } from "react-router";
import MarkdownIt from "markdown-it";
import { times } from "lodash";

// Child Components
import Icon from "./icon";

class Sidebar extends React.Component {
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
    /* eslint-disable max-len */
    return (
      <div className="Page-sidebar Grid-col">
        <nav className="Sidebar">
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
        </nav>
      </div>
    );
  /* eslint-enable max-len */
  }
}

Sidebar.propTypes = {
  active: React.PropTypes.string,
  docs: React.PropTypes.array,
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  tocArray: React.PropTypes.array
};

Sidebar.defaultProps = {
  active: null,
  docs: []
};

export default Sidebar;
