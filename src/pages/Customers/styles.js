import { redirect } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
  }
`;

export const Options = styled.div`
  display: flex;
  gap: 10px;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #3d3d3d;
  border-radius: 15px;
  padding: 5px 10px;

  input {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 10px;
    width: 100%;
    color: #fff;

    &::placeholder {
      font-size: 16px;
    }
  }
`;

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "250px",
    padding: "10px",
    height: "100%",
    borderRadius: "15px",
    backgroundColor: "#3d3d3d",
    border: "none",
    boxShadow: "none",
    color: state.hasValue ? "red" : "blue",
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#3d3d3d",
  }),

  singleValue: (provided, state) => ({
    ...provided,
    color: "#f1f1f1",
  }),

  option: (provided, state) => ({
    ...provided,

    backgroundColor: state.isSelected ? "#1d1d1d" : "#3d3d3d",
    "&:hover": {
      backgroundColor: "#1d1d1d",
    },
  }),
};

export const Statistics = styled.section`
  background-color: #ffffff15;
  padding: 30px;
  border-radius: 30px;
  display: flex;
  gap: 10px;
`;

export const Card = styled.div`
  padding-left: 30px;
  width: calc(100% / 3);
  display: flex;
  align-items: center;
  gap: 20px;

  & + & {
    border-left: 2px solid #fff8;
  }
`;

export const Icon = styled.div`
  width: 84px;
  height: 84px;
  padding: 10px;
  border-radius: 50%;
  background-image: linear-gradient(#b58c67, #271500);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    color: #f0f0f0;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }

  > span {
    font-size: 32px;
    font-weight: 600;
  }

  svg {
    width: 12px;
    margin-right: 4px;
  }

  div {
    display: flex;
    margin-top: 6px;
  }

  .decrease {
    svg {
      transform: rotate(180deg);
    }
    path {
      stroke: #d0004b;
    }
    span {
      color: #d0004b;
    }
  }

  h5 {
    margin: 0;
    font-weight: 400;
    color: #777;

    span {
      font-weight: 600;
      color: #fff;
    }
  }
`;

export const ActiveMembers = styled.div`
  margin-left: 25px;
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  img:not(:first-child) {
    margin-left: -7px;
  }
`;

export const CustomerContainer = styled.section`
  background-color: #ffffff15;
  padding: 30px;
  border-radius: 30px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
      font-weight: 600;
    }

    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 400;
      color: #b58c67;
    }
  }
`;

export const CustomerTable = styled.table`
  margin-block: 30px;
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    text-align: left;
    padding: 15px;
    border-bottom: 2px solid #eeeeee66;
  }

  th {
    font-weight: 400;
  }

  th:last-child {
    text-align: center;
  }

  .status {
    display: inline-block;
    width: 100%;
    padding: 5px 10px;
    color: #fff;
    border-radius: 5px;
    text-align: center;
  }

  .active {
    background-color: rgba(173, 255, 186, 0.4);
    color: #27c001;
  }

  .inactive {
    background-color: rgba(159, 82, 36, 25%);
    color: #ff6565;
  }
`;

export const Pagination = styled.div`
  display: flex;
  gap: 5px;
  a {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #797c7d;
    font-weight: 600;
    text-decoration: none;
    margin: 0 5px;
    padding: 10px;
    background-color: #333;
    border-radius: 4px;
    transition: background-color 0.3s;
    border: 2px solid #fff;
  }

  a.active {
    background-color: #b58c67;
    border-color: #b58c67;
    color: #fff;
  }

  svg {
    width: 15px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
