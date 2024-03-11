import styles from "./style.module.scss";

import qnaData from "./config";
import { Icon } from "@iconify/react";

const Question = ({ q, a }) => {
  return (
    <div className={styles.question}>
      <div>
        <div>
          <Icon icon="emojione-monotone:letter-q" color="#4c88ff" />
        </div>
        {q}
      </div>
      <div dangerouslySetInnerHTML={{ __html: a }}></div>
    </div>
  );
};

export default () => {
  return (
    <div className={styles.page}>
      <h2>QnA</h2>
      <hr />
      <div>
        {qnaData.map((data) => (
          <Question {...data} />
        ))}
      </div>
    </div>
  );
};
