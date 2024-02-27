import { createContext, useState } from "react";

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(true);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
