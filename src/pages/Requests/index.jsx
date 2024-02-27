import React from "react";
import {
  Container,
  CustomerContainer,
  CustomerTable,
  InputContainer,
  Header,
  Heading,
} from "./styles";

export default function Requests() {
  const options = [
    { value: "customers", label: "Sort by: Customers" },
    { value: "country", label: "Sort by: Country" },
    { value: "status", label: "Sort by: status" },
  ];

  return (
    <>
      <Container>
        <Header>
          <h2>Hello Walaa 👋🏻,</h2>
          <InputContainer>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#7E7E7E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#7E7E7E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input type="text" placeholder="Search" />
          </InputContainer>
        </Header>

        <Heading>New Requests</Heading>

        <CustomerContainer>
          <CustomerTable>
            <thead>
              <tr>
                <th>Time</th>
                <th>Requester Name</th>
                <th>Current Location</th>
                <th>Service</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>11:30 PM</td>
                <td>Helen Hywater</td>
                <td>1234 Some Street Name, City...</td>
                <td>Food</td>
                <td>
                  <button className="btn btn-approve">Approve</button>
                  <button className="btn btn-delete">Delete</button>
                </td>
              </tr>

              <tr>
                <td>11:30 PM</td>
                <td>Helen Hywater</td>
                <td>1234 Some Street Name, City...</td>
                <td>Food</td>
                <td>
                  <button className="btn btn-approve">Approve</button>
                  <button className="btn btn-delete">Delete</button>
                </td>
              </tr>

              <tr>
                <td>11:30 PM</td>
                <td>Helen Hywater</td>
                <td>1234 Some Street Name, City...</td>
                <td>Food</td>
                <td>
                  <button className="btn btn-approve">Approve</button>
                  <button className="btn btn-delete">Delete</button>
                </td>
              </tr>
            </tbody>
          </CustomerTable>
        </CustomerContainer>
      </Container>
    </>
  );
}
