import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;

  overflow: hidden;
  background-color: #ddd;
  position: relative;
`;

export const MainTitle = styled.h1`
  font-family: "Lobster", cursive;
  font-size: 5rem;
  color: #fff;
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 1;

  letter-spacing: 0.5rem;
  opacity: 1;
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
  background-color: #606;
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

export const Center = styled.div`
  position: absolute;
  top: 30%;
  left: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0 2rem;
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
  justify-content: flex-end;

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
