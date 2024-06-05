import { Title, Text, Button, Container, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../services/LocalStorageService";

const UnAuthorized = () => {
  const navigate = useNavigate();
  const role = getLocalStorage("role");
  document.title = "401 Unauthorized";
  return (
    <div className="bg-primary pt-20 pb-32 h-screen flex-center relative">
      <Container>
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="font-black text-[30rem] leading-none text-black/10">
            401
          </div>
        </div>
        <div className="relative z-10 space-y-4">
          <Title className="text-center font-black text-[3rem] text-white">
            Sorry! You're not authorized to view this page.
          </Title>
          <Text
            size="lg"
            ta="center"
            className="max-w-[135rem] mx-auto mt-xl text-blue-100"
          >
            You may not have the required permissions to view this page. If you
            think this is an error try to login again.
          </Text>
          <Group justify="center">
            <Button
              variant="white"
              size="md"
              onClick={() => {
                navigate("/login", { replace: true });
              }}
            >
              Login
            </Button>
          </Group>
        </div>
      </Container>
    </div>
  );
};

export default UnAuthorized;
