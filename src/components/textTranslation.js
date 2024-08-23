import { useEffect, useRef, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Container,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { Delete as DeleteIcon, Send as SendIcon } from "@mui/icons-material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import FileUpload from "../assets/convert megaphone.svg";

// Service for interacting with the Google Generative AI API
const GeminiService = (function () {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const service = {};

  service.uploadImage = async function (file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]); // Get only the Base64 part
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return service;
})();

function useGemini() {
  const [messages, updateMessages] = useState(checkForMessages());
  const [loading, setLoading] = useState(false);

  function checkForMessages() {
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  }

  const sendMessages = async (payload) => {
    updateMessages((prevMessages) => [
      ...prevMessages,
      { role: "model", parts: [{ text: "" }] },
    ]);
    setLoading(true);
    try {
      const stream = await GeminiService.sendMessages(
        payload.message,
        payload.history
      );
      setLoading(false);
      for await (const chunk of stream) {
        const chunkText = await chunk.text();
        updateMessages((prevMessages) => {
          const prevMessageClone = structuredClone(prevMessages);
          prevMessageClone[prevMessages.length - 1].parts[0].text += chunkText;
          return prevMessageClone;
        });
      }
    } catch (error) {
      updateMessages([
        ...messages,
        {
          role: "model",
          parts: [
            {
              text: "Seems like I'm having trouble connecting to the server. Please try again later.",
            },
          ],
        },
      ]);
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessages, updateMessages };
}

// Main component
const ChatWithGemini = () => {
  const { messages, loading, sendMessages, updateMessages } = useGemini();
  const [input, setInput] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [asking, setAsking] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      setFileName(file.name);
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (PNG, JPG, JPEG)");
    }
  };

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const handleSend = async () => {
    if (!input) return;

    setInput("");
    const fileInputEl = document.querySelector("input[type=file]");
    if (!fileInputEl.files.length) {
      alert("Please select a file!");
      return;
    }
    const file = fileInputEl.files[0];

    setImageLoading(true);
    const resultText = await processImage(file);
    setResult(resultText);
    setImageLoading(false);

    const newMessage = { role: "user", parts: [{ text: input }] };

    const resultMessage = { role: "system", parts: [{ text: resultText }] };

    updateMessages((prevMessages) => {
      const filteredMessages = prevMessages.filter(
        (message) => message.role !== "system"
      );

      return [...filteredMessages, newMessage, resultMessage];
    });

    sendMessages({ message: input, history: [...messages, newMessage] });

    setFileUrl("");
    console.log(resultText, "Result");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
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
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Type a message"
          value={input || ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 0px",
                  }}
                >
                  <IconButton component="label">
                    <input type="file" hidden onChange={handleFileChange} />
                    <PhotoCamera />
                  </IconButton>
                  {fileUrl && (
                    <Avatar
                      src={fileUrl}
                      alt="Selected Image"
                      sx={{
                        height: "auto",
                        marginLeft: 1,
                        marginRight: 1,
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
            padding: "14px 14px",
            backgroundColor: "#FFC700",
            color: "black",
            "& .MuiInputBase-input": {
              color: "black",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "black",
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
            sx={{ height: "40px" }}
          >
            Send
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => updateMessages([])}
            endIcon={<DeleteIcon />}
            sx={{
              height: "40px",
              color: "white",
              borderColor: "white",
            }}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const Introduction = () => {
  const TextRenderer = (props) => {
    const { value = "", direction = "right", size = "large" } = props;
    return (
      <Typography
        variant={size}
        sx={{
          backgroundColor: "#FFC700",
          color: "black",
          borderRadius: "12px",
          padding: "12px 16px",
          alignSelf: direction === "left" ? "flex-start" : "flex-end",
          width: "auto",
        }}
      >
        {value}
      </Typography>
    );
  };

  TextRenderer.propTypes = {
    value: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["left", "right"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
  };

  TextRenderer.defaultProps = {
    direction: "right",
    size: "large",
  };

  return (
    <Box
      sx={{
        margin: "24px 0",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <motion.img
        src={FileUpload}
        alt="Upload a file"
        width={200}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      />
      <TextRenderer value="Welcome to SnapTalk!" direction="left" />
      <TextRenderer
        value="Upload an image and type a message to get started."
        direction="left"
        size="medium"
      />
    </Box>
  );
};

const RenderMessage = (props) => {
  const { message = {}, msgIndex = 0, messageLength = 1 } = props;

  return (
    <Box
      sx={{
        margin: "4px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          borderRadius: "12px",
          padding: "12px 16px",
          alignSelf: message.role === "user" ? "flex-end" : "flex-start",
          width: "auto",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            backgroundColor: "#FFC700",
            color: "black",
            borderRadius: "12px",
            padding: "12px 16px",
          }}
        >
          <ReactMarkdown>
            {message.parts.map((part) => part.text).join(" ")}
          </ReactMarkdown>
        </Typography>
      </Box>
    </Box>
  );
};

RenderMessage.propTypes = {
  message: PropTypes.object.isRequired,
  msgIndex: PropTypes.number.isRequired,
  messageLength: PropTypes.number.isRequired,
};

export default ChatWithGemini;
