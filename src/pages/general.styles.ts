import styled from "styled-components";

export const ScreenContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #ddd;
  position: relative;
`;

export const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4em;
  background-color: #0001;

  opacity: 1;
  display: flex;
  align-items: center;

  z-index: 1;
`;

export const NavItem = styled.div`
  font-family: "Lobster", cursive;
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin: 0 1rem;
  padding: 0;
  letter-spacing: 0.1rem;
  opacity: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

export const ActionButton = styled.button`
  font-family: "Lobster", cursive;
  font-size: 2rem;
  color: #ffff;
  text-align: center;
  margin: 0 0.8rem;
  padding: 0;
  min-width: 10rem;
  letter-spacing: 0.1rem;
  opacity: 0.8;
  background-color: green;
  border: none;
  border-radius: 10rem;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #c0c;
    transform: scale(1.1);
    opacity: 1;
  }
`;
export const ActionButtonContainer = styled.div`
  position: absolute;
  bottom: 15%;
  right: 1%;
`;
