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
import { useRouter } from "next/router";
import { IoPerson, IoMail, IoLockClosed } from "react-icons/io5";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameAlredyExists, setUsernameAlredyExists] = useState(false);
  const [email, setEmail] = useState("");
  const [emailAlredyExists, setEmailAlredyExists] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [notEqualPasswords, setNotEqualPasswords] = useState(false);
  const handleRegister = () => {
    if (password === repeatPassword) {
      setIsLoading(true);
      fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            router.push("/login");
          } else {
            setIsLoading(false);
            if (result.message === "The email already exists") {
              setEmail("");
              setEmailAlredyExists(true);
            }
            if (result.message === "The username already exists") {
              setUsername("");
              setUsernameAlredyExists(true);
            }
          }
        });
    } else {
      setPassword("");
      setRepeatPassword("");
      setNotEqualPasswords(true);
    }
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
            height: 420,
            flexDirection: "column",
            backgroundColor: "#1a1a1a",
            borderRadius: 20,
          }}
        >
          <Text id="modal-title" size={18}>
            Register in
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
            placeholder={
              !usernameAlredyExists ? "Username" : "The username already exists"
            }
            contentLeft={<IoPerson />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            required
            color="success"
            size="lg"
            placeholder={
              !emailAlredyExists ? "Email" : "The email already exists"
            }
            contentLeft={<IoMail />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            required
            color={!notEqualPasswords ? "success" : "error"}
            size="lg"
            placeholder={
              !notEqualPasswords ? "Password" : "Passwords do not match"
            }
            contentLeft={<IoLockClosed />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input.Password
            clearable
            bordered
            fullWidth
            required
            color={!notEqualPasswords ? "success" : "error"}
            size="lg"
            placeholder={
              !notEqualPasswords ? "Repeat Password" : "Passwords do not match"
            }
            contentLeft={<IoLockClosed />}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Container
            fluid
            display="flex"
            alignItems="center"
            justify="flex-end"
            gap={0}
          >
            <Link href="/login">
              <UILink color="success" css={{ fontSize: 14 }}>
                Already have an account?
              </UILink>
            </Link>
          </Container>
          <Button
            disabled={isLoading}
            auto
            color="success"
            onPress={handleRegister}
          >
            {isLoading ? <Loading color="currentColor" size="sm" /> : "Sign up"}
          </Button>
        </Container>
      </Container>
    </>
  );
}
