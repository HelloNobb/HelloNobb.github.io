import styled from "styled-components";

export const background = "#121212";

export const figureBG = {
  shadow: "#1E1E1E",
  point: "#E8E8E8",
  noticeable: "linear-gradient(180deg, #3E7FFF 0%, #0B46DC 100%)",
};

export const fontSize = {
  moblie: [
    { key: "title", value: "30px" },
    { key: "xlarge", value: "26px" },
    { key: "large", value: "22px" },
    { key: "medium", value: "16px" },
    { key: "small", value: "14px" },
    { key: "xsmall", value: "12px" },
  ],
  tablet: [
    { key: "title", value: "50px" },
    { key: "xlarge", value: "40px" },
    { key: "large", value: "30px" },
    { key: "medium", value: "25px" },
    { key: "small", value: "20px" },
    { key: "xsmall", value: "14px" },
  ],
  pc: [
    { key: "title", value: "50px" },
    { key: "xlarge", value: "40px" },
    { key: "large", value: "30px" },
    { key: "medium", value: "25px" },
    { key: "small", value: "20px" },
    { key: "xsmall", value: "14px" },
  ],
};

export const Page = styled.div`
  position: relative;
  background: ${background};
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    opacity: 0;
  }
  > .active {
    opacity: 1;
    animation: sectionActive 0.5s;
  }
  @keyframes sectionActive {
    from {
      opacity: 0;
      transform: translate(0, 100px);
    }
    to {
      opacity: 1;
      transform: translate(0, 0px);
    }
  }

  > div:first-child {
    opacity: 1;
  }
`;

export const styled_section = (styles) => styled.div`
  position: relative;
  min-height: calc(100vh - 52px);
  color: white;

  padding: 20px 0px;
  border: 1px blue;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  [font-size="title"],
  [font-size="xlarge"],
  [font-size="large"] {
    font-weight: 600;
  }

  span {
    color: #b4b4b4;
  }
  @media (min-width: 390px) {
    width: 390px;
    ${fontSize.moblie.map(
      ({ key, value }) => `[font-size = "${key}"] { font-size: ${value} }`
    )}
  }
  @media (min-width: 750px) {
    width: 750px;
    ${fontSize.tablet.map(
      ({ key, value }) => `[font-size = "${key}"] { font-size: ${value} }`
    )}
  }
  @media (min-width: 1200px) {
    width: 1200px;
    ${fontSize.pc.map(
      ({ key, value }) => `[font-size = "${key}"]{ font-size: ${value} }`
    )}
  }
  ${styles}
`;

export const styled_objectGroup = (styles) => styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  margin: 20px 0;

  > div {
    margin: 7.5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  ${styles}
`;
