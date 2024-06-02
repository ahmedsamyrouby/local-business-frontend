import { Container, Group } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";
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
        <div className="text-xl font-bold text-gray-900 flex gap-2">
          <IconBriefcase size={26} />
          Local Businesses
        </div>
        <Group>{items}</Group>
      </Container>
    </div>
  );
};

export default Footer;
