import React from "react";

class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About Webpack-Dashboard</h1>
        <iframe src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=webpack-dashboard&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=webpack-dashboard&type=watch&count=true&size=large&v=2" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=formidablelabs&repo=webpack-dashboard&type=fork&count=true&size=large" frameBorder="0" scrolling="0" width="158px" height="30px"></iframe>
        <p>Webpack-dashboard is a CLI dashboard plugin for webpack-dev-server. We believe that good UI is lacking in many dev environments,
         and we're trying to change that.</p>
        <a href="https://github.com/FormidableLabs/webpack-dashboard/graphs/contributors">See Contributors</a>
        {/*add top 5 contributors if we can figure out a good way with the github API*/}
        <p>Formidable is a Seattle-based consultancy and development shop, focused on open-source, full-stack JavaScript
         using React.js and Node.js, and the architecture of large-scale JavaScript applications. We build products for some
          of the world&#8217;s biggest companies, while helping their internal teams develop smart, thoughtful, and scalable systems.</p>
      </div>
    );
  }
}

export default About;
