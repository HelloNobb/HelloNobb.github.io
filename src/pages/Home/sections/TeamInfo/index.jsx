import React from "react";
import MediaQuery from "react-responsive";
import { Icon } from "@iconify/react";
import { teamInfoData } from "../../../../config";

import styles from "./style.module.scss";

import { sectionDisplay, display } from "../../commons/animation";

class TeamInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { idx: 0 };
  }

  idxChange = (idx) => {
    if (idx < 0 || idx >= teamInfoData.length) return;
    this.setState({ idx });
  };

  render() {
    return (
      <div className={styles.section}>
        <div font-size="xlarge">NPC 팀 구성</div>
        <span font-size="medium">
          NPC는 <b>게임 기획팀, 디자인팀, 개발팀</b>의 구성으로 이루어져
          있습니다.
        </span>

        <MediaQuery maxWidth={1200}>
          <div className={styles.moblie}>
            <div className={styles.nav}>
              {teamInfoData.map((data, idx) => {
                if (this.state.idx === idx) return <div>{data.name}</div>;
                return (
                  <span onClick={() => this.idxChange(idx)}>{data.name}</span>
                );
              })}
            </div>
            <div className={styles.box}>
              <img src={require("./" + teamInfoData[this.state.idx].image)} />
              <div>{teamInfoData[this.state.idx].title}</div>
              <div>{teamInfoData[this.state.idx].content}</div>
            </div>
          </div>
          <MediaQuery minWidth={750}>
            <div className={styles.arrow}>
              <Icon
                icon="ph:caret-left-bold"
                onClick={() => this.idxChange(this.state.idx - 1)}
              />
              <Icon
                icon="ph:caret-right-bold"
                onClick={() => this.idxChange(this.state.idx + 1)}
              />
            </div>
          </MediaQuery>
        </MediaQuery>
        <MediaQuery minWidth={1200}>
          <div className={styles.pc}>
            {teamInfoData.map((data) => (
              <div className={styles.box}>
                <img src={require("./" + data.image)} />
                <div>{data.title}</div>
                <div>{data.content}</div>
              </div>
            ))}
          </div>
        </MediaQuery>
      </div>
    );
  }

  componentDidMount() {
    sectionDisplay(`.${styles.section} > div:nth-child(1)`);
    sectionDisplay(`.${styles.section} > span:nth-child(2)`);
    display(`.${styles.section}  .${styles.pc}`);
    display(`.${styles.section} .${styles.moblie}`);
    display(`.${styles.section}  .${styles.arrow}`);
  }
}

export default TeamInfo;
