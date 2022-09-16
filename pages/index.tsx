import { InferGetServerSidePropsType } from "next";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Home = ({
      artists,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useMe();
  const fullName =
    user &&
    `${user.firstName[0].toUpperCase()}${user.firstName
      .slice(1)
      .toLowerCase()}  
    ${user.lastName[0].toUpperCase()}${user.lastName.slice(1).toLowerCase()}`;
  return (
    <GradientLayout
      color="cyan"
      image={user && `https://robohash.org/${fullName}`}
      subtitle="profile"
      title={fullName}
      description={`${user?.playlistsCount} public playlists`}
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="xs">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => {
            return (
              <Box paddingX="10px" width="20%" shadow="2x" key={artist.id}>
                <Box
                  bg="gray.900"
                  borderRadius="4px"
                  padding="15px"
                  width="100%"
                >
                  <Image
                    src={`https://robohash.org/${artist.name}?size=300x300`}
                    borderRadius="100%"
                    shadow="xl"
                  />
                  <Box marginTop="20px">
                    <Text fontSize="lg">{artist.name}</Text>
                    <Text fontSize="xs">Artist</Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  // runs when request, server side
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};
export default Home;
