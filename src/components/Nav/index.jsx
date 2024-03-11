import React from "react";
import MediaQuery from "react-responsive";
import { Icon } from "@iconify/react";
import { Topbar, NavForMobile } from "./styledComponents";

import { pageList } from "../../utils/pageMapping";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      NavForMobile: false,
    };
  }

  render() {
    const setActiveNavForMobile = (active) => {
      this.setState({ ...this.state, NavForMobile: active });
    };
    const LinkList = (
      <div>
        {pageList.map((page, idx) => (
          <span
            onClick={() => {
              this.props.changePage(idx);
              setActiveNavForMobile(false);
            }}
          >
            {page.props.name}
          </span>
        ))}
      </div>
    );

    return (
      <>
        {/* PC ver  */}
        <MediaQuery minWidth={1200}>
          <Topbar>{LinkList}</Topbar>
        </MediaQuery>

        {/* Mobile ver  */}
        <MediaQuery
          maxWidth={1200}
          onChange={(matches) => {
            if (matches) setActiveNavForMobile(false);
          }}
        >
          <Topbar>
            <Icon icon="mi:menu" onClick={() => setActiveNavForMobile(true)} />
          </Topbar>
          {this.state.NavForMobile ? (
            <NavForMobile>
              <Icon
                icon="ph:x-bold"
                onClick={() => setActiveNavForMobile(false)}
              />
              {LinkList}
            </NavForMobile>
          ) : null}
        </MediaQuery>
      </>
    );
  }
}

export default Nav;
