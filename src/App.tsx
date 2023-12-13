import { ConfigProvider } from "antd";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-light-gray">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#3498DB",
            },
          }}
        >
          <Login />
        </ConfigProvider>
      </div>
    </>
  );
}

export default App;
