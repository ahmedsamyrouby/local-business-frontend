import { ConfigProvider } from "antd";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3498DB",
          },
        }}
      >
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
