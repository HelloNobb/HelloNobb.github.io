import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { curriculumData } from "../../../../config";
import styles from "./styles.module.scss";

import { sectionDisplay, figureRelay } from "../../commons/animation";

const Figure = ({ data }) => (
  <div>
    <div font-size="large">{data.key}</div>
    <span font-size="xsmall">{data.value}</span>
  </div>
);
class Section extends Component {
  render() {
    return (
      <div className={styles.section}>
        <div font-size="xlarge">
          약 1년 간{" "}
          <MediaQuery maxWidth={750}>
            <br />
          </MediaQuery>
          어떤 활동을 하게되나요?
        </div>
        <span font-size="small">
          희망자에 따라 <b>MT, 스터디, 사이드 프로젝트</b> 등 다양한 활동들도
          함께할 수 있습니다
        </span>
        <div className={styles.figureLayout}>
          {curriculumData.map((data) => (
            <Figure data={data} />
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    sectionDisplay(`.${styles.section}`);
    figureRelay(`.${styles.figureLayout}`);
    // alert(document.querySelector(`.${styles.figureLayout}`));
  }
}

export default Section;
