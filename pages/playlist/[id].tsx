import { InferGetServerSidePropsType } from "next";
import GradientLayout from "../../components/gradientLayout";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import SongTable from "../../components/songsTable";

const getBGColor = () => {
  const colors = [
    "red",
    "green",
    "blue",
    "purple",
    "orange",
    "gray",
    "pink",
    "yellow",
    "teal",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({
      playlist,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <GradientLayout
      roundImage={false}
      color={getBGColor()}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  // runs when request, server side

  let user;

  try {
    user = validateToken(req.cookies.NOTIFY_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: JSON.parse(JSON.stringify({ playlist })),
  };
};

export default Playlist;
