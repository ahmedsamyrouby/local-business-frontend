import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  height: 100vh;
  font-family: "Inter", sans-serif;
`;

export const FormHeading = styled.h2`
  font-size: 32px;
  margin-bottom: 40px;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
`;

export const BodyWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  width: 70%;
`;

export const MediaHalf = styled.div`
  width: 50%;
  background-image: linear-gradient(#b58c67, #271500);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Paragraph = styled.p`
  font-size: 25px;
  color: #fff;
  text-align: center;
  padding: 50px 100px;
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const StyledLink = styled(Link)`
  color: var(--main-color);
  text-decoration: none;
  font-weight: 600;
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input[type="checkbox"] {
    display: none;
  }

  label {
    margin-left: 8px;
    vertical-align: middle;
    cursor: pointer;
    font-weight: 600;
  }
`;

export const CustomCheckbox = styled.span`
  position: relative;
  top: 0;
  left: 0;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  background-color: #f3f4f6;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  box-shadow: 2px 2px 1px 1px #0001;

  &:hover {
    background-color: #ddd;
  }

  ${Options} input:checked + & {
    background-color: #2196f3;
  }

  ${Options} input:checked + &::after {
    content: "";
    position: absolute;
    left: 9px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    font-weight: 600;
  }

  p {
    text-align: center;
    font-weight: 600;
    color: #4b5563;
  }
`;
