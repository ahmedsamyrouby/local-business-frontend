import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "primary-brown",
  colors: {
    "primary-brown": [
      "#99896B",
      "#99896B",
      "#99896B",
      "#99896B",
      "#99896B",
      "#99896B",
      "#99896B",
      "#99896B",
      "#99896B",
      "#99896B",
    ],
  },
});

function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Notifications />
          <AppRouter />
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
