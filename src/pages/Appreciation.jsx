import {
  Flex,
  Image,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";

const Appreciation = () => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second={"Appreciation"} secondUrl={"/appreciation"} />
      </Container>

      <Container maxW={"container.xl"} py={8} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/appreciation.jpg" />

        <Text
          pb={2}
          color={"brand.100"}
          textAlign={"center"}
          fontSize={{ lg: "7xl", md: "5xl", base: "xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          // Optional: Add background to improve text readability
        >
          Appreciation
        </Text>
      </Container>
      <Container maxW="6xl" my={"40px"} centerContent>
        <Flex
          gap={"10"}
          direction={{ base: "column", lg: "row" }}
          // justify={{ base: "center", lg: "flex-start" }}
          // align="center"
        >
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/appreciation/appreciation.jpeg"
            }
            alt="Appreciation"
            width={{ base: "100%", lg: "350px" }}
            maxW={"800px"}
            height={"auto"}
            border={"1px"}
            borderColor={"gray.400"}
          />
          <div>
            <Heading
              fontWeight={"600"}
              color="#436131"
              size={"lg"}
              textAlign={{ base: "center", md: "start" }}
            >
              Letter Of Appreciation (Airport Authority Of India)
            </Heading>
            <Text
              fontSize={"20px"}
              mt={4}
              maxW={{ base: "95%", lg: "800px" }}
              textAlign={"justify"}
            >
              Bansi Gir Gauveda organized Nadi Parikshan - Ayurvedic Health Camp
              at Bhavnagar Airport on 10th and 11th February 2021 via trained
              Ayurvedic professionals who also provided Ayurvedic Gauveda
              Natural Medicinal products. This camp enabled the participants to
              recognize the root cause of their current ailments, for which,
              Ayurvedic cures/ Yoga exercises were prescribed. The camp
              benefitted up to 80 personnel from the Airports Authority of
              India, CISF, Air India, and other stakeholders at the airport.
            </Text>
          </div>
        </Flex>
        <SimpleGrid columns={[1, 2, null, 3]} spacing={8} mt={100}>
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/appreciation/ap1.jpeg"
            }
            alt="Appreciation"
          />
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/appreciation/ap2.jpeg"
            }
            alt="Appreciation"
          />
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/appreciation/ap3.jpeg"
            }
            alt="Appreciation"
          />
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/appreciation/ap4.jpeg"
            }
            alt="Appreciation"
          />
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/appreciation/ap5.jpeg"
            }
            alt="Appreciation"
          />
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/appreciation/ap6.jpeg"
            }
            alt="Appreciation"
          />
        </SimpleGrid>
      </Container>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Appreciation;
