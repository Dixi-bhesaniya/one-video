import React from "react";
import {
  Container,
  Heading,
  Box,
  Link,
  Text,
  Grid,
  GridItem,
  useBreakpointValue,
  useMediaQuery
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OurVideos = () => {
    const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  return (
    <>
      <Navbar />
      <Container className="container" maxW="8xl" centerContent>
        <Box
          w="100%"
          backgroundImage={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/line.png"
          }
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            size="lg"
            mx="auto"
            align={"center"}
            mt={3}
            pb={"10px"}
          >
            OUR VIDEOS
          </Heading>
        </Box>
        <Grid
          templateColumns={{
            md: "repeat(2, 1fr)",
            base: "repeat(1, 1fr)",
          }}
          gap={4}
          my={6}
          px={15}
        >
          <GridItem>
            <iframe
              width={width}
              height={height}
              src="https://www.youtube.com/embed/031OJGP9ePI"
              title="Behind the scenes of the natural and ethical manufacturing at our factory"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </GridItem>
          <GridItem>
            <Text fontWeight={700} fontSize={26}>
              Behind the scenes of the natural and ethical manufacturing at our
              factory
            </Text>
            <Text color={"text.300"} fontSize={18} align={{ base: "justify" }}>
              What the eyes don’t see, the mind doesn’t believe. And that’s why
              we are taking you on a tour of our factory where you can see for
              yourself how every product of ours is made without any
              preservatives, using only the best of products, hand-packaged and
              ultimately delivered to you and for you, with love.
            </Text>
          </GridItem>
          {!isMobile ? (
            <>
              <GridItem>
                <Text fontWeight={700} fontSize={26}>
                  We welcome you to visit our stores or website for products
                  that support 'Go Adharit Jeevan Shailee'
                </Text>
                <Text
                  color={"text.300"}
                  fontSize={18}
                  align={{ base: "justify" }}
                >
                  SOSE is inspired by the mission of @bansigir which is working
                  to revive Bharat's ancient 'Go Sanskriti', and regain its past
                  glory.
                  <br /> A Go Adharit Jeevan Shailee can bring changes in the
                  fields of nutrition, health, agriculture and education.
                  <br /> At our gaushala, we aim to make sure that our Mother
                  and her calf are given enough respect and care so that they
                  are able to live in utmost bliss.
                  <br /> They are provided the best and nutritious food and that
                  too with free feeding which in turn ensures that the milk we
                  are consuming via them is also full of nutrients and doesn’t
                  have any preservatives.
                  <br /> The milking process is also done in such a Vedic,
                  non-exploitative manner there is enough for her child too.
                  <br /> The Jeevans Shailee is centred around promoting and
                  placing emphasis on Go Adharit Ahar (Food & Nutrition), Go
                  Adharit Krishi (Agriculture & Environment) Go Adharit Chikitsa
                  (Health & Medicine), Go Adharit Shikshan (Education &
                  Culture), Go Adharit Arthavyavastha (Economics & Abundance).
                </Text>
              </GridItem>
              <GridItem>
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/KWTWI8hhMIQ"
                  width={width}
                  height={height}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </GridItem>
            </>
          ) : (
            <>
              <GridItem>
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/KWTWI8hhMIQ"
                  width={width}
                  height={height}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </GridItem>
              <GridItem>
                <Text fontWeight={700} fontSize={26}>
                  We welcome you to visit our stores or website for products
                  that support 'Go Adharit Jeevan Shailee'
                </Text>
                <Text
                  color={"text.300"}
                  fontSize={18}
                  align={{ base: "justify" }}
                >
                  SOSE is inspired by the mission of @bansigir which is working
                  to revive Bharat's ancient 'Go Sanskriti', and regain its past
                  glory.
                  <br /> A Go Adharit Jeevan Shailee can bring changes in the
                  fields of nutrition, health, agriculture and education.
                  <br /> At our gaushala, we aim to make sure that our Mother
                  and her calf are given enough respect and care so that they
                  are able to live in utmost bliss.
                  <br /> They are provided the best and nutritious food and that
                  too with free feeding which in turn ensures that the milk we
                  are consuming via them is also full of nutrients and doesn’t
                  have any preservatives.
                  <br /> The milking process is also done in such a Vedic,
                  non-exploitative manner there is enough for her child too.
                  <br /> The Jeevans Shailee is centred around promoting and
                  placing emphasis on Go Adharit Ahar (Food & Nutrition), Go
                  Adharit Krishi (Agriculture & Environment) Go Adharit Chikitsa
                  (Health & Medicine), Go Adharit Shikshan (Education &
                  Culture), Go Adharit Arthavyavastha (Economics & Abundance).
                </Text>
              </GridItem>
            </>
          )}
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};

export default OurVideos;
