import React, { Component } from "react";
import styles from "./style.module.scss";
import { sectionDisplay } from "../../commons/animation";

class Section extends Component {
  render() {
    return (
      <div className={styles.section}>
        <div font-size="xxlarge">우리는 그 자체로 특별하다</div>
        <div font-size="medium">
          <b>N</b>onesuchable <b>P</b>eople who <b>C</b>reates games
        </div>
      </div>
    );
  }
  componentDidMount() {
    sectionDisplay(`.${styles.section}`);
  }
}

export default Section;
