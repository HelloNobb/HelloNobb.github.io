import { useState } from "react";
import { navData, projectData } from "./config";

import styles from "./style.module.scss";

const Project = ({ title, describe, img, onClick }) => {
  return (
    <div className={styles.project} onClick={onClick}>
      <img src={img} />
      <div>
        <h4>{title}</h4>
        <div dangerouslySetInnerHTML={{ __html: describe }}></div>
      </div>
    </div>
  );
};

export default () => {
  const [nav, setNav] = useState(0);

  return (
    <div className={styles.page}>
      <h2>프로젝트</h2>
      <div className={styles.nav}>
        {navData.map((val, idx) => {
          if (idx === nav)
            return (
              <div className={styles.selected} onClick={() => setNav(idx)}>
                {val}
              </div>
            );
          return <div onClick={() => setNav(idx)}>{val}</div>;
        })}
      </div>
      <hr />
      <h3>
        <span />
        {navData[nav]}
      </h3>
      <div className={styles.projects}>
        {projectData.map(
          (project) =>
            (project.nav === nav || nav === 0) && (
              <Project
                {...project}
                onClick={() => {
                  if (project.src) document.location.href = project.src;
                  else
                    alert(
                      "이 게임은 아직 플레이 해볼 수 없어요! \n다른 게임을 살펴보세요"
                    );
                }}
              />
            )
        )}
      </div>
    </div>
  );
};
