import React from "react";
import {
  ActiveMembers,
  Card,
  Container,
  Content,
  CustomerContainer,
  CustomerTable,
  Footer,
  Header,
  Icon,
  InputContainer,
  Options,
  Pagination,
  Statistics,
  customStyles,
} from "./styles";
import totalCustomersIcon from "../../assets/icons/total-customers.svg";
import monitorIcon from "../../assets/icons/monitor.svg";
import profileTickIcon from "../../assets/icons/profile-tick.svg";
import member1 from "../../assets/members/1.png";
import member2 from "../../assets/members/2.png";
import member3 from "../../assets/members/3.png";
import member4 from "../../assets/members/4.png";
import member5 from "../../assets/members/5.png";

import Select from "react-select";

import { Link } from "react-router-dom";

export default function Customers() {
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
        <Statistics>
          <Card>
            <Icon>
              <img src={totalCustomersIcon} />
            </Icon>
            <Content>
              <h3>Total Customers</h3>
              <span>5,423</span>
              <div>
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 14L7 2"
                    stroke="#EEEEEE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.16669 7.00002L7.00002 1.16669L12.8334 7.00002"
                    stroke="#EEEEEE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <h5>
                  <span>16%</span> this month
                </h5>
              </div>
            </Content>
          </Card>

          <Card>
            <Icon>
              <img src={profileTickIcon} />
            </Icon>
            <Content>
              <h3>Members</h3>
              <span>1,893</span>
              <div className="decrease">
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 14L7 2"
                    stroke="#EEEEEE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.16669 7.00002L7.00002 1.16669L12.8334 7.00002"
                    stroke="#EEEEEE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <h5>
                  <span>1%</span> this month
                </h5>
              </div>
            </Content>
          </Card>

          <Card>
            <Icon>
              <img src={monitorIcon} />
            </Icon>
            <Content>
              <h3>Active Now</h3>
              <span>189</span>
              <ActiveMembers>
                <img src={member1} />
                <img src={member2} />
                <img src={member3} />
                <img src={member4} />
                <img src={member5} />
              </ActiveMembers>
            </Content>
          </Card>
        </Statistics>
        <CustomerContainer>
          <header>
            <div className="title">
              <h2>All Customers</h2>
              <h3>Active Members</h3>
            </div>

            <Options>
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

              <Select
                options={options}
                defaultValue={{
                  value: "customers",
                  label: "Sort by: Customers",
                }}
                styles={customStyles}
                components={{ IndicatorSeparator: () => null }}
              />
            </Options>
          </header>
          <CustomerTable>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Business</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Country</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Jane Cooper</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>jane@microsoft.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Active</span>
                </td>
              </tr>

              <tr>
                <td>Floyd Miles</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>floyd@yahoo.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status inactive">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>

              <tr>
                <td>Ronald Richards</td>
                <td>Food</td>
                <td>0101111111111111</td>
                <td>ronald@adobe.com</td>
                <td>Egypt</td>
                <td>
                  <span className="status active">Inactive</span>
                </td>
              </tr>
            </tbody>
          </CustomerTable>
          <Footer>
            <p>
              Showing data <span className="start">1</span> to{" "}
              <span className="end">8</span> of{" "}
              <span className="total">256K</span> entries
            </p>

            <Pagination>
              <Link className="previous">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>
              <Link className="active">1</Link>
              <Link>2</Link>
              <Link>3</Link>
              <Link>4</Link>
              <span>...</span>
              <Link>40</Link>
              <Link className="next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </Pagination>
          </Footer>
        </CustomerContainer>
      </Container>
    </>
  );
}
