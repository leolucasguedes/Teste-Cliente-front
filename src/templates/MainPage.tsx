import React, { useState } from "react";
import styled from "styled-components";
import SignUp from "../components/AddClient";
import Historic from "../components/Clients";

enum ActiveComponent {
  SignUp = "SignUp",
  Historic = "Historic",
}

function MainPage() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    ActiveComponent.SignUp
  );

  const handleNavItemClick = (component: ActiveComponent) => {
    setActiveComponent(component);
  };

  return (
    <Main>
      <nav>
        <button onClick={() => handleNavItemClick(ActiveComponent.SignUp)}>
          Início
        </button>

        <button onClick={() => handleNavItemClick(ActiveComponent.Historic)}>
          Cliente
        </button>
      </nav>
      {activeComponent === ActiveComponent.SignUp && <SignUp />}
      {activeComponent === ActiveComponent.Historic && <Historic />}
    </Main>
  );
}

export default MainPage;

const Main = styled.main`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333333;
  display: flex;
  justify-content: center;
  nav {
    top: 50px;
    left: 360px;
    height: 100px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    button {
      height: 40px;
      width: 80px;
      margin: 10px;
      font-size: 20px;
      color: #ffffff;
      background-color: #1877f2;
      border: none;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: quarion;
      cursor: pointer;
    }
  }
  @media (max-width: 1000px) {
    nav {
      margin-top: -60px;
  }
`;
