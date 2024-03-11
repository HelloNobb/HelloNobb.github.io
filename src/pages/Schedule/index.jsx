import React from "react";

import "./Schedule.css";

const Detail = (props) => {
  return (
    <>
      <div className="detail">
        <div className="box">
          <div className="detail_name">{props.name}</div>
          <div className="detail_period">{props.period}</div>
        </div>
      </div>
      <Next is_last={props.is_last}></Next>
    </>
  );
};

const Next = (props) => {
  return (
    <div>
      {props.is_last === false ? (
        <div className="circle">
          <div className="triangle" />
        </div>
      ) : null}
    </div>
  );
};

const Qualifiacation = (props) => {
  return (
    <div className="team">
      <div className="teamname">{props.teamname}</div>
      <div
        className="teaminfo"
        dangerouslySetInnerHTML={{ __html: props.text }}
      ></div>
    </div>
  );
};

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: [
        { name: "모집 기간", period: "03/12 ~ 03/21", is_last: false },
        { name: "1차 합격 발표", period: "03/25", is_last: false },
        { name: "면접 기간", period: "03/26 ~ 03/29", is_last: false },
        { name: "최종 합격자 발표", period: "04/03", is_last: true },
      ],
      teaminfo: [
        {
          teamname: "기획팀",
          text: "세계관 설정 및 시나리오 작성, 게임 장치 등을 설계합니다. <br> 머릿속에 만들고 싶은 게임이 있거나, 자신의 아이디어를 실현하고 싶은 솜솜이라면 누구든 환영합니다!",
        },
        {
          teamname: "디자인팀",
          text: "디자인툴(일러스트레이터, 포토샵, 클립스튜디오 등)을 다룰 수 있는 사람이라면 학과와 상관없이 모두 지원 가능합니다. <br> 실력을 같이 늘리고 경험을 같이 쌓고 싶으신 분들 모두 다 환영합니다.",
        },
        {
          teamname: "개발팀",
          text: `프로그래밍을 통해 게임을 개발합니다. <br> 일주일에 한 번 온라인 스터디를 통해 4주간 간단한 게임 개발 교육을 받으시면서 (교육 필참) 프로젝트 활동을 하게 됩니다. 프로젝트 활동은 누군가의 도움없이 스스로 찾아보고 개발 해야 하는 활동이기 때문에 프로그래밍 경험이 있는 솜솜이들의 지원을 권장합니다. <br> 비전공자이더라도, 1학년 새내기더라도, 프로그래밍 관련 수업을 들은 경험이 한 번이라도 있으면 지원이 가능합니다.`,
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <div id="schedule">
          <h2>모집일정</h2>
          <div className="details">
            {this.state.detail.map((e) => (
              <Detail
                name={e.name}
                period={e.period}
                is_last={e.is_last}
              ></Detail>
            ))}
          </div>
        </div>
        <hr />
        <div id="qualifiacation">
          <h2>지원 자격</h2>
          <div className="teamlist">
            {this.state.teaminfo.map((e) => (
              <Qualifiacation
                teamname={e.teamname}
                text={e.text}
              ></Qualifiacation>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
