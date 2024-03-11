import React from "react";
import { Icon } from "@iconify/react";
import { projectData } from "../../../../config";

import styles from "./style.module.scss";
import { sectionDisplay, display } from "../../commons/animation";

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: projectData,
      idx: 0,
    };
  }

  idxChange = (idx) => {
    if (idx < 0 || idx >= this.state.projects.length) return;
    this.setState({ ...this.state, idx });
  };

  render() {
    const prev = [];
    const next = [];
    this.state.projects.forEach((project, idx) => {
      const stack = idx <= this.state.idx ? prev : next;
      const move =
        idx - this.state.idx > 0 ? 75 : idx - this.state.idx === 0 ? 0 : -75;
      stack.push(
        <img
          viewIdx={idx - this.state.idx}
          src={project.img}
          style={{ transform: `translate(${move}%, 0)` }}
        />
      );
    });
    const projectImgs = [...prev];
    projectImgs.push(...next.reverse());

    return (
      <div className={styles.section}>
        <div font-size="xlarge">NPC 프로젝트</div>
        <div font-size="medium"></div>
        <div>
          <div className={styles.projects}>{projectImgs}</div>
          <div className={styles.arrow}>
            <div>
              <Icon
                icon="ph:caret-left-bold"
                onClick={() => this.idxChange(this.state.idx - 1)}
              />
            </div>
            <div>
              <Icon
                icon="ph:caret-right-bold"
                onClick={() => this.idxChange(this.state.idx + 1)}
              />
            </div>
          </div>
        </div>
        <div className={styles.nav}>
          {this.state.projects.map((project, idx) => (
            <div
              viewIdx={idx - this.state.idx}
              onClick={() => this.idxChange(idx)}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    sectionDisplay(`.${styles.section} > div:nth-child(1)`);
    sectionDisplay(`.${styles.section} > div:nth-child(2)`);
    display(`.${styles.section} > div:nth-child(3)`);
    display(`.${styles.section} > div:nth-child(4)`);
  }
}

export default Projects;
