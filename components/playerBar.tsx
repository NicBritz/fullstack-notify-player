import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import Player from "./player";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        {activeSong ? (
          <Box padding="20px" color="white" width="30%">
            <Flex>
              <Box>
                <Image
                  boxSize="50px"
                  boxShadow="2xl"
                  src={`https://picsum.photos/400?random=${activeSong.name}`}
                  borderRadius="3px"
                  marginX="20px"
                />
              </Box>
              <Box>
                <Text fontSize="large">{activeSong.name}</Text>
                <Text fontSize="sm">{activeSong.artist.name}</Text>
              </Box>
            </Flex>
          </Box>
        ) : null}
        <Box width="40%">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
