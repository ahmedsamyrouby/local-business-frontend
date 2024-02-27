import styled from "styled-components";

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 20%;
  background-color: #181818;
  color: #9197b3;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ul {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    li a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 15px;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      color: #9197b3;
      border-radius: 8px;
      transition: background-color 400ms, color 400ms;

      .fill {
        fill: #9197b3;
      }

      .stroke {
        stroke: #9197b3;
      }

      &.active {
        background-color: #b58c67;
        color: #181818;
      }

      &.active .fill {
        fill: #181818;
      }

      &.active .stroke {
        stroke: #181818;
      }

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

export const UserSwitcher = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
  cursor: pointer;
  border-radius: 0.5em;
  transition: background-color 0.3s ease;

  img {
    width: 3em;
    height: 3em;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.5em;
  }

  .info {
    flex-grow: 1;

    .name {
      display: block;
      font-weight: bold;
      font-size: 19px;
      color: #000000;
    }

    .title {
      display: block;
      color: #757575;
      font-size: 0.9375rem;
    }
  }

  .arrow {
    padding-left: 0.5em;
    display: flex;
    align-items: center;

    .feather {
      width: 1em;
      height: 1em;
    }
  }
`;
