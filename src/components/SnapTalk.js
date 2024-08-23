import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Global, css } from "@emotion/react";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  keyframes,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUpload from "../assets/Image upload-cuate 2.svg";
// import UploadingIcon from "../Images/Cloud storage with files and photos.svg";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import backgroundSVG from "../assets/Background 1.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/system";

const bgstyle = {
  animation:
    "scale 5s ease-in-out infinite alternate, rotate 20s linear infinite",
  backgroundImage: "linear-gradient(-60deg, #BEC6A0 50%, #FEF3E2 50%)",
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
    "rotate 15s linear infinite, moveY 10s ease-in-out infinite alternate",
  animationDuration: "5s",
  transformOrigin: "center",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
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
function SnapTalk() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [prompt, setPrompt] = useState("");

  const maxWords = 100;
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
  const handleUploadAgain = () => {
    setFileUrl("");
    setFileName("");
    setAsking(false);
    setUploading(true);
  };

  const handleInputChange = (e) => {
    const newPrompt = e.target.value;
    const wordCount = newPrompt.trim().split(/\s+/).length;
    if (wordCount <= maxWords) {
      setPrompt(newPrompt);
    }
  };
  const wordCount = prompt.trim().split(/\s+/).length;
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

  async function handleProcessImage() {
    setResult("");
    const fileInputEl = document.querySelector("input[type=file]");
    if (!fileInputEl.files.length) {
      alert("Please select a file!");
      return;
    }
    const file = fileInputEl.files[0];

    setLoading(true);
    const resultText = await processImage(file);
    setAsking(true);
    setResult(resultText);
    setLoading(false);
  }
  const BackgroundSVG = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${backgroundSVG});
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1; /* Adjust opacity for background effect */
    // z-index: -1;
  `;

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
      <Container maxWidth="xl">
        <Box
          sx={{
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
              <Typography
                //   variant="h2"
                sx={{
                  fontFamily: "Times New Roman",
                  fontWeight: "bold",
                  marginTop: "40px",
                  marginBottom: "20px",
                  paddingX: "20px",

                  fontSize: {
                    xs: "30px",
                    sm: "37px",
                    md: "42px",
                    lg: "50px",
                    xl: "55px",
                  },
                  textAlign: "center",
                }}
              >
                SnapTalk: Your Gateway to Instant Image Insights and
                Conversations
              </Typography>
            </Grid>
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
                  File Upload!
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
                    Attach File
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
                    *File Type : PNG, JPG , JPEG
                  </Typography>
                  <AnimatedBox>
                    {fileUrl ? (
                      <img
                        src={fileUrl}
                        alt="Uploading"
                        style={{
                          width: "50%",
                          height: "auto",
                        }}
                      />
                    ) : (
                      <img
                        src={FileUpload}
                        alt="Upload"
                        style={{
                          width: "50%",
                          height: "auto",
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
                    onClick={fileName ? handleUploadAgain : undefined}
                  >
                    {fileName ? "Upload Again" : "Upload file"}
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileChange}
                      onClick={fileName ? handleUploadAgain : undefined}
                    />
                  </Button>
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      paddingX: "50px ",
                      marginBottom: "10px",
                    }}
                  >
                    <TextField
                      sx={{
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-root": {
                          height: "auto",

                          "&:hover fieldset": {
                            borderColor: "#708871",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#708871",
                            boxShadow: "0 0 35px #708871",
                          },
                          borderRadius: "10px",
                        },
                      }}
                      multiline
                      rows={2}
                      fullWidth
                      placeholder="Describe what you want to extract"
                      value={prompt}
                      onChange={handleInputChange}
                      margin="normal"
                    />
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
                  </Box>

                  <Button
                    variant="contained"
                    color={asking ? "success" : "error"}
                    onClick={handleProcessImage}
                    endIcon={
                      <ArrowCircleRightIcon sx={{ marginLeft: "10px" }} />
                    }
                    disabled={loading}
                    sx={{ marginBottom: "40px" }}
                  >
                    {loading ? "Processing..." : "Process Image"}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingX: "10px",
                backgroundColor: "#708871",
                borderRadius: "10px",
                marginY: { xs: "20px", md: "0px" },
                // paddingRight: "10px",
              }}
            >
              {result && (
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
                    color: "whitesmoke",
                  }}
                >
                  Result: {result}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default SnapTalk;
