import styled from "styled-components";

export const Button = styled.button`
  padding: 25px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.bgColor};
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin-block: 35px;
  transition: background-color 400ms;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverBgColor};
  }
`;
