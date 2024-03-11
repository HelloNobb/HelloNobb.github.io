import React, { Component } from "react";
import styles from "./style.module.scss";

class Section extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.section}>
        <img src={require("./title.webp")} />
      </div>
    );
  }
}

export default Section;
