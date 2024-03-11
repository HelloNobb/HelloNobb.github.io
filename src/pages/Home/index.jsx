import React, { Component } from "react";
import { sectionList } from "./sections/sectionMapping";
import Empty from "./sections/Empty";

import "./styles.scss";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }
  render() {
    return (
      <div id="container">
        {sectionList.map((Section, idx) => {
          if (idx <= this.state.page) return <Section />;
          else return <Empty />;
        })}
      </div>
    );
  }
  componentDidMount() {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.6, // 50%가 viewport에 들어와 있어야 callback 실행
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          changePage();
        }
      });
    }, options);

    const container = document.querySelector("#container");
    const sections = container.childNodes;
    sections.forEach((element) => {
      observer.observe(element);
    });

    let flag = false;

    const changePage = () => {
      const change =
        Math.floor(
          document.documentElement.scrollTop / sections[0].clientHeight
        ) + 1;

      if (change < 0 || change > sections.length - 1) return;
      if (flag) return;
      flag = true;

      this.setState({ page: Math.max(this.state.page, change) });
      setTimeout(() => (flag = false), 500);
    };
  }
}

export default Main;
