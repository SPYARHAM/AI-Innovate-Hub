import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Slider,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import FileUpload from "../assets/Headphone-amico.svg";
import { IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import Loading from "../assets/Loading-amico.svg";
import ideaBox from "../assets/Cassette player-amico (1).svg";

import { styled, useTheme } from "@mui/material/styles";
import { VolumeMuteRounded } from "@mui/icons-material";
import { Global, css, keyframes } from "@emotion/react";
import SongsList from "./SongList";

const examplePrompts = [
  "Euphoric bollywood violin and melodious flute with rhythmic tabla beats, creating an enchanting auditory experience.",
  "Soothing guitar strings harmonized with gentle piano notes and uplifting violin melodies for a serene and joyful ambiance.",
  "Energetic pop beat featuring dynamic drums, catchy synths, and vibrant electric guitar riffs for a high-energy atmosphere.",
  "Dreamy orchestral arrangement with lush string sections, calming harp, and resonant cello for a captivating musical journey.",
  "Uplifting brass ensemble with lively trumpet, smooth saxophone, and rhythmic percussion, evoking a sense of celebration.",
  "Gentle acoustic guitar paired with soft piano chords and delicate violin harmonies, perfect for a relaxing and cheerful mood.",
  "Vibrant Latin rhythm with energetic bongos, rhythmic guitar strumming, and cheerful maracas for a festive feel.",
  "Soothing ambient soundscape with ethereal synth pads, tranquil chimes, and distant flute melodies, ideal for meditation.",
  "Dynamic rock anthem with powerful electric guitar solos, driving drum beats, and catchy bass lines for an adrenaline rush.",
  "Calming classical piece with serene piano melodies, graceful violin, and gentle woodwinds for a refined and peaceful experience.",
  "Joyful jazz composition with lively trumpet improvisations, smooth saxophone, and rhythmic double bass for a vibrant feel.",
  "Energetic EDM track with pulsating synths, catchy vocal chops, and thumping bass drops for a high-energy dance experience.",
  "Tranquil new age music with soothing harp, soft strings, and calming flute, perfect for relaxation and stress relief.",
  "Happy reggae rhythm with groovy bass lines, rhythmic guitar skanks, and uplifting horn section for a laid-back vibe.",
  "Inspirational pop ballad with heartfelt piano melodies, emotive strings, and powerful vocal harmonies for an uplifting mood.",
  "Bouncy hip-hop beat with punchy drums, catchy bass grooves, and playful piano riffs for a fun and energetic atmosphere.",
  "Lush cinematic score with dramatic orchestral strings, powerful brass, and epic percussion for a grand and emotional experience.",
  "Joyful folk tune with lively acoustic guitar strumming, cheerful banjo, and uplifting harmonica for a warm and inviting feel.",
  "Chill lo-fi beat with relaxing piano loops, smooth bass lines, and mellow drum patterns for a laid-back and cozy ambiance.",
  "Energetic salsa rhythm with lively trumpet, rhythmic congas, and vibrant piano montunos for a dance-inducing feel.",
  "Gentle lullaby with soft music box melodies, calming strings, and soothing harp, perfect for relaxation and sleep.",
  "Uplifting gospel choir with powerful vocal harmonies, soulful organ, and rhythmic clapping for a joyful and spiritual experience.",
  "Dreamy synthwave track with nostalgic synth melodies, driving bass lines, and pulsing drum patterns for a retro feel.",
  "Calming nature sounds with gentle guitar strumming, ambient piano chords, and distant bird songs for a tranquil environment.",
  "Energetic country tune with lively fiddle, rhythmic guitar strumming, and cheerful banjo for a fun and upbeat atmosphere.",
  "Soothing bossa nova with gentle guitar chords, smooth saxophone, and rhythmic percussion for a relaxing and romantic feel.",
  "Uplifting anthem with powerful orchestral strings, inspiring brass, and dynamic drum beats for a motivational experience.",
  "Joyful Celtic folk with lively fiddle, rhythmic bodhran, and cheerful tin whistle for a festive and cultural ambiance.",
  "Relaxing spa music with calming piano melodies, soft strings, and gentle chimes for a soothing and peaceful atmosphere.",
  "Energetic funk groove with catchy bass lines, rhythmic guitar riffs, and lively brass section for a dance-inducing feel.",
  "Tranquil piano solo with gentle melodies, soft harmonies, and calming progressions for a peaceful and reflective mood.",
  "Uplifting African rhythm with energetic djembe, rhythmic guitar, and vibrant marimba for a joyful and cultural experience.",
  "Dreamy ambient track with ethereal synth pads, gentle harp, and soothing vocal textures for a relaxing and meditative feel.",
  "Joyful mariachi with lively trumpet, rhythmic guitar strumming, and cheerful violin for a festive and celebratory atmosphere.",
  "Relaxing chillout music with smooth synth melodies, mellow bass lines, and gentle percussion for a laid-back and cozy vibe.",
  "Uplifting classical waltz with graceful piano melodies, elegant strings, and rhythmic orchestral swells for a refined feel.",
  "Energetic samba with lively percussion, rhythmic guitar, and vibrant brass for a dance-inducing and festive experience.",
  "Calming ambient soundscape with soothing synth pads, gentle chimes, and distant flute for a peaceful and meditative ambiance.",
  "Joyful reggae with groovy bass lines, rhythmic guitar skanks, and uplifting brass for a laid-back and happy atmosphere.",
  "Inspirational pop with heartfelt piano melodies, emotive strings, and powerful vocal harmonies for an uplifting and motivational mood.",
  "Bouncy hip-hop with punchy drums, catchy bass grooves, and playful piano riffs for a fun and energetic feel.",
  "Lush orchestral score with dramatic strings, powerful brass, and epic percussion for a grand and emotional experience.",
  "Gentle acoustic guitar with soft piano chords, delicate violin, and calming harmonica for a relaxing and cheerful vibe.",
  "Energetic rock with powerful electric guitar solos, driving drum beats, and catchy bass lines for an adrenaline rush.",
  "Soothing jazz with smooth saxophone, gentle piano, and rhythmic double bass for a relaxing and vibrant atmosphere.",
  "Uplifting EDM with pulsating synths, catchy vocal chops, and thumping bass drops for a high-energy dance experience.",
  "Tranquil new age with soothing harp, soft strings, and calming flute for relaxation and stress relief.",
  "Happy Latin with energetic bongos, rhythmic guitar, and cheerful maracas for a festive feel.",
  "Inspirational ballad with heartfelt piano melodies, emotive strings, and powerful vocal harmonies for an uplifting mood.",
  "Bouncy funk with catchy bass lines, rhythmic guitar riffs, and lively brass section for a dance-inducing and joyful atmosphere.",
];
const getRandomPrompts = (num) => {
  const shuffled = examplePrompts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const bgstyle = {
  animation:
    "scale 5s ease-in-out infinite alternate, rotate 20s linear infinite",
  backgroundImage: "linear-gradient(-60deg, #FAB7B7 50%, #F5A8A8 50%)",
  bottom: "0",
  left: "-50%",
  opacity: ".6",
  position: "fixed",
  right: "-50%",
  top: "0",
  zIndex: "-1",
  transformOrigin: "center",
};

const bgstyle2 = {
  animation:
    "slide 7s ease-in-out infinite alternate, rotate 10s linear infinite",
  animationDirection: "alternate-reverse",
  animationDuration: "4s",
  transformOrigin: "center",
};

const bgstyle3 = {
  animation:
    "rotate 15s linear infinite, moveX 10s ease-in-out infinite alternate",
  animationDuration: "5s",
  transformOrigin: "center",
};
const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
  transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
  "&::before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background:
      "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
  },
  "&::after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background:
      "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
    transform: "rotate(30deg)",
  },
});

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});
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
const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});
const TextToAudio = () => {
  const theme = useTheme();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");
  const [prompts, setPrompts] = useState(getRandomPrompts(4));
  const [audio] = React.useState(new Audio(audioUrl));
  const [position, setPosition] = React.useState(0);
  const [volume, setVolume] = React.useState(0.3); // Default volume
  const [playing, setPlaying] = React.useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [message, setMessage] = useState(
    "Your music is being generated. Please wait for a while..."
  );
  const [showRefresh, setShowRefresh] = useState(false);
  const [reset, setReset] = useState(false);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const handlePlayPause = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleSkip = (seconds) => {
    audio.currentTime += seconds;
    setPosition(audio.currentTime);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
  };
  // const trimmedDuration = 29;

  const wordCount = prompt.trim().split(/\s+/).length;
  const helperWords = [
    "Melodic",
    "Harmony",
    "Rhythmic",
    "Peaceful",
    "Refreshing",
    "Relaxing",
    "Soothing",
    "Soulful",
    "Euphoric",

    "Dynamic",
  ];
  const maxWords = 60;

  const handleChipClick = (word) => {
    if (!selectedChips.includes(word)) {
      const trimmedPrompt = prompt.trim();
      const newPrompt = trimmedPrompt + " " + word;
      const wordCount = newPrompt.trim().split(/\s+/).length;
      if (wordCount <= maxWords) {
        setPrompt(newPrompt.trim());
        setSelectedChips([...selectedChips, word]);
      }
    }
  };

  const handleChipDelete = (word) => {
    const newPrompt = prompt
      .replace(new RegExp(`\\b${word}\\b`, "g"), "")
      .replace(/\s\s+/g, " ")
      .trim();
    setPrompt(newPrompt);
    setSelectedChips(selectedChips.filter((chip) => chip !== word));
  };
  const handleChipClickPrompt = (word) => {
    const newPrompt = word;
    const wordCount = newPrompt.trim().split(/\s+/).length;
    if (wordCount <= maxWords) {
      setPrompt(newPrompt);
    }
  };

  const handleRandomClick = () => {
    setPrompts(getRandomPrompts(4));
  };
  const handleInputChange = (e) => {
    const newPrompt = e.target.value;
    const wordCount = newPrompt.trim().split(/\s+/).length;
    if (wordCount <= maxWords) {
      setPrompt(newPrompt);
    }
  };
  const handleDownload = async () => {
    try {
      let objectUrl;
      if (audioUrl.startsWith("blob:")) {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
      } else {
        objectUrl = audioUrl;
      }

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "generated_audio.wav";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error creating object URL:", err);
    }
  };
  return (
    <>
      <Global
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
      <Box sx={[bgstyle, bgstyle3]}></Box>
      <Container maxWidth="xl" padding="0px">
        {audioUrl ? <MusicLoaded /> : <Introduction />}
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              marginY: "20px",
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Box sx={{ textAlign: "center", width: "90%" }}>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <TextField
                  sx={{
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      height: "auto",
                      "&:hover fieldset": {
                        borderColor: "#BC658D",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#BC658D",
                        boxShadow: "0 0 20px #BC658D",
                      },
                      borderRadius: "10px",
                    },
                  }}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Describe what you want the AI to generate"
                  value={prompt}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Box>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "stretch",
                }}
              >
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "16px", fontFamily: "Times New Roman" }}
                    >
                      No inspiration? Try these:{" "}
                    </Typography>
                    <Button
                      startIcon={<ChangeCircleIcon />}
                      sx={{ color: "black" }}
                      onClick={handleRandomClick}
                    >
                      Random
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      marginBottom: 2,
                    }}
                  >
                    {prompts.map((prompt, index) => (
                      <Chip
                        key={index}
                        label={prompt}
                        onClick={() => handleChipClickPrompt(prompt)}
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                          "&:hover": {
                            // backgroundColor: "#9C27B0",
                            borderColor: "#9C27B0",
                            boxShadow: "0 0 10px #9C27B0",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      flexDirection: "column",
                      alignContent: "baseline",
                      justifyContent: "space-around",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row-reverse",
                      }}
                    >
                      <Typography variant="caption">
                        {wordCount} / {maxWords} words
                      </Typography>
                      <IconButton onClick={() => setPrompt("")}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        gap: 1,
                        marginBottom: 2,
                        alignItems: "baseline",
                      }}
                    >
                      {helperWords.map((word, index) => (
                        <Chip
                          key={index}
                          label={word}
                          onClick={() => handleChipClick(word)}
                          onDelete={() => handleChipDelete(word)}
                          color="primary"
                          variant={
                            selectedChips.includes(word)
                              ? "default"
                              : "outlined"
                          }
                          sx={{
                            "&:hover": {
                              backgroundColor: "#9C27B0",
                              borderColor: "#9C27B0",
                              boxShadow: "0 0 10px #9C27B0",
                            },
                            fontFamily: "Times New Roman",
                            fontSize: {
                              xs: "12px",
                              sm: "14px",
                              md: "15px",
                              lg: "16px",
                            },
                            backgroundColor: selectedChips.includes(word)
                              ? "#9C27B0"
                              : "transparent",
                            color: selectedChips.includes(word)
                              ? "#fff"
                              : "primary",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ my: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateAudio}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress sx={{ height: "20px" }} />
                  ) : (
                    "Generate Audio"
                  )}
                </Button>
                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <AnimatedBox
                      component="img"
                      src={Loading}
                      alt="Logo"
                      sx={{
                        width: {
                          xs: 300,
                          sm: 350,
                          md: 400,
                          lg: 450,
                          xl: 500,
                        },
                        height: { xs: "auto" },
                        my: "10px",
                      }}
                    />
                    <Box component="div" sx={{ marginBottom: 2 }}></Box>

                    <Typography
                      variant="h6"
                      align="center"
                      sx={{
                        marginBottom: 2,
                        // overflow: "hidden",
                        // whiteSpace: "nowrap",
                        // borderRight: "0.15em solid #000",
                        animation:
                          "typing 3.5s steps(40, end), blink 0.75s step-end infinite alternate",
                        width: "100%",
                      }}
                    >
                      {message}
                    </Typography>

                    {showRefresh && (
                      <Typography variant="h6" align="center" color="error">
                        If your music has not been generated yet, please refresh
                        the page to try again.
                      </Typography>
                    )}
                  </Box>
                )}
                {error && (
                  <Typography color="error" variant="body1" gutterBottom>
                    {error}
                  </Typography>
                )}

                {audioUrl && (
                  <AudioPlayer audioUrl={audioUrl} prompt={prompt} />
                )}
                {audioUrl && (
                  <Button
                    onClick={handleDownload}
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      mt: 1,
                    }}
                  >
                    Download
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Grid item xs={10} md={9}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontFamily: "Times New Roman",
                    marginBottom: "8px",
                    fontSize: {
                      xs: "20px",
                      sm: "25px",
                      md: "30px",
                      lg: "35px",
                    },
                  }}
                >
                  Get Ready to Be Amazed! 🌟
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    marginBottom: "20px",
                    fontFamily: "Times New Roman",
                    paddingX: { xs: "7px", sm: "5px" },
                    fontSize: {
                      xs: "18px",
                      sm: "22px",
                      md: "25px",
                      lg: "30px",
                    },
                  }}
                >
                  Dive into a visual wonderland with these stunning images
                  generated by our AI model! Each picture below is a testament
                  to the limitless power of imagination, brought to life with
                  unparalleled detail and creativity. From majestic wildlife to
                  serene landscapes, prepare to be wowed by the magic of AI
                  artistry!
                </Typography>
              </Box>
            </Box>
          </Grid>
          <SongsList />
          {/* <ImageList /> */}
        </Grid>
      </Container>
    </>
  );
};
const MusicLoaded = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatedBox
            component="img"
            src={ideaBox}
            alt="Logo"
            sx={{
              width: { xs: 330, sm: 400, md: 400, lg: 450, xl: 500 },
              height: { xs: "auto" },
              // my: "10px",
              // border: "1px solid black",
            }}
          />
          <Typography
            component="div"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "Times New Roman",
              marginBottom: "8px",
              fontSize: {
                xs: "20px",
                sm: "25px",
                md: "30px",
                lg: "35px",
              },
            }}
          >
            Your Stunning Music
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginBottom: "20px",
              fontFamily: "Times New Roman",
              paddingX: { xs: "7px", sm: "5px" },
              fontSize: {
                xs: "18px",
                sm: "22px",
                md: "25px",
                lg: "30px",
              },
            }}
          >
            Your music has been successfully generated! Enjoy the AI-crafted
            visual masterpiece below.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const Introduction = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "36px",
            marginBottom: "7px",

            WebkitBackgroundClip: "text",
            fontWeight: "bold",
            textAlign: "center",
            color: " black",
            fontFamily: "Times New Roman",
          }}
        >
          MusicGen: Transform Your Ideas into Captivating Melodies
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            marginBottom: "7px",

            WebkitBackgroundClip: "text",
            fontWeight: "bold",
            textAlign: "center",
            color: " black",
            fontFamily: "Times New Roman",
          }}
        >
          Transform your ideas into captivating melodies and experience the joy
          of instant music creation. Let your creativity flow and bring your
          musical vision to life!
        </Typography>
      </Box>

      <Box>
        <img
          src={FileUpload}
          alt="Upload"
          style={{
            width: "100%",
            height: "auto",
            // display: "flex",
            alignItems: "center",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            marginBottom: "7px",
            marginTop: "-20px",
            WebkitBackgroundClip: "text",
            fontWeight: "bold",
            textAlign: "center",
            color: " black",
            fontFamily: "Times New Roman",
          }}
        >
          Type a prompt to get started
        </Typography>
      </Box>
    </Box>
  );
};
const AudioPlayer = ({ audioUrl, prompt }) => {
  const CoverImage = styled("div")({
    width: 100,
    height: 100,
    objectFit: "cover",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.08)",
    "& > img": {
      width: "100%",
    },
  });

  const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  const theme = useTheme();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [position, setPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [mute, setMute] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) {
        setProgress(audio.currentTime);
        if (audio.currentTime > 29) {
          setPlaying(false);
          setPosition(0);
        }
        setPosition(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio) {
        setTotalDuration(30);
      }
    };

    const handlePlay = () => {
      if (audio) {
        setTotalDuration(30);
      }
    };

    const handleEnded = () => {
      setPlaying(false);
      setPosition(0); // Reset position to 0 when audio ends
    };

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const skipTime = (amount) => {
    audioRef.current.currentTime += amount;
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue;
  };

  const toggleMute = () => {
    setMute(!mute);
    audioRef.current.volume = mute ? volume : 0;
  };

  function formatDuration(value) {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  function truncatePrompt(text, wordLimit) {
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: "10px",
          background: "linear-gradient(45deg, #DDF3F5 30%, #A6DCEF 90%)",
          boxShadow: 3,
        }}
      >
        <audio ref={audioRef} src={audioUrl} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <CoverImage>
            <img
              src={FileUpload}
              alt="Upload"
              style={{
                width: "85%",
                height: "auto",
                // display: "flex",
                alignItems: "center",
              }}
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
              fontSize="14px"
            >
              Ai generated music
            </Typography>

            <Typography noWrap letterSpacing={-0.25}>
              {truncatePrompt(prompt, 5)}
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={totalDuration}
          onChange={(_, value) => {
            setPosition(value);
            audioRef.current.currentTime = value;
          }}
          sx={{
            color: "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(totalDuration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song" onClick={() => skipTime(-5)}>
            <FastRewindRounded fontSize="large" htmlColor="#000" />
          </IconButton>
          <IconButton
            aria-label={playing ? "play" : "paue"}
            onClick={togglePlayPause}
          >
            {playing ? (
              <PauseRounded sx={{ fontSize: "3rem" }} htmlColor="#000" />
            ) : (
              <PlayArrowRounded sx={{ fontSize: "3rem" }} htmlColor="#000" />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={() => skipTime(5)}>
            <FastForwardRounded fontSize="large" htmlColor="#000" />
          </IconButton>
        </Box>
        <Stack
          //   spacing={0}

          direction="row"
          sx={{ mb: 1, px: 0 }}
          alignItems="center"
          justifyContent={"center"}
        >
          <Slider
            aria-label="Volume"
            defaultValue={1}
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.01}
            sx={{
              width: 200,
              mx: 2,
              color: "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&::before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <IconButton aria-label="mute" onClick={toggleMute}>
            {mute ? (
              <VolumeMuteRounded htmlColor="#000" />
            ) : volume === 0 ? (
              <VolumeDownRounded htmlColor="#000" />
            ) : (
              <VolumeUpRounded htmlColor="#000" />
            )}
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
};
export default TextToAudio;
