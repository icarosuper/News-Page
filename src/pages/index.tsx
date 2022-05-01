import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components/Layout/Navbar";
import { NewsContainer } from "../components/news/NewsContainer";
import { Box } from "@mantine/core";

const Home: NextPage = () => {
  return (
    <Box sx={{ backgroundColor: "rgba(28,30,33,0.91)" }}>
      <Head>
        <title>News Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          "@media (min-width: 1200px)": { height: "100vh" },
          overflow: "hidden",
        }}
      >
        <Navbar />

        <Box style={{ height: "100%" }}>
          <NewsContainer />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
