import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Webpack Dashboard</h1>
        <p>A CLI dashboard for webpack dev server.</p>
        <pre><code>npm install webpack-dashboard --save-dev</code></pre>
        <a href="https://github.com/FormidableLabs/webpack-dashboard">Source Code on GitHub</a>
        <br/>
        <a href="https://github.com/FormidableLabs/webpack-dashboard/issues">Report an Issue</a>
        <p>When using webpack, especially for a dev server, you are probably used to seeing something like this:</p>
        <img src="http://i.imgur.com/p1uAqkD.png" alt="webpack output in terminal"/>
        <p>That's cool, but it&#8217;s mostly noisy and scrolly and not super helpful. This plugin changes that. Now when 
        you run your dev server, you basically work at NASA:</p>
        <img src="http://i.imgur.com/5BWa1hB.png" alt="webpack output in terminal with webpack-dashboard" />
      {/*Getting started will live here*/}
      </div>
    );
  }
}

export default Home;
