import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "cyan",
  fontFamily: 'Inter, sans-serif',
});

function App() {
  return (
    <>
      <MantineProvider theme={theme} forceColorScheme="light">
        <BrowserRouter>
          <Notifications />
          <AppRouter />
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
