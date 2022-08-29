import React from "react";
import { Navbar, useTheme, Text } from "@nextui-org/react";

function NavBar() {
  const { isDark } = useTheme();
  return (
    <Navbar isBordered={isDark} variant="floating">
      <Navbar.Brand>
        <Text>SOCIAL APP</Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link>Home</Navbar.Link>
        <Navbar.Link>Mi Perfil</Navbar.Link>
        <Navbar.Link>Search</Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
}

export default NavBar;
