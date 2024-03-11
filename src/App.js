import React from "react";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import { pageList } from "./utils/pageMapping";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };
  }

  changePage = (page) => {
    this.setState({ ...this.state, page });
  };

  render() {
    const page = pageList[this.state.page];

    return (
      <>
        <Nav changePage={this.changePage}></Nav>
        {page}
        {/* <Footer></Footer> */}
      </>
    );
  }
}

export default App;
