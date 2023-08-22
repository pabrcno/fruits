import styled from "styled-components";

const StyledControl = styled.h2`
  color: rgba(255, 255, 255, 0.5);
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  margin: 0;
  padding: 20;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: rgba(255, 255, 255, 0);
  }
`;

export const Controls = () => {
  return (
    <div>
      <StyledControl>🖱️ Click to shoot</StyledControl>
      <StyledControl>🖱️ Move</StyledControl>
      <StyledControl>⬆️ Speed Up</StyledControl>
    </div>
  );
};
