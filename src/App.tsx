import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Notifications />
          <AppRouter />
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
