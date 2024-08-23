import { Grid, Slider, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import FileUpload from "../assets/Headphone-amico.svg";
import { IconButton } from "@mui/material";

import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import { VolumeMuteRounded } from "@mui/icons-material";
import Songs1 from "../assets/Audio/ Gentle Bollywood Strings.wav";
import Songs2 from "../assets/Audio/generated_audio.wav";
const songData = [
  {
    id: 1,
    songPath: Songs1,
    title: "Tranquil Morning Melody",
  },
  {
    id: 2,
    songPath: Songs2,
    title: "Serene Sunset Symphony",
  },

  {
    id: 3,
    songPath: Songs1,
    title: "Serene Sunset Symphony",
  },
];
const SongsList = () => {
  return (
    <>
      {songData.map((index) => (
        <Grid item xs={12} md={4}>
          <AudioPlayer audioUrl={index.songPath} prompt={index.title} />
        </Grid>
      ))}
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

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [position, setPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(29);
  const [mute, setMute] = useState(false);
  const [shareLink, setShareLink] = useState("");

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
export default SongsList;
