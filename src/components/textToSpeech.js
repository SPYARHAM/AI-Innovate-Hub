import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Slider,
  IconButton,
} from "@mui/material";
import { Box, Container, Stack, display } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import { Global, useTheme } from "@emotion/react";
import styled from "styled-components";
import { VolumeMuteRounded } from "@mui/icons-material";
import MagicWandIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUpload from "../assets/convert megaphone.svg";
import { saveAs } from "file-saver";
import TextToSpeechImg from "../assets/Audiobook-bro.svg";
import SpeechToTextImg from "../assets/Speech to text-rafiki.svg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SpeechToTextImgFile from "../assets/Audiobook-amico.svg";

const bgstyle = {
  animation:
    "slide 3s ease-in-out infinite alternate, colorChange 10s ease-in-out infinite",
  backgroundImage: "linear-gradient(-60deg, #FFD5E5 50%, #FFFFDD 50%)",
  bottom: "0",
  left: "-50%",
  opacity: ".5",
  position: "fixed",
  right: "-50%",
  top: "0",
  zIndex: "-1",
};

const bgstyle2 = {
  animationDirection: "alternate-reverse",
  animationDuration: "4s",
};

const bgstyle3 = {
  animationDuration: "5s",
};

const svgStyles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: "-1",
};

const GlobalStyles = () => (
  <Global
    styles={`
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes scale {
        0% { transform: scale(1); }
        100% { transform: scale(1.2); }
      }

      @keyframes slide {
        0% { transform: translateX(-25%); }
        100% { transform: translateX(25%); }
      }

      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }

      @keyframes colorChange {
        0% { background-color: #FF90BC; }
        50% { background-color: #8ACDD7; }
        100% { background-color: #FF90BC; }
      }
      
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        overflow-x: hidden;
        background-color: #fee440;
      }
    `}
  />
);

const TextToSpeech = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [click, setClick] = useState(true);

  const handleTextToSpeech = () => {
    setClick(true);
    setSelectedButton("textToSpeech");
  };

  const handleSpeechToText = () => {
    setClick(false);
    setSelectedButton("speechToText");
  };

  return (
    <>
      <GlobalStyles />
      <Box sx={svgStyles}>
        <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 50">
          <defs></defs>

          <path
            fill="#E1AFD1"
            className="in-top"
            d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
          />
          <path
            fill="#AD88C6"
            className="out-bottom"
            d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
          />
          <path
            fill="#FFE6E6"
            className="in-bottom"
            d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
          />
        </svg>
      </Box>
      <Box sx={[bgstyle]}></Box>
      <Box sx={[bgstyle, bgstyle2]}></Box>
      <Box sx={[bgstyle, bgstyle3]}></Box>
      <Container maxWidth="xl" padding="0px">
        <Grid container justifyContent="center">
          {click ? <IntroductionText /> : <IntroductionSpeech />}
          <Grid
            item
            xs={12}
            md={click ? 9 : 12}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              // border: "1px solid black",
              marginTop: "20px",
              padding: "20px",
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={handleTextToSpeech}
              variant={
                selectedButton === "textToSpeech" ? "contained" : "outlined"
              }
              sx={{
                backgroundColor:
                  selectedButton === "textToSpeech" ? "#1976D2" : "transparent",
                color:
                  selectedButton === "textToSpeech" ? "#FFFFFF" : "#1976D2",
                borderColor: "#1976D2",
                "&:hover": {
                  backgroundColor:
                    selectedButton === "textToSpeech"
                      ? "#115293"
                      : "rgba(25, 118, 210, 0.08)",
                },
              }}
            >
              Text to Speech
            </Button>
            <Button
              onClick={handleSpeechToText}
              variant={
                selectedButton === "speechToText" ? "contained" : "outlined"
              }
              sx={{
                ml: 2,
                backgroundColor:
                  selectedButton === "speechToText" ? "#D32F2F" : "transparent",
                color:
                  selectedButton === "speechToText" ? "#FFFFFF" : "#D32F2F",
                borderColor: "#D32F2F",
                "&:hover": {
                  backgroundColor:
                    selectedButton === "speechToText"
                      ? "#9A0007"
                      : "rgba(211, 47, 47, 0.08)",
                },
              }}
            >
              Speech to Text
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={click ? 9 : 12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            {click ? <TextTOSpeech /> : <SpeechToText />}
          </Box>
        </Grid>
      </Container>
    </>
  );
};

const TextTOSpeech = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState("");

  const wordCount = prompt.trim().split(/\s+/).length;
  const maxWords = 1000;
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
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          md={10}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ textAlign: "center", width: "80%" }}>
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
                      borderColor: "#7468B6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7468B6",
                      boxShadow: "0 0 20px #7468B6",
                    },
                    borderRadius: "10px",
                  },
                }}
                multiline
                rows={6}
                fullWidth
                placeholder="Describe what you want the AI to generate"
                value={prompt}
                onChange={handleInputChange}
                margin="normal"
              />
            </Box>
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
            <Box sx={{ mt: 1, mb: 1.5 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateAudio}
                disabled={loading}
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
                startIcon={loading ? " " : <MagicWandIcon />}
              >
                {loading ? <CircularProgress size={24} /> : "Generate Audio"}
              </Button>
            </Box>

            {error && (
              <Typography color="error" variant="body1" gutterBottom>
                {error}
              </Typography>
            )}
            {audioUrl && <AudioPlayer audioUrl={audioUrl} prompt={prompt} />}
            <Button
              onClick={handleDownload}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                mt: 1,
              }}
            >
              Download
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
const GlassmorphismBox = styled(Box)({
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "10px",
  padding: "16px",
  color: "white",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  transition: "opacity 0.3s ease",
});
const VisuallyHiddenInput = styled("input")({
  display: "none",
});
const AnimatedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
}));

const SpeechToText = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  const handleTranscribe = async () => {
    if (audioFile) {
      await queryAudioToText(audioFile);
    } else {
      setError("Please select an audio file to upload.");
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",

          padding: "0px",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            paddingX: { xs: "20px", md: "10px" },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
              borderRadius: "10px",
              border: "1px solid black",
            }}
          >
            <Typography
              sx={{
                marginTop: "6vh",
                fontFamily: "Times New Roman",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              Upload Audio!
            </Typography>
            <Box sx={{ border: "6px dotted grey", margin: "30px" }}>
              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "Times New Roman",
                  fontWeight: "bold",
                  fontSize: "22px",
                  margin: "10px 0px 0px 30px",
                }}
              >
                Attach Audio
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "Times New Roman",
                  color: "GrayText",
                  fontSize: "16px",
                  margin: "0px 0px 20px 30px",
                }}
              >
                *Audio Type: MP3, WAV , M4A
              </Typography>
              <AnimatedBox>
                {audioUrl ? (
                  <AudioPlayer audioUrl={audioUrl} prompt={"Your Audio File"} />
                ) : (
                  <img
                    src={SpeechToTextImgFile}
                    alt="Upload"
                    style={{
                      width: "50%",
                      height: "auto",
                      // display: "flex",
                      alignItems: "center",
                    }}
                  />
                )}
              </AnimatedBox>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  fontSize: "16px",
                  marginY: "20px",
                }}
              >
                Upload file
                <VisuallyHiddenInput
                  type="file"
                  accept="audio/mp3, audio/wav ,audio/m4a"
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTranscribe}
                endIcon={<ArrowCircleRightIcon sx={{ marginLeft: "10px" }} />}
                disabled={loading}
                sx={{ marginBottom: "40px" }}
              >
                {loading ? "Processing..." : "Transcribe Audio"}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            paddingX: { xs: "20px", md: "10px" },
            backgroundColor: "#FFA8A7",
            borderRadius: "10px",
            marginY: { xs: "20px", md: "0px" },
          }}
        >
          <Box>
            {transcription && (
              <Box sx={{ marginTop: { xs: "20px", md: "0px" } }}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "Times New Roman",
                    fontWeight: "bold",
                    fontSize: "22px",
                    paddingY: "10px",
                    margin: {
                      xs: "10px 10px 10px 20px",
                      md: "10px 0px 0px 30px",
                    },
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    color: "black",
                  }}
                >
                  Transcription
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    textAlign: "left",
                    fontFamily: "Times New Roman",
                    fontWeight: "bold",
                    fontSize: "22px",
                    paddingY: "10px",
                    margin: {
                      xs: "10px 10px 10px 20px",
                      md: "10px 0px 0px 30px",
                    },
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    color: "black",
                  }}
                >
                  {transcription}
                </Typography>
              </Box>
            )}
            {error && (
              <Box>
                <Typography variant="h6" color="error">
                  Error:
                </Typography>
                <Typography>{error}</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
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
        setPosition(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio) {
        setTotalDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      if (audio) {
        setTotalDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setPlaying(false);
      setPosition(0);
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
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
              Ai generated audio
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

const IntroductionText = () => {
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
          VoiceGen: Transform Text into Natural Speech
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
          Transform your text into natural speech and experience the joy of
          instant audio creation. Let your creativity flow and bring your
          written content to life!
        </Typography>
      </Box>

      <Box>
        <img
          src={TextToSpeechImg}
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
            WebkitBackgroundClip: "text",
            fontWeight: "bold",
            textAlign: "center",
            color: " black",
            fontFamily: "Times New Roman",
          }}
        >
          Simply upload your text
        </Typography>
      </Box>
    </Box>
  );
};
const IntroductionSpeech = () => {
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
          SoundScript: Transform Speech into Text
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
          Transform your speech into accurate text and experience the joy of
          instant transcription. Let your productivity soar and bring your
          spoken words to life!
        </Typography>
      </Box>

      <Box>
        <img
          src={SpeechToTextImg}
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
            WebkitBackgroundClip: "text",
            fontWeight: "bold",
            textAlign: "center",
            color: " black",
            fontFamily: "Times New Roman",
          }}
        >
          Simply upload your audio file
        </Typography>
      </Box>
    </Box>
  );
};

export default TextToSpeech;
