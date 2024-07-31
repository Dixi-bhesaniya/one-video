import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Navbar from "../components/Navbar";
import { Box, Container, VStack, Image, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Aboutus = () => {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  return (
    <>
      {IsMobileView !== "true" && <Navbar />}
      <Container maxW={"container.xl"} alignContent={"flex-start"}>
        <BreadCrumbCom second={"About Us"} secondUrl={"/about-us"} />{" "}
      </Container>
      <Container maxW={"container.xl"} py={1} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/aboutUs.jpg" />

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
          About Us
        </Text>
      </Container>
      <Container maxW={"container.xl"} mb={4} px={0} centerContent>
        <VStack px={{ base: 10 }}>
          <Box
            fontWeight={"600"}
            color="#436131"
            fontSize={{ md: "30px", base: "24px" }}
            alignContent={"flex-start"}
          >
            SOSE - an attempt to revive our ancient Bharatiya roots
          </Box>
          <Box maxW={"6xl"}>
            {" "}
            <Image
              src={
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/aboutus/about1.jpg"
              }
              alt="SOSE - an attempt to revive our ancient Bharatiya roots"
            />
          </Box>

          <Box maxW={"6xl"} mt={3} textAlign={"justify"}>
            We are an Ethical & Natural food, natural home care and handmade
            personal care brand from the house of <b>Suryan Organic</b>. We were born
            out of the need to start at the beginning, to go to the roots of our
            problems. As an enterprise that is inspired by the mission of <b>Bansi
            Gir Gaushala</b>, our aim is to contribute to the revival of <b>“Gau
            Sanskriti”</b>, an ancient culture which placed the Gaumata (Cow as the
            Divine Mother) at the center of all economic, cultural and social
            activity. <b>Agriculture is the foundation of such a culture playing a
            significant role in cultivation and vegetation of ethical and
            natural products</b> and it is with this paradigm that we seek to find
            solutions to the problems Bharat and humanity faces in wide range.
            <br />
            <br />
            Our country and the world spend billions of dollars every year after
            synthetic fertilizer and pesticide subsidies. This introduces toxic
            chemicals in the food chain driving health imbalances and further
            impacting public health. We believe there is an urgent and also
            desperate need to develop natural methods to improve farm production
            and distribution.
            <br />
            <br />
            Our parent Suryan Organic has more than 10 years of ethical and
            natural food research and development experience. We are associated
            with over thousands of naturally growing trusted farmers, from all
            over BHARAT. We believe that if we have to make a difference in
            society, our influence and endeavour must extend from the farm all
            the way to the urban household.
          </Box>

          <br />
          <Box
            maxW={"6xl"}
            fontWeight={"600"}
            color="#436131"
            fontSize={{ base: "20px", lg: "30px" }}
          >
            For farmers, we are...
          </Box>
          <Box maxW={"6xl"}>
            <Image
              src={
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/aboutus/about2.jpg"
              }
              alt="For farmers, we are..."
            />
          </Box>
          <Box maxW={"6xl"} mt={3} textAlign={"justify"}>
            <b>Resourceful knowledge partners</b> helping them turn to natural farming
            or improve their farm productivity, we are inspired by the mission
            of and work closely with Bansi Gir Gaushala, which helps farmers
            with knowledge and materials required for Gopalan as well as natural
            farming using traditional Vedic methods. For smaller farmers, we
            guide and help them <b>acquire organic certifications</b> and <b>get their
            produce tested in a laboratory</b> if required. Our commitment to
            farmers springs from our vision of” samruddh <b>Kissan, samruddh
            Bharat”</b>. Our knowledge of natural farming coupled with sensible
            intelligence of the natural foods market is formidable assets that
            we put at the disposal of our farmer partners whenever required.{" "}
            <br />
            <br />
            For Reliable market makers and <b>buyers, we help them find the best
            prices for their natural produce. We have loyal and copious retail
            customers visiting our SOSE Organic boutiques and we would
            appreciate and could arrange our supply for bulk orders too can also
            arrange bulk buyers</b>. Our efforts are aimed in reducing market
            uncertainties for our farmers, so that they can do what they do best
            - cultivating the most nutritious natural produce. <b>We help farmers
            develop their business with new products and marketing approach for
            them to get benefit for their fruitful efforts</b>.
          </Box>
          <br />
          <Box
            fontWeight={"600"}
            color="#436131"
            fontSize={{ base: "20px", lg: "30px" }}
          >
            For consumers & re-sellers, we are...
          </Box>
          <Box maxW={"6xl"}>
            <Image
              src={
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/aboutus/about3.jpg"
              }
              alt="For consumers & re-sellers, we are..."
            />
          </Box>
          <Box maxW={"6xl"} mt={3} textAlign={"justify"}>
          <b>Extremely dependable suppliers</b> to help them lead a natural and
            malady free lifestyle. We care for our own health and similarly want
            our farmers and consumers to be happy and healthy. Our commitment to
            natural sourcing springs from our mission to revive Bharat’s ancient
            roots, our Vedic “Gau Sanskriti”, and our vision of “Swasth Nagarik,
            Swasth Parivar, Swasth Bharat”. <b>We often go out of our way, often at
            a significant cost to us and beyond regulatory or legal requirements
            to determine if the products we offer are truly natural</b>. We don’t
            just go by the letter of law and ask for organic certification from
            our suppliers. We insist on solid proof that what they are supplying
            is truly in nature. In case of any suspicion, we often get the
            products tested in an independent, certified, laboratory from our
            end. So, when consumers purchase from us, they are assured of the
            purity and authenticity of what they buy. When our resellers sell
            our products, they can be similarly confident, trusted that they are
            partnering with the best in the products segment.
            <br />
            <br />
            Creative knowledge partners are <b>to help consumers enhance their
            well-being in line with Bharat’s ancient Vedic traditions. We are
            inspired by Bansi Gir Gaushala, and taking full knowledge of The
            Gaushala’s rich knowledge base and experience of Vedic nutritional &
            medical practices to help consumers</b>. We design new products which
            are in line with ancient Ayurvedic philosophy, while still being
            appealing to modern youth. <b>We also distribute the Gaushala’s full
            range products, including “Gau Veda” herbal medicines and
            supplements that exploit synergies between Gopalan and Ayurveda. We
            also wish to influence a change in society, to rouse in people a
            curiosity for what they have inherited from their ancient
            forefathers, but have so far failed to appreciate. We work to make a
            positive difference to the way people think about food.</b>
            <br />
            <br />
            Today we have a huge product variety of Natural, & Ayurvedic Product
            over 550+ natural products available at the stores and by online.
            Our customer base, stores and farmers network continue to grow as we
            seek solutions to modern day problems by looking back to our ancient
            Bharatiya "Gau Sanskriti".
          </Box>
          <Text
            fontWeight={600}
            color={"text.300"}
            fontSize={{ md: 20 }}
            as={"i"}
          >
            “Not too little. Not too much. Just right”.
          </Text>
        </VStack>
      </Container>
      <ScrollToTop />
      {IsMobileView !== "true" && <Footer />}
    </>
  );
};

export default Aboutus;
