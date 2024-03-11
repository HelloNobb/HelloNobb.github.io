import styled from "styled-components";

export const Topbar = styled.div`
  position: fixed;

  background: #121212;
  width: 100%;
  height: 52px;

  z-index: 100;

  text-align: right;
  color: white;

  > div {
    margin-right: 50px;
    > span {
      font-weight: 600;
      font-size: 16px;
      line-height: 52px;
      margin: 0 40px;

      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
  }

  > .iconify {
    display: inline-block;
    width: 36px;
    height: 36px;
    margin: 8px 12px;

    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
  }
`;

export const NavForMobile = styled.div`
  position: fixed;

  background: #121212;
  width: 100%;
  height: 100%;

  z-index: 101;

  text-align: right;
  color: white;

  > .iconify {
    width: 36px;
    height: 36px;
    padding: 14px;

    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
  }
  > div {
    width: 100%;
    text-align: left;
    > span {
      display: block;
      padding: 35px;

      font-weight: 600;
      font-size: 20px;

      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
  }
`;
