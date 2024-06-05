import { Container, Group, Image, Title } from "@mantine/core";
import localLinkerLogo from "../../assets/local-linker-logo.svg";
import { Link } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/explore", label: "Explore" },
  { link: "/favorites", label: "Favorites" },
];

const Footer = () => {
  const items = links.map((link) => (
    <Link className="hover:underline" key={link.label} to={link.link}>
      {link.label}
    </Link>
  ));

  return (
    <div className="border-t">
      <Container className="flex flex-row justify-between items-center pt-8 pb-8">
        <div className="text-xl font-bold flex-center gap-2">
          <div className="w-16 h-16">
            <Image
              className="w-full"
              src={localLinkerLogo}
              alt="Local Linker Logo"
            />
          </div>
          <Title order={1}>Local Linker</Title>
        </div>
        <Group>{items}</Group>
      </Container>
    </div>
  );
};

export default Footer;
