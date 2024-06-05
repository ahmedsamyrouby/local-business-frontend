import { Title, Text, Button, Container, Group } from "@mantine/core";

const NotFound = () => {
  document.title = "404 Not Found";
  return (
    <div className="bg-primary pt-20 pb-32 h-screen flex-center relative">
      <Container>
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="font-black text-[30rem] leading-none text-black/10">
            404
          </div>
        </div>
        <div className="relative z-10 space-y-4">
          <Title className="text-center font-black text-[4rem] text-white">
            Nothing to see here
          </Title>
          <Text
            size="lg"
            ta="center"
            className="max-w-[135rem] mx-auto mt-xl text-blue-100"
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <Button
              variant="white"
              size="md"
              onClick={() => {
                window.history.back();
              }}
            >
              Go Back
            </Button>
          </Group>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
