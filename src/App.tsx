import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
