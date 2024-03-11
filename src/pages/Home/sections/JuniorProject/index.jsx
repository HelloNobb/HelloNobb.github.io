import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { juniorProjectData } from "../../../../config";

import styles from "./style.module.scss";

import {
  sectionDisplay,
  figureRelay,
  pathDisplay,
} from "../../commons/animation";

const Step = ({ idx, data }) => (
  <div className={styles.step}>
    <div font-size="large">0{idx + 1}</div>
    <div>
      <div font-size="large">{data.key}</div>
      <span font-size="xsmall">{data.value}</span>
    </div>
  </div>
);
class Section extends Component {
  render() {
    return (
      <div className={styles.section}>
        <div font-size="xlarge">
          신입부원 프로젝트는 어떻게&nbsp;
          <MediaQuery maxWidth={750}>
            <br />
          </MediaQuery>
          진행되나요?
        </div>
        <div className={styles.stepLayout}>
          {juniorProjectData.map((data, idx) => (
            <Step data={data} idx={idx} />
          ))}

          <svg className={styles.road}>
            <MediaQuery maxWidth={750}>
              <path stroke="#E8E8E8" stroke-width="10" />
            </MediaQuery>
            <MediaQuery minWidth={750}>
              <path stroke="#E8E8E8" stroke-width="15" />
            </MediaQuery>
          </svg>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const stepLayout = document.querySelector(`.${styles.stepLayout}`);
    const pathSVG = document.querySelector(`.${styles.road}`);
    pathSVG.setAttribute("width", stepLayout.clientWidth);
    pathSVG.setAttribute("height", stepLayout.clientHeight);

    const steps = stepLayout.childNodes;

    const coord = [];
    for (let i = 0; i < steps.length - 1; i++) {
      coord.push([
        steps[i].offsetLeft + steps[i].firstChild.offsetWidth / 2,
        steps[i].offsetTop + steps[i].firstChild.offsetHeight / 2,
      ]);
    }

    const paths = [];
    paths[0] = `M${[coord[0], coord[0], coord[0], coord[0]]
      .map((c) => c.join(" "))
      .join("L")}`;
    paths[1] = `M${[coord[0], coord[1], coord[1], coord[1]]
      .map((c) => c.join(" "))
      .join("L")}`;
    paths[2] = `M${[coord[0], coord[1], coord[2], coord[2]]
      .map((c) => c.join(" "))
      .join("L")}`;
    paths[3] = `M${[coord[0], coord[1], coord[2], coord[3]]
      .map((c) => c.join(" "))
      .join("L")}`;

    sectionDisplay(`.${styles.section}`);
    figureRelay(`.${styles.stepLayout}`);
    pathDisplay(`.${styles.road} path`, paths);
  }
}

export default Section;
