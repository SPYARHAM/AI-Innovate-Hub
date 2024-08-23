import {
  Box,
  Button,
  GlobalStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import styled, { keyframes } from "styled-components";
import { purple } from "@mui/material/colors";
import emptyNotesIcon from "../assets/Chatting-amico.svg";
import emptryNotesIcon2 from "../assets/Photo and text recognition using artificial intelligence.svg";
import backgroundSVG from "../assets/Background 2.svg";
import { Global } from "@emotion/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ImageGenerate from "../assets/Creative team-cuate.svg";
import music from "../assets/Headphone-amico 12.25.58 PM.svg";
import textToSpeech from "../assets/Speech to text-rafiki.svg";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

// const bgstyle = {
//   animation:
//     "scale 5s ease-in-out infinite alternate, rotate 20s linear infinite",
//   backgroundImage: "linear-gradient(-60deg, #ff9a9e 50%, #fad0c4 50%)",
//   bottom: "0",
//   left: "-50%",
//   opacity: ".6",
//   position: "fixed",
//   right: "-50%",
//   top: "0",
//   zIndex: "-1",
//   transformOrigin: "center",
// };

// const bgstyle2 = {
//   animation:
//     "slide 7s ease-in-out infinite alternate, rotate 10s linear infinite",
//   animationDirection: "alternate-reverse",
//   animationDuration: "4s",
//   transformOrigin: "center",
// };

// const bgstyle3 = {
//   animation:
//     "rotate 15s linear infinite, moveY 10s ease-in-out infinite alternate",
//   animationDuration: "5s",
//   transformOrigin: "center",
// };

// 2nd one with pink backgriund more subtle
// const bgStyle = {
//   animation: "slide 5s ease-in-out infinite alternate",
//   backgroundImage: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
//   bottom: "0",
//   left: "-50%",
//   opacity: "1",
//   position: "fixed",
//   right: "-50%",
//   top: "0",
//   zIndex: "-1",
//   transformOrigin: "center",
// };

// const bgStyle2 = {
//   animationDirection: "alternate-reverse",
//   animationDuration: "6s",
//   backgroundImage: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
// };

// const bgStyle3 = {
//   animationDuration: "7s",
//   backgroundImage: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
//   animation: "slideAndScale 7s ease-in-out infinite alternate",
// };

// const bgStyle4 = {
//   animationDuration: "8s",
//   backgroundImage: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
//   animation: "slideAndRotate 8s ease-in-out infinite alternate",
// };

// const bgStyle5 = {
//   animationDuration: "9s",
//   backgroundImage: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
//   animation: "slideAndRotate 9s ease-in-out infinite alternate-reverse",
// };

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedBox = styled(Box)`
  animation: ${fadeIn} 2s ease-in-out;
`;
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  // border: "1px solid",
  lineHeight: 1.5,
  // backgroundColor: "#0063cc",
  borderColor: "black",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    // backgroundColor: "#0069d9",
    // borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    // backgroundColor: "#0062cc",
    borderColor: "black",
  },
  // "&:focus": {
  //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  // },
});
const BackgroundSVG = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundSVG});
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.5; /* Adjust opacity for background effect */
  z-index: -1;
`;
const moveToSpeakEase = () => {
  const element = document.getElementById(1);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const bgStyle = {
  animation: "slide 5s ease-in-out infinite alternate",
  background: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
  bottom: "0",
  left: "-50%",
  opacity: "1",
  position: "fixed",
  right: "-50%",
  top: "0",
  zIndex: "-1",
  transformOrigin: "center",
};

const bgStyle2 = {
  animationDirection: "alternate-reverse",
  animationDuration: "6s",
  background: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
};

const bgStyle3 = {
  animationDuration: "7s",
  background: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
  animation: "slideAndScale 7s ease-in-out infinite alternate",
};

const bgStyle4 = {
  animationDuration: "8s",
  background: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
  animation: "slideAndRotate 8s ease-in-out infinite alternate",
};

const bgStyle5 = {
  animationDuration: "9s",
  background: "linear-gradient(-60deg, #fbc2eb 0%, #a6c1ee 100%)",
  animation: "slideAndRotate 9s ease-in-out infinite alternate-reverse",
};

const circleStyle = {
  position: "fixed",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.2)",
  pointerEvents: "none", // Avoid interference with user interactions
};

const flowerStyle = {
  position: "fixed",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(255, 255, 255, 0.5),)",
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
  pointerEvents: "none",
};
const sections = [
  {
    id: 1,
    name: "speakEase",
    title: "SpeakEase - Your AI-Powered Chat Companion",
    features: [
      "Seamless conversations with natural interactions.",
      "Advanced AI providing accurate responses.",
      "User-friendly interface for an enjoyable experience.",
    ],
    image: emptyNotesIcon,
  },
  {
    id: 2,
    name: "snapTalk",
    title: "SnapTalk: Your Gateway to Instant Image Insights and Conversations",
    features: [
      "Instantly analyze and extract details from your photos.",
      "Get immediate answers and insights with ease.",
      "Upload, process, and interact with images using advanced AI.",
    ],
    image: emptryNotesIcon2,
  },
  {
    id: 3,
    name: "Imaginix",
    title: "Imaginix: Turn Dreams into Dynamic Artworks",
    features: [
      "Transform your imagination into stunning visuals with just a prompt.",
      "Generate highly detailed and unique images based on your creative ideas.",
      "Experience the power of AI to bring your visual concepts to life effortlessly.",
    ],
    image: ImageGenerate,
  },
  {
    id: 4,
    name: "MusicGen",
    title: "MusicGen: Transform Your Ideas into Captivating Melodies",
    features: [
      "Whether you need background music for a video, inspiration for your next song, or just want to have fun, MusicGen offers limitless creativity.",
      "From classical to jazz, rock to electronic, explore a wide array of musical styles.",
      "No musical background? No problem! MusicGen’s interface is designed for ease of use, making music creation accessible to everyone.",
    ],
    image: music,
  },
  {
    id: 5,
    name: "EchoVerse",
    title: "EchoVerse: Bridging Text and Sound with AI Magic",
    features: [
      "Enter your text and generate high-quality audio.",
      "Upload your audio file and get accurate transcriptions.",
      "Cutting-edge technology for precise and natural results.",
    ],
    image: textToSpeech,
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (index) => () => {
    const routes = [
      // HomePage
      "/SpeakEase", // SpeakEase
      "/SnapTalk", // SnapTalk
      "/Imaginix", // ImageGenerator
      "/MusicGen", // TextToAudio
      "/EchoVerse", // TextToSpeech
    ];

    const navigateTo = routes[index] || "/";
    navigate(navigateTo);
  };
  return (
    <>
      {/* <Global
        styles={`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes scale {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.5);
          }
        }
        @keyframes slide {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(25%);
          }
        }
        @keyframes moveY {
          0% {
            transform: translateY(-20%);
          }
          100% {
            transform: translateY(20%);
          }
        }
      `}
      />
      <Box sx={[bgstyle]}></Box>
      <Box sx={[bgstyle, bgstyle2]}></Box>
      <Box sx={[bgstyle, bgstyle3]}></Box> */}

      <GlobalStyles
        styles={`
    @keyframes slide {
      0% { transform: translateX(-20%); }
      100% { transform: translateX(20%); }
    }

    @keyframes slideAndScale {
      0% { transform: translateX(-20%) scale(1); }
      100% { transform: translateX(20%) scale(1.1); }
    }

    @keyframes slideAndRotate {
      0% { transform: translateX(-20%) rotate(0deg); }
      100% { transform: translateX(20%) rotate(10deg); }
    }

    @keyframes float {
      0% { transform: translateY(-10%); }
      50% { transform: translateY(10%); }
      100% { transform: translateY(-10%); }
    }

    @keyframes flowerPulse {
      0% { transform: scale(0.8); opacity: 0.8; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(0.8); opacity: 0.8; }
    }
  `}
      />
      <Box sx={bgStyle}></Box>
      <Box sx={{ ...bgStyle, ...bgStyle2 }}></Box>
      <Box sx={{ ...bgStyle, ...bgStyle3 }}></Box>
      <Box sx={{ ...bgStyle, ...bgStyle4 }}></Box>
      <Box sx={{ ...bgStyle, ...bgStyle5 }}></Box>

      {/* Floating Circles */}
      <Box
        sx={{
          ...circleStyle,
          width: "100px",
          height: "100px",
          top: "20%",
          left: "10%",
          animation: "float 5s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          ...circleStyle,
          width: "80px",
          height: "80px",
          top: "60%",
          left: "30%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          ...circleStyle,
          width: "120px",
          height: "120px",
          top: "40%",
          left: "70%",
          animation: "float 7s ease-in-out infinite",
        }}
      />

      {/* Pulsating Flowers */}
      <Box
        sx={{
          ...flowerStyle,
          top: "15%",
          left: "25%",
          animation: "flowerPulse 8s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          ...flowerStyle,
          width: "70px",
          height: "70px",
          top: "50%",
          left: "60%",
          animation: "flowerPulse 9s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          ...flowerStyle,
          width: "90px",
          height: "90px",
          top: "80%",
          left: "35%",
          animation: "flowerPulse 10s ease-in-out infinite",
        }}
      />
      <Container maxWidth="xl">
        <Box
          sx={{
            //   height: "250vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <BackgroundSVG />

          <Grid container spacing={0} sx={{ zIndex: 1 }}>
            <Grid item xs={12}>
              <Box sx={{ marginBottom: { xs: "150px", md: "180px" } }}>
                <Typography
                  //   variant="h2"
                  sx={{
                    fontFamily: "Times New Roman",
                    fontWeight: "bold",
                    marginTop: {
                      xs: "110px",

                      lg: "130px",
                      xl: "160px",
                    },
                    marginBottom: "20px",
                    paddingX: "10%", //make custom css styling for padding
                    fontSize: {
                      xs: "35px",
                      sm: "45px",
                      md: "50px",
                      lg: "60px",
                    },
                    textAlign: "center",
                  }}
                >
                  AI Innovate Hub: Where Conversations, Art, and Music Meet
                  Innovation
                </Typography>
                <Typography
                  //   variant="h4"
                  sx={{
                    fontFamily: "Times New Roman",
                    marginBottom: { xs: "30px", md: "35px" },
                    // mb: 2,
                    paddingX: "20%",
                    fontSize: {
                      xs: "20px",
                      sm: "30px",
                      md: "34px",
                      lg: "40px",
                    },
                    textAlign: "center",
                  }}
                >
                  Revolutionizing creativity with advanced AI tools for seamless
                  conversations, stunning art, and captivating music creation
                </Typography>
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <BootstrapButton
                    variant="contained"
                    sx={{
                      marginBottom: "16px",
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #BA68C8 90%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #FE6B8B 30%, #BA68C8 90%)",
                      },
                      fontSize: { xs: "18px", lg: "22px" },
                      fontFamily: "Times New Roman",
                      border: "none",
                    }}
                    endIcon={
                      <ReadMoreIcon sx={{ height: "30px", width: "60px" }} />
                    }
                    onClick={moveToSpeakEase}
                  >
                    Read More
                  </BootstrapButton>
                  {/* <BootstrapButton
                  variant="contained"
                  color="primary"
                  onClick={moveToSpeakEase}
                  // disabled={loading}
                  fullWidth
                  sx={{
                    marginBottom: "16px",
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    color: "white",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    },
                  }}
                  startIcon={<ReadMoreIcon />}
                >
                  Generate Image
                </BootstrapButton> */}
                </Box>
              </Box>
            </Grid>
            {sections.map((section, index) => (
              <Grid
                container
                sx={{
                  flexDirection: {
                    xs: "row",
                    md: index % 2 === 0 ? "row" : "row-reverse",
                  },
                  marginBottom: { xs: "20px", md: "130px" },
                }}
                maxWidth={"xl"}
                key={index}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    alignItems: { xs: "center", md: "flex-start" },
                    justifyContent: "center",
                    textAlign: { xs: "center", md: "left" },
                    padding: {
                      xs: "0px 15px 0px 15px",
                      md:
                        index % 2 === 0
                          ? "10px 30px 0px 50px"
                          : "10px 50px 0px 30px ",
                      xl:
                        index % 2 === 0
                          ? "10px 0px 0px 130px"
                          : "10px 130px 0px 0px",
                    },
                    borderRadius: "40px",
                  }}
                  id={section.id}
                >
                  <AnimatedBox>
                    <Typography
                      sx={{
                        fontFamily: "Times New Roman",
                        fontWeight: "bold",
                        mb: 2,
                        fontSize: {
                          xs: "35px",
                          sm: "42px",
                          md: "47px",
                          lg: "54px",
                          xl: "60px",
                        },
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Box sx={{ marginY: 3 }}>
                      {section.features.map((feature, featureIndex) => (
                        <Box
                          key={featureIndex}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{ mr: 2, color: "#4CAF50", fontSize: "2rem" }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: "Times New Roman",
                              fontSize: { xs: "18px", md: "22px", xl: "26px" },
                              textAlign: "justify",
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "30px",
                      }}
                    >
                      <BootstrapButton
                        variant="contained"
                        sx={{
                          marginBottom: "16px",
                          background:
                            "linear-gradient(45deg, #FE6B8B 30%, #BA68C8 90%)",
                          color: "white",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #FE6B8B 30%, #BA68C8 90%)",
                          },
                          fontSize: "18px",
                          fontFamily: "Times New Roman",
                          border: "none",
                        }}
                        endIcon={
                          <ArrowForwardIcon
                            sx={{ height: "30px", width: "40px" }}
                          />
                        }
                        onClick={handleNavigate(index)}
                      >
                        Explore More
                      </BootstrapButton>
                    </Box>
                  </AnimatedBox>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AnimatedBox
                    component="img"
                    src={section.image}
                    alt="Logo"
                    sx={{
                      width: { xs: "80%", md: 500, lg: 600, xl: 650 },
                      height: { xs: "auto", md: 500, lg: 500, xl: 550 },
                      my: "20px",
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
