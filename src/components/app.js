import React from "react";
import { Link } from "react-router";

// Variables and Stylesheet
import "../styles/styles.css";
import { Header } from "formidable-landers";

class App extends React.Component {
  render() {
    const webpackLogo = (
      <Link to="/" className="Heading">
        Webpack Dashboard
      </Link>
    );
    return (
      <div className="Site">
        <Header
          className="default"
          logoProject={webpackLogo}
          theme="light"
        >
          <div className="default">
            <Link to="/about/" className="formidableHeader-link" activeClassName="is-active">
              About
            </Link>
            <Link to="/docs/" className="formidableHeader-link" activeClassName="is-active">
              Docs
            </Link>
            <a href="https://github.com/FormidableLabs/webpack-dashboard/issues">
              Issues
            </a>
            <a href="https://github.com/FormidableLabs/webpack-dashboard/">
              GitHub
            </a>
          </div>
        </Header>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node
};

App.defaultProps = {
  children: null
};

export default App;
