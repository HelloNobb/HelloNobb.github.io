import React, { Component } from "react";
import { apply } from "../../../../config";

import styles from "./style.module.scss";
import { sectionDisplay } from "../../commons/animation";

class Apply extends Component {
  render() {
    return (
      <div className={styles.section}>
        <div font-size="large">NPC {apply.type} 멤버가 되고 싶다면</div>
        <div
          className={styles.apply}
          font-size="medium"
          onClick={() => {
            if (apply.form) document.location.href = apply.form;
            else
              alert(
                "현재는 지원 기간이 아닙니다.\n상반기 모집: 5월 중 예상\n후반기 모집: 11월 중 예상"
              );
          }}
        >
          {apply.type} 지원하기
        </div>
      </div>
    );
  }
  componentDidMount() {
    sectionDisplay(`.${styles.section}`);
  }
}

export default Apply;
