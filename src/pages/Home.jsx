import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ScrollToTop from "../components/ScrollToTop";
import ProductListSection from "../components/ProductListSection";
import {
  Container,
  Flex,
  Image,
  Heading,
  Stat,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Link,
  Center,
  useMediaQuery,
  Text,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
  Card,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";

const productItems = [
  {
    id: 8663,
    imageSrc:
      "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/imgpsh_fullsize_anim_sose_website.jpg",
  },
  {
    id: 8859,
    imageSrc:
      "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/imgpsh_fullsize_anim_sose_image.jpg",
  },

  // {
  //   id: 8661,
  //   imageSrc:
  //     "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/new_arri/Almond+Oats.jpg",
  // },
  
  
];
const GirProducts = [
  {
    src: require("../assets/GIR Gau Products Images/ahinsak gau ghee.jpg"),
    name: "Ahinsak Gau Ghee",
    alt: "ahinsak gau ghee",
    href: "/shop?page=1&category=445&category_name=Ahinsak%20Gau%20Ghee",
  },
  {
    src: require("../assets/GIR Gau Products Images/medicated gheee.jpg"),
    name: "Medicated Ghee",
    alt: "medicated ghee",
    href: "/shop?page=1&category=962&category_name=Medicated%20Ghee",
  },
  {
    src: require("../assets/GIR Gau Products Images/ayurvedic food.jpg"),
    name: "Ayurvedic Food",
    alt: "ayurvedic food",
    href: "/shop?page=1&category=839&category_name=Ayurvedic%20Food",
  },
  {
    src: require("../assets/GIR Gau Products Images/ark.jpg"),
    name: "Ark",
    alt: "ark",
    href: "/shop?page=1&category=796&category_name=Ark",
  },
  {
    src: require("../assets/GIR Gau Products Images/ayurvedic suppliment.jpg"),
    name: "Ayurvedic Suppliment",
    alt: "ayurvedic suppliment",
    href: "/shop?page=1&category=446&category_name=Ayurvedic%20Suppliment",
  },
  {
    src: require("../assets/GIR Gau Products Images/beauty c.jpg"),
    name: "Beauty Care",
    alt: "beauty care",
    href: "/shop?page=1&category=452&category_name=Beauty%20Care",
  },
  {
    src: require("../assets/GIR Gau Products Images/churn.jpg"),
    name: "Churna",
    alt: "churna",
    href: "/shop?page=1&category=798&category_name=Churna",
  },

  {
    src: require("../assets/GIR Gau Products Images/home care.jpg"),
    name: "Home Care",
    alt: "home care",
    href: "/shop?page=1&category=347&category_name=Home%20Care",
  },
];
const NewDiseases = [
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/Women's+.jpg",
    name: "Women's Health",
    alt: "women's health",
    href: "/shop?page=1&category=534&category_name=Women%27s%20Health",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/Fever+%26+Immunity.jpg",
    name: "Fever & Immunity",
    alt: "Fever & Immunity",
    href: "/shop?page=1&category=518&category_name=Fever%20&%20Immunity",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/Respiratory+care.jpg",
    name: "Respiretory Health",
    alt: "respiretory Health",
    href: "/shop?page=1&category=529&category_name=Respiratory%20Health",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/pitta+relief.jpg",
    name: "Pitta Relif",
    alt: "Pitta Relif",
    href: "/shop?page=1&category=527&category_name=Pitta%20Relief",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/Heart+care.jpg",
    name: "Heart Care",
    alt: "Heart Care",
    href: "/shop?page=1&category=521&category_name=Heart,%20BP%20&%20Cholesterol",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/joint+care.jpg",
    name: "Join Care",
    alt: "Join Care",
    href: "/shop?page=1&category=523&category_name=Joint,%20Muscle%20&%20Bone%20Care",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/Weight+loss.jpg",
    name: "Weight Loss",
    alt: "Weight Loss",
    href: "/shop?page=1&category=533&category_name=Weight%20Loss",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/digestive+health.jpg",
    name: "Digestive Health",
    alt: "Digestive Health",
    href: "/shop?page=1&category=515&category_name=Digestive%20Health",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/diabetis.jpg",
    name: "Diabetes",
    alt: "Diabetes",
    href: "/shop?page=1&category=514&category_name=Diabetes",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/child+care.jpg",
    name: "Child Care",
    alt: "Child Care",
    href: "/shop?page=1&category=513&category_name=Child%20Care",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/eye+care.jpg",
    name: "Eye Care",
    alt: "Eye Care",
    href: "/shop?page=1&category=516&category_name=Eye%20care",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/HealthDiseases/Kidney+%26+Liver+Care.jpg",
    name: "Kidney & Liver Care",
    alt: "Kidney & liver Care",
    href: "/shop?page=1&category=525&category_name=Kidney%20&%20Liver%20care",
  },
];
const Grocery = [
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G01.png",
    alt: "Grains & daliya",
    href: "/shop?page=1&category=585&category_name=Grains%20&%20Daliya",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G02.png",
    alt: "Flours",
    href: "/shop?page=1&category=587&category_name=Flours%20-%20Atta",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G03.png",
    alt: "Pulses & Dals",
    href: "/shop?page=1&category=589&category_name=Pulses%20&%20Dals",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G04.png",
    alt: "Oils & Ghee ",
    href: "/shop?page=1&category=591&category_name=Oils%20&%20Ghee",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G05 (1).png",
    alt: "Spices Whole",
    href: "/shop?page=1&category=767&category_name=Spices%20Whole%20&%20Powders",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G06.png",
    alt: "Handmade Masala",
    href: "/shop?page=1&category=595&category_name=Handmade%20&%20Blended%20Spices",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/Jaggery.png",
    alt: "Jaggery",
    href: "/shop?page=1&category=757&category_name=Jaggery",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G08 (1).png",
    alt: "Salt & Sugar",
    href: "/shop?page=1&category=754&category_name=Salt,%20Sugar%20&%20Jaggery",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G09.png",
    alt: "Super Foods",
    href: "/shop?page=1&category=601&category_name=Super+Foods",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/Honey.png",
    alt: "Honey,Jam & Gulkand",
    href: "/shop?page=1&category=322&category_name=Honey,%20Jam%20&%20Gulkand",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G11 (1).png",
    alt: "Dry Fruits",
    href: "/shop?page=1&category=759&category_name=Dryfruit,%20Saffron%20&%20Seeds",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/Natural Grocery/G12.png",
    alt: "International Cuisine",
    href: "/shop?page=1&category=599&category_name=Healthy%20International%20Cuisine",
  },
];
const brands = [
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/01.png",
    alt: "Gir Gauveda",
    href: "/shop?page=1&category=278",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/02.png",
    alt: "So Good",
    href: "/shop?page=1&category=317",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/03.png",
    alt: "Spices Board",
    href: "/shop?page=1&category=716",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/04.png",
    alt: "Himalayan Mountain",
    href: "/shop?page=1&category=330",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/05.png",
    alt: "CoffeeCo",
    href: "/shop?page=1&search=cof",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/06.png",
    alt: "Shishu veda",
    href: "/shop?page=1&search=yashoda",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/07.png",
    alt: "Vama Herbal",
    href: "/shop?page=1&search=VAMA",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/08.png",
    alt: "Kapita",
    href: "/shop?page=1&search=Kapita",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/09.png",
    alt: "Pureco",
    href: "/shop?page=1&search=pureco",
  },
  // {
  //   src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/10.png",
  //   alt: "Cocoa",
  //   href: "/shop?page=1&search=cocoa",
  // },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/11.png",
    alt: "Choci Logo",
    href: "/shop?page=1&search=choci",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/12.png",
    alt: "D'SOSE Logo",
    href: "/shop?page=1&search=d%27sose",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/18.webp",
    alt: "So Millet",
    href: "/shop?page=1&category=585&category_name=SO+Millet",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/14.png",
    alt: "OGS Logo",
    href: "/shop?page=1&category=288&category_name=Gifting",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/15.png",
    alt: "Sidha Kisan Se",
    href: "/shop?page=1&search=Sidha%20kisan%20se",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/16.png",
    alt: "Sose Pure Nature",
    href: "/shop?page=1&category=492&category_name=SOSE Pure Nature",
  },
  {
    src: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/brands/17.png",
    alt: "Sweekies Logo",
    href: "/shop?page=1&search=sweekies",
  },
];

export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [homeData, setHome] = useState({});
  // let [isFull] = useMediaQuery("(max-width:1920px)");
  const [blogs, setBlogs] = useState([]);
  const isMobiles = width <= 768;
  const navigate = useNavigate();
  useEffect(() => {
    CheckOrSetUDID();
    getHomePageData();
    getBlogs();
  }, []);

  async function getHomePageData() {
    const response = await client.get("/home");
    if (response.data.status === true) {
      setBanners(response.data.banners);
      setHome(response.data);
    }
    setLoading(false);
  }
  async function getBlogs() {
    const params = {};
    const response = await client.get("/home/blogs/", {
      params: params,
    });
    if (response.data.status === true) {
      setBlogs(response.data.blogs);
    }
  }

  return (
    <>
      {/* {loading === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      <Container maxW={"container.xl"} px={0}>
        {loading === true ? (
          <Skeleton h={{md:489,base:170}}></Skeleton>
        ) : (
          <Carousel banners={banners} />
        )}
      </Container>

      <Container maxW={"container.xl"} mb={8} mt={2} px={0}>
        <Text
          fontSize={{ base: "xl", sm: "2xl", xl: "2xl" }}
          fontWeight={500}
          bgColor={"bg.500"}
          textAlign={{ base: "center", md: "start" }}
          px={{ base: 2, md: 8 }}
          py={4}
          my={7}
        >
          About SOSE
        </Text>
        <Text
          color={"text.300"}
          align={{ base: "justify" }}
          px={{ base: 15, lg: 20 }}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          We are an Ethical & Natural food, natural home care and handmade
          personal care brand from the house of <b> Suryan Organic</b>. We were
          born out of the need to start at the beginning, to go to the roots of
          our problems. As an enterprise that is inspired by the mission of{" "}
          <b>Bansi Gir Gaushala</b> , our aim is to contribute to the revival of{" "}
          <b> “ Gau Sanskriti ”</b>, an ancient culture which placed the Gaumata
          (Cow as the Divine Mother) at the center of all economic, cultural and
          social activity.
          <b> Agriculture is the foundation of such a culture</b> , and it is
          with this paradigm that we seek to find solutions to the problems
          facing Bharat and humanity at large. <br />
          <br />
          Our country and the world spend billions of dollars each year after
          synthetic fertilizer and pesticide subsidies. This introduces toxic
          chemicals in the food chain driving health imbalances and further
          spending on public health. We believe there is an urgent need to
          develop natural methods to improve farm production and distribution.
          <br />
          <br />
          Our parent Suryan Organic has more than 10 years of ethical and
          natural food research and development experience. We are associated
          with over thousand of naturally growing trusted farmers, from all over
          BHARAT. We believe that if we have to make a difference in society,
          our influence must extend from the farm all the way to the urban
          household.{" "}
          <Link
            fontWeight={700}
            color={"brand.500"}
            as={RouterLink}
            to={"/about-us"}
          >
            Read more
          </Link>
        </Text>
      </Container>
      {/* <Container maxW={"container.xl"} mb={5} centerContent>
        <Image src={upcoming} alt="" />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
          }}
          gap={6}
          my={6}
          px={{ xl: 30 }}
        >
          <GridItem>
            <Image src={upcomingimage2} />
          </GridItem>
        </Grid>
      </Container> */}

      <Container maxW={"container.xl"} mb={5} centerContent>
        <LazyLoadImage
          src={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/image/sose_newarrival.jpg"
          }
          alt=""
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={6}
          my={6}
          px={15}
        >
          {productItems?.map((product) => (
            <GridItem
              key={product.id}
              onClick={() => {
                if (product.id) {
                  navigate(`/products/${product.id}`);
                }
              }}
              cursor={product.id ? "pointer" : "default"}
            >
              <LazyLoadImage
                src={product.imageSrc}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s",
                }}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>

      <Container mb={5} px={0} maxW={"container.xl"} centerContent>
        <LazyLoadImage
          src={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/03.jpg"
          }
          alt=""
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />
      </Container>

      {/* <Container
        bgColor={"bg.500"}
        maxW={"container.xl"}
        my={2}
        centerContent
        px={0}
        onClick={() => navigate("/shop?page=1&category=278")}
        cursor={"pointer"}
      >
        <Flex
          justifyContent={"flex-start"}
          direction={{ base: "column", xl: "row" }}
          gap={{ base: 8, md: 3, lg: 5 }}
          py={6}
          px={{ base: 4, md: 0 }}
          mx={5}
        >
          {
            <Image
              src={
                isMobile
                  ? "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/gir_gau_products_1_mobile.png"
                  : "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/gir gau products 1.png"
              }
              alt="Gir Gau mata"
              maxH={{ base: "100%", md: "380px", lg: "400px" }}
              maxW={{ base: "70vw", lg: "100vw" }}
              mx={{ base: "auto", md: "none" }}
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
              }}
            />
          }
          {
            <Image
              //onClick={() => navigate("/shop?page=1&category=272")}
              src={
                isMobile
                  ? "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/gir_gau_products_2_mobile.png"
                  : "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/gir gau products 2.png"
              }
              alt="Gir Gau Products"
              maxH={{ base: "100%", md: "380px", lg: "400px" }}
              maxW={{ base: "70vw", md: "100vw" }}
              mx={{ base: "auto", md: "none" }}
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
              }}
            />
          }
          <Image
            src={
              isMobile
                ? "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/gir_gau_products_3_mobile.png"
                : "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/gir gau products 3.png"
            }
            alt="Gir Gau Products"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
            maxH={{ base: "100%", md: "380px", lg: "400px" }}
            maxW={{ base: "70vw", md: "100vw" }}
            mx={{ base: "auto", md: "none" }}
          />
        </Flex>
      </Container> */}
      <Container maxW={"container.xl"} mb={5} px={0}>
        <Box
          bgColor={"bg.500"}
          px={{ base: 2, md: 8 }}
          py={4}
          my={7}
          textAlign={{ base: "center", md: "start" }}
        >
          <Text
            fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
            fontWeight={500}
          >
            GIR Gau Products
          </Text>
        </Box>

        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={7}
          my={6}
          px={{ md: "10%", base: 10 }}
          alignItems={"cenetr"}
        >
          {GirProducts.map((data) => (
            <GridItem
              cursor={"pointer"}
              py={5}
              as={Flex}
              gap={3}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Image
                cursor={"pointer"}
                border={"1px"}
                borderRadius={"4px"}
                borderColor={"text.500"}
                src={data.src}
                alt={data.alt}
                onClick={() => navigate(data?.href)}
                // link={data.link}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s",
                }}
              />
              <Text fontSize={{ md: 18 }} fontWeight={500} color={"text.300"}>
                {data.name}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Container maxW={"container.xl"} px={0}>
        <CarouselWithLinks
          bannersWithLinks={[
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/drakshavaleh.webp",
              alt_text: "Vasavaleha",
              href: "/products/1467",
            },
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/03+(2).jpg",
              alt_text: "Purana Ghrit Chyawanprash",
              href: "/shop?page=1&category=714",
            },
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/02+(1).jpg",
              alt_text: "Drakshavaleh",
              href: "/products/1998",
            },
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/01.jpg",
              alt_text: "Jaggery Chyawanprash",
              href: "/products/1996",
            },
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/04.jpg",
              alt_text: "Chyawanprash",
              href: "/products/1798",
            },
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/05.jpg",
              alt_text: "Chyawanprash",
              href: "/products/1437",
            },
          ]}
        />
      </Container>

      <ProductListSection
        title="New Arrival : VAMA - Herbal & Natural Beauty Care"
        loading={loading}
        products={homeData?.new_arrival_gir_gauveda}
      />

      <Container maxW={"container.xl"} mb={5} px={0}>
        <Box
          bgColor={"bg.500"}
          px={{ base: 2, md: 8 }}
          py={4}
          my={7}
          textAlign={{ base: "center", md: "start" }}
        >
          <Text
            fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
            fontWeight={500}
          >
            Shop For Products According To Your Health Needs
          </Text>
        </Box>

        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          gap={7}
          my={6}
          px={{ md: "8%", base: 10 }}
          alignItems={"cenetr"}
        >
          {NewDiseases.map((data) => (
            <GridItem
              cursor={"pointer"}
              py={5}
              as={Flex}
              gap={3}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Image
                cursor={"pointer"}
                transition="all 1s ease"
                _hover={{
                  transform: "scale(1.10)",
                }}
                src={data.src}
                alt={data.alt}
                border={"1px"}
                borderColor={"text.500"}
                borderRadius={"6px"}
                onClick={() => navigate(data?.href)}
                // link={data.link}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s",
                }}
              />
              <Text fontSize={{ md: 17 }} fontWeight={500} color={"text.300"}>
                {data.name}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Container maxW={"container.xl"} mb={5} px={0}>
        <Box
          bgColor={"bg.500"}
          px={{ base: 2, md: 8 }}
          py={4}
          my={7}
          textAlign={{ base: "center", md: "start" }}
        >
          <Text
            fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
            fontWeight={500}
          >
            Natural Groceries
          </Text>
          <Text
            mt={2}
            color={"text.300"}
            fontSize={{ base: "md", sm: "md", xl: "lg" }}
          >
            Choose from a wide range of ethically made natural products
          </Text>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          gap={4}
          my={6}
          px={{ base: 7, md: 15, xl: 20 }}
        >
          {Grocery?.map((data) => (
            <GridItem cursor={"pointer"}>
              <LazyLoadImage
                cursor={"pointer"}
                transition="all 1s ease"
                _hover={{
                  transform: "scale(1.25)",
                }}
                src={data.src}
                alt={data.alt}
                onClick={() => navigate(data?.href)}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s",
                }}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>

      <ProductListSection
        title="Try Our New Products"
        loading={loading}
        products={homeData?.new_arrival}
      />

      <ProductListSection
        title="Instant Mixes"
        loading={loading}
        products={homeData?.instant_mix}
      />

      <Container maxW={"container.xl"} px={0}>
        <Carousel
          banners={[
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/sweet/01.jpg",
              alt_text: "sweet1",
              image_url: "/shop?page=1&category=492",
            },
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/sweet/02.webp",
              alt_text: "sweet2",
              image_url: "/shop?page=1&category=492",
            },
            // {
            //   image: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/sweet/4.jpg",
            //   alt_text: "sweet3",
            //   image_url: "/shop?page=1&category=492",
            // },
            {
              image:
                "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/sweet/13.jpg",
              alt_text: "sweet4",
              image_url: "/shop?page=1&category=492",
            },
          ]}
        />
      </Container>

      <ProductListSection
        title="Must Try: Gir Gau Ayurvedic Products"
        loading={loading}
        products={homeData?.must_try_gir_gau_ayurvedic_products}
      />

      <ProductListSection
        title="Must Try: Natural Products"
        loading={loading}
        products={homeData?.must_try_natural_products}
      />

      {/* <ProductListSection
        title="Best Of The Year"
        loading={loading}
        products={homeData?.best_of_the_year}
      /> */}

      <ProductListSection
        title="Best of the Month"
        loading={loading}
        products={homeData?.best_of_the_month}
      />

      <ProductListSection
        title="All Time Best Sellers"
        loading={loading}
        products={homeData?.best_seller_of_all_time}
      />

      <Container className="container" maxW="container.xl" centerContent>
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
        {/* <Button
          as={Link}
          mb={8}
          mt={3}
          size={"lg"}
          border={"1px"}
          borderRadius={"8px"}
          variant={"outline"}
          color={"brand.500"}
          _hover={{ bgColor: "brand.500", color: "#fff",textDecoration:"none" }}
          href={"/our-videos"}
        >
          Our Videos
        </Button> */}
      </Container>
      <Container maxW={"container.xl"}>
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
            BLOGS
          </Heading>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          px={2}
          py={3}
          my={6}
          spacing="40px"
        >
          {blogs?.slice(0, 8).map((blog) => (
            <GridItem key={blog.id} m={4}>
              <Card>
                <LinkBox h={400}>
                  <Image
                    src={blog.banner}
                    w="100%"
                    h="300px"
                    loading="lazy"
                    objectFit={"cover"}
                    borderRadius={5}
                    style={{
                      opacity: 1,
                      transition: "opacity 0.7s", // Note the corrected syntax here
                    }}
                  />
                  <LinkOverlay
                    _hover={{ color: "text.500" }}
                    href={`/blogs/${blog.id}/`}
                  >
                    <Heading size="sm" fontWeight={500} m={2}>
                      {blog.title}
                    </Heading>
                  </LinkOverlay>
                </LinkBox>
                <Flex m={2} justifyContent={"space-between"}>
                  <Text fontSize={"sm"} color="gray.500">
                    {new Intl.DateTimeFormat("en-CA", {
                      dateStyle: "long",
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(blog.published_at))}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"brand.500"}
                    onClick={() => navigate(`/blogs/${blog.id}/`)}
                    cursor={"pointer"}
                  >
                    Read more
                    <ChevronRightIcon />
                  </Text>
                </Flex>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Testimonials />
      <Container backgroundColor={"bg.500"} maxW={"container.xl"} py={2}>
        <SimpleGrid
          columns={[2, 3, null, 6]}
          px={6}
          maxW={"container.xl"}
          my={6}
          backgroundColor={"bg.500"}
          align="center"
          spacingX={{ base: "10vw", md: "30px" }}
          spacingY="40px"
        >
          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              600+
            </StatNumber>
            <StatHelpText color="gray.600">Natural Products</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              70000+
            </StatNumber>
            <StatHelpText color="gray.600">Satisfied Clients</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              1560+
            </StatNumber>
            <StatHelpText color="gray.600">Cities & Towns</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              7+
            </StatNumber>
            <StatHelpText color="gray.600">Countries</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              14+
            </StatNumber>
            <StatHelpText color="gray.600">Stores</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              11<sup>th</sup>
            </StatNumber>
            <StatHelpText color="gray.600">Generation of Farmers</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
      <Container maxW={{ base: "100vw", md: "container.xl" }}>
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
            fontSize={{ md: 33, base: 22 }}
            mx="auto"
            align={"center"}
            mb={"5"}
            mt={3}
            pb={"10px"}
          >
            BRAND PARTNERS
          </Heading>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            xl: "repeat(6,1fr)",
          }}
          spacing={{ base: 10, md: 14 }}
          py={3}
          px={{ base: 15, md: 20, lg: 24 }}
        >
          {brands?.map((brand, index) => (
            <GridItem as={RouterLink} to={brand?.href ?? "#"}>
              <Image
                as={LazyLoadImage}
                key={index}
                src={brand.src}
                boxSize={{
                  base: "150px",
                  md: "150px",
                  lg: "180px",
                }}
                alt={brand.alt}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </GridItem>
          ))}
        </Grid>
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
            fontSize={{ md: 33, base: 20 }}
            mx="auto"
            align={"center"}
            mt={3}
            pb={"10px"}
          >
            OUR CERTIFICATIONS & AWARDS
          </Heading>
        </Box>
        <Text my={5} textAlign={"center"} color="text.300">
          We are committed to quality and each of our facilities is
          independently certified by an industry-accredited agency.
        </Text>
        <Flex
          justifyContent="space-evenly"
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={12}
          pt={1}
          pb={6}
        >
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/global-certificate.jpg"
            }
            alt="global-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/ciolook-certificate.jpg"
            }
            alt="ciolook-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Flex>
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
            fontSize={{ md: 33, base: 22 }}
            mx="auto"
            align={"center"}
            mb={"5"}
            pb={"10px"}
          >
            LICENSES & AFFILIATIONS
          </Heading>
        </Box>
        <Flex justify="center" align="center" gap={10} pt={1} pb={10}>
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/license.jpg"
            }
            alt="Coffee Board"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Flex>
        <LazyLoadImage
          w="100%"
          src={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/line.png"
          }
          mx="auto"
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />
        {/* <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6,1fr)",
          }}
          gap={2}
          my={6}
          mx={{ md: "15%", base: 3 }}
        >
          {imageInfo?.map((data) => (
            <GridItem>
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <LazyLoadImage
                  cursor={"pointer"}
                  transition="all 1s ease"
                  _hover={{
                    transform: "scale(1.25)",
                  }}
                  src={data.src}
                  alt={data.name}
                  style={{
                    opacity: 1,
                    transition: "opacity 0.7s",
                    width: "100px",
                    // Note the corrected syntax here
                  }}
                />
                <Text textAlign={"center"} fontSize={"14px"} mt={2}>
                  {data.name}
                </Text>
              </Flex>
            </GridItem>
          ))}
        </Grid> */}
        <Container maxW={"container.xl"} centerContent pt={10} pb={8}>
          <Image
            w={{ md: "70%" }}
            src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/imgpsh_fullsize_anim+(1).jpg"
          />
        </Container>
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
            fontSize={{ md: 33, base: 20 }}
            mx="auto"
            align={"center"}
            my={"5"}
            pb={"10px"}
          >
            OUR SERVICES ARE AVAILABLE IN
          </Heading>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/Map.webp"
            }
            w={{ base: "100%", md: "100%" }}
            alt=""
            py={4}
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Box>
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
            fontSize={{ md: 33, base: 22 }}
            mx="auto"
            align={"center"}
            my={"5"}
            pb={"10px"}
          >
            AVAILABLE AT
          </Heading>
        </Box>
        <Container maxW={"container.xl"} mb={5} px={0} centerContent>
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/01.jpg"
            }
            w={"container.xl"}
            alt=""
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Container>
      </Container>

      <ScrollToTop/>
      <Footer />
      {/* </>
      )} */}
    </>
  );
}
