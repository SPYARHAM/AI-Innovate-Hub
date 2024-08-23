import { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Container,
  keyframes,
  Skeleton,
} from "@mui/material";
import { Delete as DeleteIcon, Send as SendIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import useGemini from "../hooks/useGemini";
import PropTypes from "prop-types";
import FileUpload from "../assets/chatting with chatbot.svg";
import { Global, css } from "@emotion/react";
import styled from "styled-components";
const bgstyle = {
  animation:
    "scale 5s ease-in-out infinite alternate, rotate 20s linear infinite",
  backgroundImage: "linear-gradient(-60deg, #F9F3CC 50%, #D2E0FB 50%)",
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
    "slide 7s ease-in-out infinite alternate, rotate 10s linear infinite, pulse 4s ease-in-out infinite",
  animationDirection: "alternate-reverse",
  animationDuration: "4s",
  transformOrigin: "center",
};

const bgstyle3 = {
  animation:
    "rotate 15s linear infinite, moveY 10s ease-in-out infinite alternate, wave 6s ease-in-out infinite",
  animationDuration: "5s",
  transformOrigin: "center",
};

const bgstyle4 = {
  animation:
    "float 8s ease-in-out infinite, scale 12s ease-in-out infinite alternate",
  animationDuration: "8s",
  transformOrigin: "center",
};

const svgStyles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: "-1",
};

const ChatWithGemini = () => {
  const { messages, loading, sendMessages, updateMessage } = useGemini();
  const [input, setInput] = useState("");

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() =>
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    );
    return <div ref={elementRef} />;
  };

  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            overflow-x: hidden;
          }

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

          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes wave {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10%);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0%);
            }
            50% {
              transform: translateY(-15%);
            }
            100% {
              transform: translateY(0%);
            }
          }
        `}
      />
      <Box sx={svgStyles}>
        <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 0">
          <path
            fill="#756AB6"
            className="out-top"
            d="M50-10C35-15,10-20-5-10C-25,5-30,40-15,60C5,85,45,85,65,65C85,45,70,5,50-10Z"
          />
          <path
            fill="#756AB6"
            className="in-top"
            d="M35,5C25,0,5,5,-5,15C-15,35,0,55,20,60C40,65,65,50,55,30C50,20,45,10,35,5Z"
          />
          <path
            fill="#756AB6"
            className="out-bottom"
            d="M100,50C80,35,50,40,40,60C20,85,40,120,60,120C80,120,120,90,120,60C120,50,110,40,100,50Z"
          />
          <path
            fill="#756AB6"
            className="in-bottom"
            d="M90,70C75,60,50,70,40,85C30,100,50,120,70,110C90,100,100,80,90,70Z"
          />
        </svg>
      </Box>
      <Box sx={[bgstyle]}></Box>
      <Box sx={[bgstyle, bgstyle2]}></Box>
      <Box sx={[bgstyle, bgstyle3]}></Box>
      <Box sx={[bgstyle, bgstyle4]}></Box>

      <Container
        maxWidth="xl"
        sx={{
          // margin: "4px",
          // height: "100%",
          // border: "1px solid black",
          overflow: "auto",
          borderRadius: "8px",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            padding: "16px",
            display: "flex",
            // marginBottom: "50%",

            // border: "1px solid green",
            flexDirection: "column",
          }}
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <RenderMessage
                loading={loading}
                key={index + message.role}
                messageLength={messages.length}
                message={message}
                msgIndex={index}
              />
            ))
          ) : (
            <Introduction />
          )}
          <AlwaysScrollToBottom />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            justifyContent: "space-between",
            // border: "1px solid red",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Type a message"
            multiline
            rows={2}
            value={input || ""}
            sx={{
              // marginTop: "100px",
              flexGrow: 1,
              padding: "8px 14px",
              backgroundColor: "#FFC700",
              color: "black",
              "& .MuiOutlinedInput-root": {
                height: "auto",

                "&:hover fieldset": {
                  borderColor: "#D18CE0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#7468B6",
                  boxShadow: "0 0 20px #D18CE0",
                },
              },
            }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <Box sx={{ display: "flex", gap: "8px", flexDirection: "column" }}>
            <Button
              variant="contained"
              onClick={handleSend}
              endIcon={<SendIcon />}
              sx={{
                height: "40px",
                fontFamily: "Time New Roman",
                fontSize: { xs: "12px", sm: "13px", md: "15px" },
                padding: "0px",
              }}
            >
              Send
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => updateMessage([])}
              endIcon={<DeleteIcon />}
              sx={{
                height: "40px",
                color: "white",
                borderColor: "white",
                fontFamily: "Time New Roman",
                fontSize: { xs: "11px", sm: "13px", md: "15px" },
                paddingX: { xs: "8px", md: "14px" },
                // backgroundColor: "#1E90FF",
              }}
            >
              Clear Chat
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

const Introduction = () => {
  const [imageloading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const TextRenderer = (props) => {
    const { value = "", direction = "right", size = "large" } = props;
    return (
      <Typography
        sx={{
          fontSize: size,
          marginBottom: "5px",
          background: `linear-gradient(to-${direction}, #BBDEFB, #00BCD4)`,
          WebkitBackgroundClip: "text",
          fontWeight: "bold",
          textAlign: "center",
          color: " #1572A1",
        }}
      >
        {value}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        <TextRenderer
          value="SpeakEase - Your AI-Powered Chat Companion"
          size="36px"
        />
        <TextRenderer
          value="Welcome to SpeakEase! Experience seamless conversations with our AI-powered chat app designed to make communication effortless and intuitive."
          direction="left"
          size="24px"
        />
      </Box>
      <Box position="relative" alignItems="center">
        <img
          src={FileUpload}
          alt="Upload"
          style={{
            width: "85%",
            height: "auto",
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
        <TextRenderer value="Type a message to get started" size="24px" />
      </Box>
    </Box>
  );
};

const RenderMessage = ({ message, msgIndex, loading, messageLength }) => {
  const { parts, role } = message;

  const Loader = () =>
    msgIndex === messageLength - 1 &&
    loading && (
      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-start",
          paddingTop: "8px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#756AB6",
            width: "8px",
            height: "8px",

            borderRadius: "50%",
            margin: "0 2px",
          }}
        />
        <Box
          sx={{
            backgroundColor: "#756AB6",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            margin: "0 2px",
          }}
        />
        <Box
          sx={{
            backgroundColor: "#756AB6",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            margin: "0 2px",
          }}
        />
      </Box>
    );

  return parts.map((part, index) =>
    part.text ? (
      <>
        <Box
          as={motion.div}
          sx={{
            maxWidth: { xs: "80%", md: "90%" },
            width: "fit-content",
            whiteSpace: "normal",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            alignSelf: role === "user" ? "flex-end" : "flex-start",
            marginY: "8px",
            padding: "8px 16px 8px 22px",
            borderRadius: "8px",
            backgroundColor: role === "user" ? "#EE4E4E" : "#BEADFA",
            color: role === "user" ? "white" : "black",
            opacity: 0,
            fontSize: role === "user" ? "18px" : "16px",
            lineHeight: "28px",
            transform: "scale(0.5) translateY(20px)",
          }}
          animate={{ opacity: 1, transform: "scale(1) translateY(0)" }}
          key={index}
        >
          <ReactMarkdown
            key={index + part.text}
            components={{
              p: ({ node, ...props }) => (
                <Typography
                  {...props}
                  sx={{
                    fontSize: "16px",
                    lineHeight: { xs: "28px", md: "24px" },
                  }}
                />
              ),
              code: ({ node, ...props }) => (
                <pre
                  {...props}
                  sx={{
                    // fontSize: "18px",
                    fontFamily: "Times New Roman",
                    color: "white",
                    backgroundColor: "#424242",
                    borderRadius: "8px",
                    padding: "12px",
                    overflow: "auto",
                    margin: "8px",
                  }}
                />
              ),
            }}
          >
            {part.text}
          </ReactMarkdown>
        </Box>
        <Loader />
      </>
    ) : (
      <Loader key={index + part.text} />
    )
  );
};

RenderMessage.propTypes = {
  message: PropTypes.object.isRequired,
  msgIndex: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  messageLength: PropTypes.number.isRequired,
};

export default ChatWithGemini;
