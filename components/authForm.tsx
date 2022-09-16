import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import NextImage from "next/image";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password, firstname, lastname });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/Logo.png" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <Text fontSize="2xl">Sign Up</Text>
            ) : (
              <Text fontSize="2xl">Sign In</Text>
            )}

            {mode === "signup" && (
              <>
                <Input
                  placeholder="firstname"
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                  marginY="10px"
                />
                <Input
                  placeholder="lastname"
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  marginY="10px"
                />
              </>
            )}

            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              marginY="10px"
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              marginY="10px"
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              marginY="10px"
              sx={{ "&:hover": { bg: "green.300" } }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
