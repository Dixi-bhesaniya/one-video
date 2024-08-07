import { useState, useEffect, useRef, Fragment } from "react";
import {
  useMediaQuery,
  Box,
  Flex,
  Image,
  Link,
  InputGroup,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useToast,
  Container,
  Text,
  LinkBox,
  LinkOverlay,
  Divider,
  Badge,
  Grid,
  GridItem,
  Button,
  MenuDivider,
  Avatar,
  DrawerFooter,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Drawer,
  HStack,
  InputRightElement,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Link as ReactRouterLink,
  useNavigate,
  useSearchParams,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import CartAndWishlistButtons from "./CartAndWishlistButtons";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { IoIosArrowDown } from "react-icons/io";
import checkLogin from "../utils/checkLogin";
import { TfiYoutube } from "react-icons/tfi";
import { FaApple, FaFacebookF, FaGooglePlay, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { debounce } from "lodash";
import CartEmitter from "./EventEmitter";

const Links = [
  {
    name: "Consult Our Vaidya",
    location: "/consult-our-vaidya",
  },
  {
    name: "SOSE Elite",
    location: "/subscription-plans",
  },
  {
    name: "Gift Voucher",
    location: "/gift-voucher",
  },
  {
    name: "About us",
    location: "/about-us",
  },
  {
    name: "Inspire & Support",
    location: "/inspire-and-support",
  },
  {
    name: "Organic Living",
    location: "/organic-living",
  },
  {
    name: "Exports",
    location: "/exports",
  },
  {
    name: "B2B",
    location: "/bussiness",
  },
  {
    name: "Franchise",
    location: "/franchise",
  },
  // {
  //   name: "Our Videos",
  //   location: "/our-videos",
  // },
  {
    name: "Store Locator",
    location: "/store-locator",
  },
  {
    name: "Contact Us",
    location: "/contact-us",
  },

  // { name: "Natural Products", location: "/shop" },

  // {
  //   name: "Gifting",
  //   location: "/shop?gift=true",
  // },
];
const mainLinks = [
  {
    name: "Ethically Grown Mango",
    categoryId: 253,
  },
  {
    name: "Gifting",
    categoryId: 288,
  },
  {
    name: "Sugar Free - Healthy Sweets",
    categoryId: 791,
  },
  {
    name: "GIR Gau Products",
    categoryId: 278,
  },
  {
    name: "Health Care",
    categoryId: 281,
  },
  {
    name: "Personal Care",
    categoryId: 344,
  },
  {
    name: "Nutrition",
    categoryId: 788,
  },

  {
    name: "Grocery",
    categoryId: 291,
  },
  {
    name: "Healthy Breakfast",
    categoryId: 775,
  },
  {
    name: "Healthy Snacks",
    categoryId: 317,
  },
  {
    name: "Healthy Powder",
    categoryId: 716,
  },
  {
    name: "Chocolate & Bars",
    categoryId: 773,
  },
  {
    name: "Tea & Coffee",
    categoryId: 769,
  },
  // {
  //   name: "Beverages",
  //   categoryId: 772,
  // },
  {
    name: "Seasonal Foods",
    categoryId: 290,
  },
  {
    name: "World Foods",
    categoryId: 771,
  },
  {
    name: "Natural Utensils",
    categoryId: 354,
  },
  {
    name: "Home Care",
    categoryId: 347,
  },

  // {
  //   name: "Super Food",
  //   categoryId: 601,
  // },

  // {
  //   name: "Sweetener",
  //   categoryId: 774,
  // },

  ,
];

export default function Navbar() {
  let { search } = useLocation();

  const prod_search = new URLSearchParams(search).get("search");
  const [Open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuRef = useRef(null);
  const [topCategory, setTopCategory] = useState([]);
  const handleScroll = (direction) => {
    const menu = menuRef.current;
    const scrollAmount = 100; // Adjust this value based on how much you want to scroll

    if (direction === "left") {
      menu.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      menu.scrollLeft += scrollAmount;
    }
    setScrollPosition(menu.scrollLeft);
  };

  const handleHover = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleHoverCategory = (index) => {
    setOpenCategory(index);
  };
  const handleCloseCategory = (index) => {
    setOpenCategory();
  };
  const [categories, setCategories] = useState([]);
  const [categoriesLastIndex, setCategoriesLastIndex] = useState(0);
  const [subCategories, setSubCategories] = useState([]);
  const [openOuterAccordion, setOpenOuterAccordion] = useState(false);
  const [openAccrodion, setOpenAccrodion] = useState(false);
  const [subCategoriesLastIndex, setSubCategoriesLastIndex] = useState([]);
  const [subChildCategories, setSubChildCategories] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [accordion, setAccordion] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const menuButtonRef = useRef();
  const didMount = useRef(false);
  const [openSections, setOpenSections] = useState([]);
  const [openSubSections, setOpenSubSections] = useState([]);
  const [all, setAll] = useState(false);
  const toggleSection = (index, section) => {
    setAll(false);
    if (section.children.length !== 0) {
      if (openSections?.includes(index)) {
        setOpenSections(openSections?.filter((item) => item !== index));
      } else {
        setOpenSections([...openSections, index]);
      }
    }
  };
  const subToggleSection = (index, section) => {
    setAll(false);
    if (section.children.length !== 0) {
      if (openSubSections?.includes(index)) {
        setOpenSubSections(openSubSections?.filter((item) => item !== index));
      } else {
        setOpenSubSections([...openSubSections, index]);
      }
    }
  };
  useEffect(() => {
    onClose();
  }, [navigate]);
  const [isFlexVisible, setIsFlexVisible] = useState(true);
  const flexRef = useRef(null);
  // const setCategoryFilter = async (categoryId) => {
  //   if (JSON.parse(categoryId !== null)) {
  //     setSearchParams({ category: categoryId });
  //   } else {
  //     setSearchParams({});
  //   }
  // };

  let name = [
    localStorage.getItem("first_name"),
    localStorage.getItem("last_name"),
  ].join(" ");

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    CheckOrSetUDID();
    getCategories();
  }, []);

  const mergeArraysById = (array1, array2) =>
    array1.reduce((result, obj) => {
      const matchingObj = array2.find((o) => o.id === obj.categoryId);
      if (matchingObj) result.push({ ...obj, ...matchingObj });
      return result;
    }, []);

  const getCategories = async () => {
    const response = await client.get("/categories/", {
      params: { list: true },
    });

    if (response.data.status === true) {
      setCategories(response.data.categories);
      setTopCategory(mergeArraysById(mainLinks, response.data.categories));
    }
  };

  useEffect(() => {
    if (didMount.current === true) {
      if (searchQuery !== null && searchQuery !== "") {
        getSearchResults();
      } else {
        setSearchResults(null);
      }
    } else {
      didMount.current = true;
    } // eslint-disable-next-line
  }, [searchQuery]);

  async function getSearchResults() {
    const response = await client.get("/web/products/list/", {
      params: {
        prod_search: searchQuery,
        category_name: searchQuery,
        // filter_by: "",
        // min_price: "",
        // max_price: "",
      },
    });
    if (response.data.status === true) {
      setSearchResults(response.data.data.data);
    }
  }

  const handleClick = (data) => {
    const baseUrl = "/shop?page=1&";
    let params = "";
    if (data?.categoryId) {
      params = createSearchParams({
        category: data?.categoryId,
        category_name: data?.name,
      });
    }
    navigate(baseUrl + params);
  };

  const handleShow = (data, index) => {
    setSubCategories(data);
    setCategoriesLastIndex(index);
    setSubCategoriesLastIndex(0);
  };

  const handleShowSub = (data, index) => {
    setSubChildCategories(data);
    setSubCategoriesLastIndex(index);
  };

  const debouncedSetSearchQuery = debounce((value) => {
    setSearchQuery(value);
  }, 500);

  const handleInputChange = (e) => {
    setIsFlexVisible(true);
    debouncedSetSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (flexRef.current && !flexRef.current.contains(event.target)) {
        setIsFlexVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  
    document.addEventListener("touchmove", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const Logout = () => {
    localStorage.clear();
    CartEmitter.emit("updateCartCount", 0);
    CartEmitter.emit("updateProductTotal",0)
    toast({
      title: "Logged out successfully!",
      status: "success",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });

    navigate("/");
    // CheckOrSetUDID();
  };

  return (
    <>
      <Box position="sticky" top={0} backgroundColor="white" zIndex={999}>
        <Flex justify="center" display={isMobile ? "flex" : "none"}>
          <Link as={ReactRouterLink} to="/">
            <Image
              // width="100px"
              // height="50px"
              boxSize="130px"
              objectFit="contain"
              src="/sose_logo.png"
              alt="SOSE Logo"
            />
          </Link>
        </Flex>
        <Container
          maxW={"container.xl"}
          my={2}
          display={isMobile ? "" : "none"}
        >
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={{
              base: "space-between",
              md: "space-between",
              xl: "space-between",
            }}
            gap={{ base: 2, xl: 10, "2xl": 20 }}
          >
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
              ref={menuButtonRef}
            />

            <HStack spacing={{ base: 4, md: 6 }} >
              <Flex gap={2} align="center">
                <Flex direction="column" position={"relative"}>
                  <InputGroup size="sm" width={"auto"}  >
                    <Input
                      w={{ base: "40vw", md: "auto" }}
                      placeholder="Search"
                      //focusBorderColor="brand.500"
                      defaultValue={prod_search}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          navigate(
                            searchQuery.length > 0
                              ? `/shop?page=1&search=${searchQuery}`
                              : `/shop?page=1&`
                          );
                        }
                      }}
                    />
                    <InputRightElement
                      children={
                        <SearchIcon
                          color="brand.100"
                          h={"100%"}
                          _hover={{
                            color: "brand.900",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            searchQuery.length > 0 &&
                              navigate(`/shop?page=1&search=${searchQuery}`);
                          }}
                          aria-label="Search products"
                        />
                      }
                    />
                  </InputGroup>
                  {searchResults !== null ? (
                    searchResults.length > 0 ? (
                      <Flex
                        direction="column"
                        zIndex={99}
                        w={{ base: "65vw", lg: "22.5vw" }}
                        position="absolute"
                        top={10}
                        display={isFlexVisible ? "flex" : "none"}
                        //  height={350}
                        //  overflowY={"auto"}
                        // onMouseLeave={() => setIsFlexVisible(false)} 
                        
                      >
                        {searchResults?.slice(0, 4).map((result) => (
                          <LinkBox
                            as={Flex}
                            border="1px"
                            borderColor="gray.400"
                            p={4}
                            justify="space-between"
                            align="center"
                            bg="bg.100"
                            gap={4}
                          >
                            <Image src={result.image1} boxSize="10" />
                            <Text
                              fontSize={"sm"}
                              fontWeight="700"
                              w={{
                                base: "100%",
                                lg: "75%",
                              }}
                            >
                              <LinkOverlay href={`/products/${result.id}`}>
                                {result.name}
                              </LinkOverlay>
                            </Text>
                            <Text fontSize="sm" fontWeight="600">
                              ₹{result.base_price}
                            </Text>
                          </LinkBox>
                        ))}
                      </Flex>
                    ) : (
                      <Box
                        zIndex={99}
                        w={{ base: "65vw", lg: "22.5vw" }}
                        position="absolute"
                        top={10}
                        p={4}
                        bg="bg.100"
                        border="1px"
                        borderColor="gray.400"
                        display={isFlexVisible ? "flex" : "none"}
                        
                      >
                        <Text fontSize="sm" fontWeight="600">
                          No products found
                        </Text>
                      </Box>
                    )
                  ) : null}
                </Flex>
                <CartAndWishlistButtons />
              </Flex>
              <Menu>
                <MenuButton aria-label="User profile menu">
                  <Avatar
                    size="sm"
                    name={name.trim() !== "" ? name : null}
                    src={null}
                    color={"white"}
                    background={"brand.500"}
                  />
                </MenuButton>
                {checkLogin().isLoggedIn ? (
                  <MenuList zIndex={999}>
                    <MenuItem as={ReactRouterLink} to="/profile">
                      My account
                    </MenuItem>
                    {/* {localStorage.getItem("access") === "true" ? (
                      <MenuItem as={"a"} href="/dashboard">
                        Dashboard
                      </MenuItem>
                    ) : null} */}
                    <MenuDivider />
                    <MenuItem onClick={() => Logout()}>Logout</MenuItem>
                  </MenuList>
                ) : (
                  <MenuList zIndex={999}>
                    {/* <MenuItem
                    as={Link}
                    bg={{ base: "none", md: "brand.500" }}
                    href="/login"
                    cursor={"pointer"}
                    color={{ base: "black", md: "white" }}
                    fontWeight={{ base: 400, md: 600 }}
                    py={{ base: 0, md: 2 }}
                    px={{ base: 0, md: 5 }}
                    borderRadius={{ base: 0, md: "md" }}
                    _hover={{ bg: "brand.500" }}
                  > */}
                    <MenuItem
                      as={Link}
                      href="/login"
                      cursor={"pointer"}
                      _hover={{ textDecoration: "none" }}
                    >
                      Login
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </HStack>
          </Flex>
          <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="left"
            finalFocusRef={menuButtonRef}
          >
            <DrawerOverlay backdropFilter="auto" backdropBlur="2px" />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader as={Flex} justify="center">
                <Link as={ReactRouterLink} to="/">
                  <Image
                    boxSize="105px"
                    objectFit="contain"
                    src="/sose_logo.png"
                    alt="SOSE Logo"
                  />
                </Link>
              </DrawerHeader>

              <DrawerBody p={0}>
              <Accordion width={"100%"} onClose={handleClose}>
                  <AccordionItem isOpen={Open}>
                    <AccordionButton
                      onClick={() => {
                        handleHover();
                        setOpenOuterAccordion(!openOuterAccordion);
                      }}
                      style={
                        all
                          ? {
                              background: "#436131",
                              color: "white",
                              borderRadius: 5,
                            }
                          : {
                              background: "white",
                              color: "black",
                              borderRadius: 5,
                            }
                      }
                    >
                      <Box
                        as="span"
                        flex="1"
                        mb={2}
                        fontSize="md"
                        color="brand.900"
                        textAlign="left"
                      >
                        Shop By Category
                      </Box>{" "}
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel
                      pb={4}
                      display={openOuterAccordion ? "block" : "none"}
                    >
                      <Accordion width={"100%"} onClose={handleClose}>
                        <AccordionItem>
                          {categories?.map((section, index) => (
                            <AccordionItem
                              key={index}
                              width={"100%"}
                              textAlign={"start"}
                              textDecoration="none"
                              isOpen={!isOpen}
                            >
                              <AccordionButton
                                marginLeft={4}
                                onClick={() => {
                                  toggleSection(index, section);

                                  setSearchParams({
                                    category: section.id,
                                  });
                                  if (section?.children?.length > 0) {
                                    setOpenAccrodion();
                                  } else {
                                    navigate(
                                      `/shop?page=1&category=${section.id}&category_name=${encodeURIComponent(section?.name)}`
                                    );
                                    setAccordion(!isOpen);
                                    onClose();
                                  }
                                }}
                              >
                                <Box
                                  as="span"
                                  flex="1"
                                  textAlign="left"
                                  textTransform={"capitalize"}
                                  width={"100%"}
                                >
                                  {section?.name}
                                </Box>
                                <AccordionIcon
                                  display={
                                    section?.children?.length > 0 ? "" : "none"
                                  }
                                />
                              </AccordionButton>
                              <AccordionPanel
                                pb={4}
                                width={"100%"}
                                display={
                                  openSections.includes(index)
                                    ? "block"
                                    : "none"
                                }
                              >
                                {openSections?.includes(index) ? (
                                  <>
                                    {section?.children.map(
                                      (subcategory, subIndex) => (
                                        <>
                                          <Accordion
                                            width={"100%"}
                                            onClose={handleClose}
                                          >
                                            <AccordionItem
                                              key={subIndex}
                                              isOpen={isOpen}
                                            >
                                              <AccordionButton
                                                width={"100%"}
                                                textAlign={"start"}
                                                onClick={() => {
                                                  subToggleSection(
                                                    subIndex,
                                                    subcategory
                                                  );

                                                  if (
                                                    subcategory?.children
                                                      ?.length > 0
                                                  ) {
                                                    setOpenAccrodion(
                                                      !openAccrodion
                                                    );
                                                    setOpen(Open);
                                                  } else {
                                                    navigate(
                                                      `/shop?page=1&category=${subcategory.id}&category_name=${encodeURIComponent(subcategory?.name)}`
                                                    );
                                                    setAccordion(!isOpen);
                                                    onClose();
                                                  }
                                                }}
                                              >
                                                <Box
                                                  as="span"
                                                  flex="1"
                                                  textAlign="left"
                                                  fontSize={14}
                                                >
                                                  {subcategory?.name}
                                                </Box>
                                                <AccordionIcon
                                                  onClick={() =>
                                                    navigate(
                                                      `/shop?page=1&category=${subcategory.id}&category_name=${encodeURIComponent(subcategory?.name)}`
                                                    )
                                                  }
                                                  display={
                                                    subcategory?.children
                                                      ?.length > 0
                                                      ? ""
                                                      : "none"
                                                  }
                                                />
                                              </AccordionButton>
                                              <AccordionPanel
                                                pb={4}
                                                display={
                                                  openSubSections.includes(
                                                    subIndex
                                                  )
                                                    ? "block"
                                                    : "none"
                                                }
                                              >
                                                {openSubSections?.includes(
                                                  subIndex
                                                ) ? (
                                                  <>
                                                    {subcategory?.children.map(
                                                      (children, i) => (
                                                        <Text
                                                          textDecoration="none"
                                                          py={1}
                                                          key={i}
                                                          onClick={() => {
                                                            navigate(
                                                              `/shop?page=1&category=${children.id}&category_name=${encodeURIComponent(children?.name)}`
                                                            );
                                                            onClose();
                                                          }}
                                                          fontSize={13}
                                                          cursor={"pointer"}
                                                          marginLeft={3}
                                                        >
                                                          {children?.name}
                                                        </Text>
                                                      )
                                                    )}
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </AccordionPanel>
                                            </AccordionItem>
                                          </Accordion>
                                        </>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </AccordionPanel>
                            </AccordionItem>
                          ))}
                        </AccordionItem>
                      </Accordion>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Flex direction="column" gap={2}>
                  
                  {Links.map((link) => (
                    <Fragment key={link.name}>
                      <Link
                        as={ReactRouterLink}
                        to={link.location}
                        color="brand.900"
                        _hover={{
                          textDecoration: "none",
                        }}
                        ms={4}
                      >
                        {link.name}
                      </Link>
                      {/* </LinkOverlay> */}
                      <Divider h={"1px"} bg="gray.200" />
                    </Fragment>
                    // </LinkBox>
                  ))}
                </Flex>

             
                {/* </Link> */}
              </DrawerBody>
              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Container>
        <Container
          maxW={"container.xl"}
          px={1}
          // style={{
          //   boxShadow: "rgba(0, 0, 0, 0.15) 0px 1.95px 0px",
          //   position: "sticky",
          //   overFlow: "hidden",
          //   backgroundColor: "white",
          //   top: 20,
          //   zIndex: 9,
          // }}
          display={isMobile ? "none" : "block"}
        >
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns={{ xl: "repeat(12, 1fr)"}}
          >
            <GridItem
              rowSpan={2}
              colSpan={1}
              
              // style={{ borderBottom: "0.5px solid #b7b7b7" }}
            >
              <Link as={ReactRouterLink} to="/">
                <Image
                  boxSize="100px"
                  objectFit="contain"
                  src="/sose_logo.png"
                  alt="SOSE Logo"
                />
              </Link>
            </GridItem>
            <GridItem
              colSpan={9}
              display={"flex"}
              // style={{ borderBottom: "0.5px solid #b7b7b7" }}
              // sx={{ whiteSpace: "nowrap" }}
            >
              <Flex
                as={"nav"}
                gap={4}
                display={{ base: "flex", lg: "flex" }}
                fontSize={{ lg: 11, xl: 14, md: 9 }}
                alignItems={"center"}
              >
                {Links.map((link) => (
                  <>
                    <Link
                      as={ReactRouterLink}
                      to={link.location}
                      className={link.name === "SOSE Elite" ? "new-link" : ""}
                      _hover={{
                        textDecoration: "none",
                        color: "brand.900",
                      }}
                      // fontWeight={600}
                      onMouseEnter={handleClose}
                    >
                      {link.name}
                    </Link>
                  </>
                ))}
              </Flex>
            </GridItem>

            <GridItem
              colSpan={2}
              display={"flex"}
              // style={{ borderBottom: "0.5px solid #b7b7b7" }}
              justifyContent={"end"}
            >
              <Flex
                as={"nav"}
                gap={3}
                display={{ base: "flex", lg: "flex" }}
                fontSize={{ xl: 16, lg: 14 }}
                alignItems={"center"}
              >
                <CartAndWishlistButtons />
                {checkLogin().isLoggedIn ? (
                  <Menu>
                    <MenuButton aria-label="User profile menu">
                      <Avatar
                        size="sm"
                        name={name.trim() !== "" ? name : null}
                        src={null}
                        color={"white"}
                        background={"brand.500"}
                      />
                    </MenuButton>
                    {checkLogin().isLoggedIn ? (
                      <MenuList zIndex={999}>
                        <MenuItem as={ReactRouterLink} to="/profile">
                          My account
                        </MenuItem>

                        <MenuDivider />
                        <MenuItem onClick={() => Logout()}>Logout</MenuItem>
                      </MenuList>
                    ) : (
                      <></>
                    )}
                  </Menu>
                ) : (
                  <>
                    <Link
                      className={"new-link"}
                      _hover={{
                        textDecoration: "none",
                        color: "brand.900",
                      }}
                      fontWeight={500}
                      fontSize={{ md: "14px" }}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Link>
                    <Link
                      onClick={() => navigate("/signup")}
                      className={"new-link"}
                      _hover={{
                        textDecoration: "none",
                        color: "brand.900",
                      }}
                      fontWeight={500}
                      fontSize={{ md: "14px" }}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </Flex>
            </GridItem>
            <GridItem
              colSpan={7}
              display={"flex"}
              alignItems={"center"}
              // style={{ borderBottom: "0.5px solid #b7b7b7" }}
            >
              <InputGroup size="sm" width={"100%"}>
                <Input
                  variant="outline"
                  w={{ base: "25vw", md: "100%" }}
                  placeholder="Search for Natural Products "
                  defaultValue={prod_search}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(
                        searchQuery.length > 0
                          ? `/shop?page=1&search=${searchQuery}`
                          : `/shop?page=1&`
                      );
                    }
                  }}
                />
                {/* <InputRightElement children={<></>} /> */}
                <Button
                  size="sm"
                  variant={"outline"}
                  background={"brand.500"}
                  color="white"
                  _hover={{
                    background: "brand.400",
                  }}
                  px={4}
                  onClick={() => {
                    searchQuery.length > 0 &&
                      navigate(`/shop?page=1&search=${searchQuery}`);
                  }}
                >
                  <SearchIcon
                    mr={2}
                    color="white"
                    h={"100%"}
                    _hover={{
                      cursor: "pointer",
                    }}
                    aria-label="Search products"
                  />
                  Search
                </Button>
              </InputGroup>
              {searchResults !== null ? (
                searchResults.length > 0 ? (
                  <Flex
                    ref={flexRef}
                    direction="column"
                    zIndex={99}
                    w={{ base: "65vw", lg: "50.5vw" }}
                    position="absolute"
                    top={24}
                    bg={"white"}
                    borderRadius={6}
                    boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                    display={isFlexVisible ? "flex" : "none"}
                    //onMouseLeave={()=>setIsFlexVisible(false)}
                  >
                    {searchResults?.slice(0, 4).map((result) => (
                      <LinkBox
                        as={Flex}
                        // border="1px"
                        borderColor="gray.400"
                        p={4}
                        justify="space-between"
                        align="center"
                        gap={4}
                        _hover={{
                          bg: "gray.100",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        {/* <Image src={result.image1} boxSize="10" /> */}
                        <Text
                          fontSize={"sm"}
                          fontWeight="700"
                          w={{
                            base: "100%",
                            lg: "75%",
                          }}
                        >
                          <LinkOverlay href={`/products/${result.id}`}>
                            {result.name}
                          </LinkOverlay>
                        </Text>
                        <Text fontSize="sm" fontWeight="600">
                          ₹{result.base_price}
                        </Text>
                      </LinkBox>
                    ))}
                  </Flex>
                ) : (
                  <Box
                    ref={flexRef}
                    zIndex={99}
                    w="50.5vw"
                    position="absolute"
                    top={24}
                    p={4}
                    bg={"white"}
                    borderRadius={6}
                    boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                    display={isFlexVisible ? "flex" : "none"}
                  >
                    <Text fontSize="sm" fontWeight="600">
                      No products found
                    </Text>
                  </Box>
                )
              ) : null}
            </GridItem>
            <GridItem
              colSpan={4}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
              // style={{ borderBottom: "0.5px solid #b7b7b7" }}
              gap={10}
              fontSize={15}
            >
              <Link
                isExternal={true}
                _hover={{ color: "text.500" }}
                as={ReactRouterLink}
                to={"https://www.facebook.com/soseorganic/"}
              >
                <FaFacebookF fontSize={20} />
              </Link>
              <Link
                _hover={{ color: "text.500" }}
                isExternal={true}
                as={ReactRouterLink}
                to={"https://www.instagram.com/sose_organic/"}
              >
                <FiInstagram fontSize={20} />
              </Link>
              <Link
                _hover={{ color: "text.500" }}
                isExternal={true}
                as={ReactRouterLink}
                to={
                  "https://api.whatsapp.com/send/?phone=7405095969&text&type=phone_number&app_absent=0"
                }
              >
                <FaWhatsapp fontSize={20} />
              </Link>
              <Link
                _hover={{ color: "text.500" }}
                isExternal={true}
                as={ReactRouterLink}
                to={"https://www.youtube.com/channel/UCCpb64CX-rqBBZaWpHsNCHw"}
              >
                <TfiYoutube fontSize={20} />
              </Link>
              {/* <Link
              className={"SOSE Elite"}
              _hover={{ textDecoration: "none", color: "brand.900" }}
              fontWeight={600}
              onClick={() => navigate("/subscription-plans")}
            >
              SOSE Elite
              <Badge
                bg="brand.500"
                color="white"
                className="new"
                fontSize="2xs"
                mb={4}
                ms={1}
              >
                new
              </Badge>
            </Link> */}
              <Link
                _hover={{ color: "text.500" }}
                isExternal={true}
                as={ReactRouterLink}
                to={
                  "https://play.google.com/store/apps/details?id=com.sose.main&pcampaignid=web_share"
                }
              >
                <FaGooglePlay fontSize={20} />
              </Link>
              <Link
                _hover={{ color: "text.500" }}
                isExternal={true}
                as={ReactRouterLink}
                to={
                  "https://apps.apple.com/in/app/sose-sidha-kisan-se/id6447752737"
                }
              >
                <FaApple fontSize={22} />
              </Link>
            </GridItem>
            <GridItem
              colSpan={12}
              display={"flex"}
              justifyContent={{
                center: "center",
                lg: "start",
              }}
              alignItems={"center"}
              // style={{ borderBottom: "0.5px solid #b7b7b7" }}
              gap={0.5}
              fontSize={15}
              py={2}
              overflowX={"scroll"}
              // maxWidth={"95vw"}
            >
              {/* <Link
              _hover={{
                textDecoration: "none",
                color: "brand.900",
              }}
              fontWeight={600}
              href={`/shop?page=1&category=${288}&category_name=Gifting`}
              style={{ whiteSpace: "nowrap" }}
            >
              Gifting
            </Link> */}
              {topCategory?.map((data, index) => (
                <>
                  <Menu
                    isOpen={openCategory === index}
                    onClose={() => handleCloseCategory()}
                  >
                    <MenuButton
                      onMouseEnter={() => handleHoverCategory(index)}
                      _hover={{ color: "brand.500", bg: "transparent" }}
                      _active={{ color: "brand.500", bg: "transparent" }}
                      _focusVisible={{
                        color: "brand.500",
                        bg: "transparent",
                        outline: "none",
                      }}
                      width={"fit-content"}
                      fontSize={"12px"}
                      cursor={"pointer"}
                      variant={"ghost"}
                      // onMouseLeave={() => handleCloseCategory(index)}
                      // fontWeight={600}

                      px={2}
                      onClick={() => {
                        handleHoverCategory(index),
                          navigate(
                            `/shop?page=1&category=${
                              data.id
                            }&category_name=${encodeURIComponent(data?.name)}`
                          );
                      }}
                    >
                      <Flex
                        w={"max-content"}
                        gap={0.5}
                        alignItems={"center"}
                        fontSize={"12px"}
                      >
                        {data.name}
                        {data?.children.length > 0 && <IoIosArrowDown />}
                      </Flex>
                    </MenuButton>
                    {data?.children.length > 0 ? (
                      <MenuList
                        as={Flex}
                        direction={"column"}
                        maxH={"70vh"}
                        wrap={"wrap"}
                        onMouseEnter={() => handleHoverCategory(index)}
                        onMouseLeave={handleCloseCategory}
                        sx={{ placement: "center" }}
                        zIndex={9999}
                        p={2}
                        boxShadow={
                          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                        }
                      >
                        {data?.children?.map((section, index) => (
                          <>
                            <GridItem spacing={3} p={2}>
                              <Text
                                as="b"
                                cursor={"pointer"}
                                _hover={{ color: "brand.500" }}
                                fontSize={"12px"}
                                onClick={() => {
                                  handleCloseCategory(index);
                                  navigate(
                                    `/shop?page=1&category=${
                                      section.id
                                    }&category_name=${encodeURIComponent(
                                      section?.name
                                    )}`
                                  );
                                }}
                              >
                                {section.name}
                              </Text>
                              {section?.children?.map((section, index) => (
                                <Text
                                  fontSize={"12px"}
                                  cursor={"pointer"}
                                  _hover={{ color: "brand.500" }}
                                  onClick={() => {
                                    handleCloseCategory(index);
                                    navigate(
                                      `/shop?page=1&category=${
                                        section.id
                                      }&category_name=${encodeURIComponent(
                                        section?.name
                                      )}`
                                    );
                                  }}
                                >
                                  {section.name}
                                </Text>
                              ))}
                            </GridItem>
                          </>
                        ))}
                      </MenuList>
                    ) : (
                      <></>
                    )}
                  </Menu>
                </>
              ))}
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
