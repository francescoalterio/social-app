import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Checkbox,
  Container,
  Input,
  Text,
  Link as UILink,
  Loading,
} from "@nextui-org/react";
import React from "react";
import { IoMail, IoLockClosed } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password, remember }),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  return (
    <>
      <Container
        fluid
        display="flex"
        justify="center"
        alignItems="center"
        css={{ height: "100vh" }}
      >
        <Container
          as="form"
          display="flex"
          alignItems="center"
          justify="space-evenly"
          css={{
            maxWidth: 400,
            height: 350,
            flexDirection: "column",
            backgroundColor: "#1a1a1a",
            borderRadius: 20,
          }}
        >
          <Text id="modal-title" size={18}>
            Login in
            <Text b size={18}>
              {" "}
              Social APP
            </Text>
          </Text>
          <Input
            clearable
            bordered
            fullWidth
            required
            color="success"
            size="lg"
            placeholder="Email"
            contentLeft={<IoMail />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            required
            color="success"
            size="lg"
            placeholder="Password"
            contentLeft={<IoLockClosed />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Container
            fluid
            display="flex"
            alignItems="center"
            justify="space-between"
            gap={0}
          >
            <Checkbox
              color={"success"}
              checked={remember}
              onChange={() => setRemember(!remember)}
            >
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Link href="/register">
              <UILink color="success" css={{ fontSize: 14 }}>
                You do not have an account?
              </UILink>
            </Link>
          </Container>
          <Button
            disabled={isLoading}
            auto
            color="success"
            onPress={handleLogin}
          >
            {isLoading ? <Loading color="currentColor" size="sm" /> : "Sign in"}
          </Button>
        </Container>
      </Container>
    </>
  );
}
