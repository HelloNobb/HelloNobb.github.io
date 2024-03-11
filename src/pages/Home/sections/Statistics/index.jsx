import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { statisticsData } from "../../../../config";
import styles from "./style.module.scss";

import { sectionDisplay, figureRelay } from "../../commons/animation";

const Figure = ({ data }) => (
  <div>
    <span font-size="medium">{data.key}</span>
    <div font-size="xxlarge">{data.value}</div>
  </div>
);

class Section extends Component {
  render() {
    return (
      <div className={styles.section}>
        <div font-size="xxlarge">동덕여자대학교</div>
        <div font-size="xlarge">게임 개발 동아리 NPC</div>
        <MediaQuery minWidth={1200}>
          <span font-size="medium">
            다양한 분야의 사람들과의 협업, 구글 플레이 출시, 스터디 등 다양한
            경험을 쌓을 수 있습니다.
          </span>
        </MediaQuery>
        <div className={styles.figureLayout}>
          {statisticsData.map((data) => (
            <Figure data={data} />
          ))}
        </div>
        <MediaQuery maxWidth={1200}>
          <span font-size="medium">
            다양한 분야의 사람들과의 협업, 구글 플레이 출시, 스터디 등 다양한
            경험을 쌓을 수 있습니다.
          </span>
        </MediaQuery>
      </div>
    );
  }

  componentDidMount() {
    sectionDisplay(`.${styles.section}`);
    figureRelay(`.${styles.figureLayout}`);
  }
}

export default Section;
