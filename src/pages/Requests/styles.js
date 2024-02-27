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

export const Heading = styled.h2`
  margin: 0;
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

export const CustomerContainer = styled.section`
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
  }

  th {
    padding-block: 5px;
    background-color: rgba(248, 248, 248, 0.22);
    color: #d2d2d2;
    font-weight: 400;
  }

  th:last-child {
    text-align: center;
  }

  td {
    border-bottom: 2px solid #eeeeee66;
  }

  td:last-child {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .btn {
    padding: 5px 10px;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    border: none;
    padding-block: 8px;
  }

  .btn-approve {
    background-color: rgba(173, 255, 186, 0.25);
    color: #27c001;
  }

  .btn-delete {
    background-color: rgba(255, 197, 197, 0.25);
    color: #df0404;
  }
`;
