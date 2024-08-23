import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";

import { Global } from "@emotion/react";
import FileUpload from "../assets/Creative team-cuate blue.svg";
import { IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MagicWandIcon from "@mui/icons-material/AutoFixHigh";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import styled, { keyframes } from "styled-components";
import ImageList from "./ImageList";
import Loading from "../assets/Processing-cuate.svg";
import ideaBox from "../assets/laptop on top of abstract figures.svg";

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
const bgstyle = {
  animation: "slide 3s ease-in-out infinite alternate",

  backgroundImage: "linear-gradient(-60deg, #FF90BC 50%, #8ACDD7 50%)",
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

const examplePrompts = [
  "Cinematic landscape, golden hour, rolling hills, dramatic clouds, vibrant colors, ultra-high definition, photorealistic detail, shot with Canon EOS R5, breathtaking scenery",
  "Close-up portrait, young woman, glowing skin, natural sunlight, intricate details, sharp focus, stunning eyes, professional photography, high-quality lens, David Lazar style",
  "Ultra-realistic cityscape, bustling metropolis, neon lights, vibrant nightlife, dynamic composition, high contrast, Sony Alpha A7R IV, cinematic atmosphere",
  "Detailed macro shot, dew on a spiderweb, morning light, crystal clear droplets, vibrant colors, high resolution, ultra-sharp focus, nature's intricate beauty",
  "Epic mountain range, sunrise, misty valleys, sharp peaks, vivid colors, panoramic view, ultra-high quality, captured with Nikon D850, awe-inspiring natural beauty",
  "Studio portrait, elderly woman, expressive eyes, soft lighting, detailed wrinkles, high-definition, photorealistic quality, black and white, timeless elegance",
  "Surreal underwater scene, colorful coral reef, vibrant marine life, crystal clear water, high detail, ultra-realistic, vivid colors, captured with GoPro Hero9",
  "Majestic forest, autumn colors, sunlight filtering through trees, sharp details, vibrant hues, high-resolution image, Nikon Z7 II, serene and captivating",
  "Professional studio shot, model in haute couture, dramatic lighting, sharp focus, vibrant colors, high-definition, fashion photography, cinematic appeal",
  "Sunset over the ocean, golden reflections, calm waves, detailed horizon, vibrant colors, ultra-high quality, captured with Sony A7S III, serene beauty",
  "Majestic lion basking in golden sunlight, intricate mane detail, piercing amber eyes, photorealistic, ultra-high definition, rich textures, vibrant savannah backdrop, regal and powerful aura.",
  "Ethereal forest scene, dappled sunlight filtering through ancient trees, whimsical fairy lights, vibrant flora, ultra-realistic, sharp focus, immersive depth, enchanted woodland ambiance.",
  "Cinematic cityscape at dusk, neon reflections in rain-soaked streets, bustling urban life, ultra-realistic, high definition, rich color contrasts, dynamic movement, futuristic vibe.",
  "Exquisite close-up of blooming cherry blossoms, delicate petals, intricate textures, ultra-sharp focus, vibrant pink hues, serene garden setting, photorealistic, tranquil atmosphere.",
  "Vintage 1950s diner scene, chrome accents, vibrant red booths, ultra-realistic, high definition, sharp focus, nostalgic ambiance, bustling with lively characters, rich color palette.",
  "Serene mountain lake at sunrise, crystal-clear reflections, ultra-high definition, sharp focus, rich natural colors, tranquil atmosphere, photorealistic, majestic mountain range backdrop.",
  "Intricate steampunk airship, detailed gears and cogs, vibrant brass and copper tones, ultra-realistic, high definition, sharp focus, dynamic aerial scene, rich textures, adventurous vibe.",
  "Lush tropical rainforest, vibrant flora and fauna, intricate details, ultra-sharp focus, photorealistic, rich green hues, immersive depth, tranquil and exotic ambiance.",
  "Eccentric Victorian library, towering bookshelves, intricate woodwork, ultra-realistic, high definition, sharp focus, warm ambient lighting, rich textures, scholarly and cozy vibe.",
  "Close-up of a vibrant butterfly on a flower, detailed wing patterns, ultra-sharp focus, photorealistic, rich color contrasts, serene garden backdrop, tranquil and delicate atmosphere.",
  "Funky urban graffiti alley, vibrant street art, ultra-realistic, high definition, sharp focus, dynamic movement, rich color palette, bustling urban life, artistic and edgy vibe.",
  "Close-up portrait, elderly man with weathered skin, detailed wrinkles, piercing blue eyes, soft natural light, Canon EOS R5, high-definition, ultra-realistic, sharp focus, David Lazar style, warm tones",
  "Sunset over a tropical beach, golden sand, crystal clear waves, palm trees swaying gently, vibrant colors, ultra-high quality, Canon 5D Mark IV, detailed clouds, cinematic, serene atmosphere, paradise vibes",
  "Macro shot of a blooming flower, vibrant petals, intricate details, morning dew, soft sunlight, ultra-sharp focus, Nikon D850, high-definition, photorealistic, nature's beauty, stunning clarity, vivid colors",
  "Epic mountain range, snow-capped peaks, morning mist, vibrant sunrise, panoramic view, ultra-high quality, Sony A7R IV, photorealistic, sharp details, dramatic clouds, breathtaking scenery, nature's majesty",
  "Dynamic cityscape at night, neon lights reflecting on wet streets, bustling crowds, high contrast, vibrant colors, Canon EOS R6, ultra-realistic, sharp focus, cinematic atmosphere, urban energy, vivid detail",
  "Studio portrait of a young woman, glowing skin, intricate makeup, soft diffused light, high-definition, ultra-realistic, sharp focus, David Lazar style, vibrant colors, Canon EOS R5, stunning beauty",
  "Surreal underwater scene, colorful coral reef, vibrant marine life, crystal clear water, high detail, ultra-realistic, vivid colors, GoPro Hero9, sharp focus, serene ambiance, aquatic wonderland",
  "Autumn forest, golden leaves, sunlight filtering through trees, detailed textures, Nikon Z7 II, ultra-high quality, sharp focus, vibrant hues, cinematic atmosphere, serene beauty, nature's palette, peaceful",
  "Studio shot of a model in haute couture, dramatic lighting, sharp focus, vibrant colors, high-definition, fashion photography, Canon EOS R5, ultra-realistic, detailed textures, cinematic appeal, glamorous",
  "Sunset over the ocean, golden reflections, calm waves, detailed horizon, vibrant colors, ultra-high quality, Sony A7S III, sharp focus, serene beauty, breathtaking view, photorealistic, natural wonder",
  "Detailed macro shot of an insect, intricate wing patterns, vibrant colors, morning dew, sharp focus, Canon 100mm macro lens, ultra-realistic, high-definition, nature's artistry, photorealistic detail",
  "Cinematic landscape, rolling hills, dramatic skies, vibrant colors, ultra-high definition, Nikon D850, sharp focus, photorealistic, golden hour, breathtaking scenery, nature's beauty, serene ambiance",
  "Portrait of an elderly woman, expressive eyes, detailed wrinkles, soft lighting, high-definition, black and white, Canon EOS R5, ultra-realistic, sharp focus, timeless elegance, photorealistic, poignant",
  "Underwater shot of a diver, vibrant coral reef, colorful fish, crystal clear water, high detail, GoPro Hero9, ultra-realistic, sharp focus, aquatic adventure, vivid colors, serene atmosphere",
  "Close-up portrait of a child, freckles, bright eyes, natural light, Canon EOS R5, high-definition, ultra-realistic, sharp focus, David Lazar style, vibrant colors, innocence, photorealistic detail",
  "Epic sunrise over a desert landscape, sand dunes, detailed textures, vibrant colors, ultra-high quality, Sony A7R IV, sharp focus, cinematic atmosphere, photorealistic, nature's beauty, serene solitude",
  "Macro shot of a butterfly on a flower, intricate wing patterns, vibrant colors, morning light, ultra-sharp focus, Nikon D850, high-definition, photorealistic, nature's detail, stunning clarity",
  "City skyline at dusk, vibrant sunset, reflective skyscrapers, detailed clouds, Canon EOS R6, ultra-high quality, sharp focus, photorealistic, cinematic atmosphere, urban beauty, breathtaking view",
  "Studio portrait of an elderly man, detailed beard, expressive eyes, soft lighting, high-definition, ultra-realistic, Canon EOS R5, sharp focus, black and white, timeless elegance, photorealistic",
  "Hyper-realistic close-up of a lion's mane, each strand meticulously detailed, golden sunlight filtering through.",
  "Ultra-sharp image of a dew-covered spiderweb, morning light creating tiny rainbows in each droplet.",
  "Cinematic portrait of an astronaut standing on Mars, red dust and rocks in high definition, Earth in the background.",
  "Vivid depiction of a bustling 1920s jazz club, musicians in sharp focus, sepia-toned background.",
  "Detailed macro shot of a butterfly's wing, each scale shimmering with iridescent colors under sunlight.",
  "Ultra-realistic night scene of a neon-lit city street, rain-soaked pavement reflecting the vibrant signs.",
  "High-definition image of an ancient tree, gnarled bark and moss-covered roots, rays of sunlight breaking through the canopy.",
  "Photorealistic portrait of a samurai in traditional armor, intricate details on the armor, intense look in his eyes.",
  "Bright, cinematic shot of a carnival at night, colorful lights, Ferris wheel in motion, sharp focus on a child eating cotton candy.",
  "Ultra-high-definition image of a classic muscle car, chrome details gleaming, parked under a streetlight at dusk.",
  "Hyper-detailed macro shot of a honeybee on a sunflower, pollen grains visible, sunlight enhancing the yellow petals.",
  "Realistic underwater scene of a coral reef, vibrant fish in sharp focus, sunlight filtering through the water surface.",
  "Cinematic close-up of a cowboy's face, weathered skin, and piercing eyes, desert landscape in the background.",
  "Ultra-sharp image of a vintage typewriter, keys in perfect focus, a sheet of paper with elegant handwriting.",
  "High-quality shot of a steaming cup of coffee, intricate latte art, and sunlit café table.",
  "Photorealistic image of a majestic eagle in flight, sharp focus on feathers, mountains in the background.",
  "Bright, vivid depiction of a bustling street market in Tokyo, colorful stalls, people in motion, neon signs overhead.",
  "Ultra-realistic close-up of a snowflake, intricate crystalline structure visible against a dark background.",
  "Detailed portrait of an elderly woman with a weathered face, traditional attire, and a warm smile, in a rustic setting.",
  "Cinematic shot of a futuristic city skyline at dusk, glowing skyscrapers, flying vehicles, and a vibrant sunset.",
  "Hyper-detailed macro image of a drop of water falling into a pool, concentric ripples, and sparkling reflections.",
  "Realistic depiction of a pirate ship in a stormy sea, sharp focus on the ship's details, dramatic waves and lightning.",
  "Ultra-high-definition image of a tiger in the jungle, piercing eyes, and sharp focus on stripes, lush greenery.",
  "Bright, vivid shot of a hot air balloon festival, colorful balloons in sharp focus against a clear blue sky.",
  "Photorealistic close-up of a musician playing a violin, intricate details on the instrument, emotional expression.",
  "Cinematic image of a lighthouse on a cliff, crashing waves below, and a dramatic, cloudy sky.",
  "High-definition shot of a snowy mountain peak, sharp details on the rugged terrain, and a clear blue sky.",
  "Ultra-realistic underwater image of a great white shark, sharp focus on the eyes and teeth, sunlight filtering through water.",
  "Hyper-detailed close-up of a rose in bloom, petals with tiny water droplets, and soft sunlight enhancing colors.",
  "Realistic image of a medieval knight in armor, intricate details on the armor, and a battlefield in the background.",
  "Cinematic shot of a sunset over a serene lake, sharp focus on the reflections, and vibrant colors in the sky.",
  "Photorealistic image of a bustling Italian street café, sharp details on the tables, and people enjoying their meals.",
  "Ultra-high-definition close-up of a peacock feather, intricate patterns, and iridescent colors under sunlight.",
  "Bright, vivid depiction of a tropical beach, crystal clear water, sharp focus on palm trees, and a vibrant sunset.",
  "Detailed portrait of an ancient samurai sword, intricate engravings on the blade, and a traditional setting.",
  "Hyper-realistic underwater image of a school of fish, sharp focus on the fish, and coral reef details.",
  "Cinematic shot of a classic steam locomotive, sharp details on the engine, and dramatic steam clouds.",
  "Ultra-sharp image of a bustling Moroccan market, colorful textiles, and spices, and people in traditional attire.",
  "High-quality close-up of an owl's face, piercing eyes, and detailed feathers, with a forest background.",
  "Realistic depiction of a snowy owl in flight, sharp focus on the wings, and a snowy landscape in the background.",
  "Cinematic shot of a futuristic robot, intricate details on the machinery, and a sci-fi cityscape in the background.",
  "Photorealistic image of a vintage camera, sharp details on the lens and body, with a rustic wooden table.",
  "Ultra-high-definition close-up of a dragonfly, intricate patterns on the wings, and a vibrant green background.",
  "Bright, vivid depiction of a bustling Indian street market, colorful stalls, and people in traditional attire.",
  "Hyper-detailed macro image of a leaf with tiny veins, sharp focus on the texture, and dewdrops.",
  "Realistic underwater scene of a jellyfish, sharp focus on the tentacles, and sunlight filtering through water.",
  "Cinematic shot of a classic car race, sharp details on the cars, and a blurred background for motion effect.",
  "Ultra-realistic close-up of a leopard in the wild, sharp focus on the eyes and spots, with a jungle backdrop.",
  "High-quality image of a historical castle, sharp details on the architecture, and a dramatic sky.",
  "Photorealistic close-up of an artist's palette, intricate details on the paint and brushes, with a studio setting.",
  "Bright, vivid depiction of a bustling street in Paris, colorful buildings, and people enjoying cafés.",
  "Hyper-detailed macro shot of a raindrop on a leaf, sharp focus on the droplet, and reflective surface.",
  "Realistic image of a majestic stag in the forest, sharp focus on the antlers, and lush greenery.",
  "Cinematic shot of a space station orbiting Earth, sharp details on the structure, and a vibrant planet backdrop.",
  "Ultra-high-definition close-up of a sunflower field, sharp details on the petals, and a clear blue sky.",
  "Photorealistic image of a chef preparing sushi, sharp focus on the ingredients, and a stylish kitchen setting.",
  "Bright, vivid depiction of a busy street in New York City, colorful signs, and people in motion.",
  "Hyper-realistic underwater image of a sea turtle, sharp focus on the shell, and a coral reef background.",
  "Realistic depiction of a Viking ship in a stormy sea, sharp details on the ship, and dramatic waves.",
  "Cinematic shot of a serene Japanese garden, sharp focus on the cherry blossoms, and a traditional teahouse.",
  "Ultra-realistic close-up of a wolf in the snow, sharp focus on the fur and eyes, with a snowy forest backdrop.",
  "High-quality image of a vintage motorcycle, sharp details on the engine, and a rustic garage setting.",
  "Photorealistic close-up of a violin, intricate details on the strings and body, with a classical music sheet.",
  "Bright, vivid depiction of a bustling Turkish market, colorful spices, and people in traditional attire.",
  "Hyper-detailed macro shot of a ladybug on a leaf, sharp focus on the spots, and a vibrant green background.",
  "Realistic underwater scene of a coral reef, sharp focus on the coral, and colorful fish swimming around.",
  "Cinematic shot of a desert landscape, sharp details on the sand dunes, and a dramatic sunset.",
  "Ultra-high-definition close-up of a butterfly on a flower, intricate patterns on the wings, and bright colors.",
  "Photorealistic image of a traditional Japanese tea ceremony, sharp focus on the utensils, and a serene setting.",
  "Bright, vivid depiction of a bustling Brazilian street carnival, colorful costumes, and people dancing.",
  "Hyper-realistic close-up of a tiger in the jungle, sharp focus on the stripes and eyes, with lush greenery.",
  "Realistic image of a majestic horse in a meadow, sharp focus on the mane, and a clear blue sky.",
  "Cinematic shot of a space shuttle launching, sharp details on the shuttle, and dramatic flames.",
  "Ultra-realistic underwater image of a dolphin, sharp focus on the body, and sunlight filtering through water.",
  "High-quality close-up of a vintage pocket watch, intricate details on the gears, and a rustic background.",
  "Photorealistic image of a bustling Italian piazza, sharp focus on the architecture, and people enjoying cafés.",
  "Bright, vivid depiction of a traditional Chinese dragon dance, colorful costumes, and people celebrating.",
  "Hyper-detailed macro shot of a snowflake, intricate crystalline structure visible against a dark background.",
  "Realistic depiction of a medieval knight in armor, intricate details on the armor, and a castle in the background.",
];
const getRandomPrompts = (num) => {
  const shuffled = examplePrompts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState(getRandomPrompts(6));
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [images, setImages] = useState([]);
  const [sliderValue, setSliderValue] = useState(1);
  const [gridImageValue, setGridImageValue] = useState(1);
  const [selectedChips, setSelectedChips] = useState([]);
  const [message, setMessage] = useState(
    "Your image is being generated. Please wait for a while..."
  );
  const [showRefresh, setShowRefresh] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      setMessage("Generating may take some time. Your patience is valuable.");
    }, 11000);

    const secondTimeout = setTimeout(() => {
      setShowRefresh(true);
    }, 22000);

    if (reset) {
      setMessage(
        "Your stunning visual is being generated. Please wait for a while..."
      );
      setShowRefresh(false);
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    }

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, [reset]);

  const handleRandomClick = () => {
    setPrompts(getRandomPrompts(6));
  };
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    console.log(sliderValue, "slider");
    if (newValue === 50) {
      setNumberOfImages(2);
    } else if (newValue === 100) {
      setNumberOfImages(4);
    } else {
      setNumberOfImages(1);
    }
    console.log(numberOfImages, "number");
  };

  const helperWords = [
    "Creative",
    "Surreal",
    "Fantasy",
    "Portrait",

    "Intricate",
    "Hyper Maximalist",
    "Elegant",
    "Beautiful",
    "Exotic",
    "Attractive",
    "Hyper Realistic",
    "Super Detailed",
  ];
  const maxWords = 600;

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

  const handleInputChange = (e) => {
    const newPrompt = e.target.value;
    const wordCount = newPrompt.trim().split(/\s+/).length;
    if (wordCount <= maxWords) {
      setPrompt(newPrompt);
    }
  };

  const handleDownload = (imageUrl) => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "generated_image.png";
      link.click();
    }
  };
  const handleRerun = () => {
    const newPrompt = prompt + "    " + "    ";
    if (wordCount <= maxWords) {
      setPrompt(newPrompt);
    }
    setImage("");
    console.log(sliderValue, "marks");
    generateImages(numberOfImages);
  };
  const wordCount = prompt.trim().split(/\s+/).length;
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 50,
      label: "2",
    },
    {
      value: 100,
      label: "4",
    },
  ];
  function valuetext(value) {
    return `${value}`;
  }

  return (
    <>
      <Box sx={svgStyles}>
        <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 100">
          <defs>
            <style>
              {`
              @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .out-top { animation: rotate 20s linear infinite; transform-origin: 13px 25px; }
              .in-top { animation: rotate 10s linear infinite; transform-origin: 13px 25px; }
              .out-bottom { animation: rotate 25s linear infinite; transform-origin: 84px 93px; }
              .in-bottom { animation: rotate 15s linear infinite; transform-origin: 84px 93px; }
            `}
            </style>
          </defs>
          <path
            fill="#7469B6"
            className="out-top"
            d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
          />
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
      <Global
        styles={`
        @keyframes slide {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(25%); }
        }
      `}
      />
      <Box sx={[bgstyle]}></Box>
      <Box sx={[bgstyle, bgstyle2]}></Box>
      <Box sx={[bgstyle, bgstyle3]}></Box>

      <Container maxWidth="xl" padding="0px">
        {images.length > 0 ? <ImageLoaded /> : <Introduction />}
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              border: "1px solid black",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                width: "90%",
              }}
            >
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
                        borderColor: "#9C27B0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#9C27B0",
                        boxShadow: "0 0 5px #9C27B0",
                      },
                      borderRadius: "10px",
                    },
                    fontSize: "16px",
                  }}
                  multiline
                  rows={8}
                  fullWidth
                  placeholder="Describe what you want the AI to draw"
                  value={prompt}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: 200 }}>
                    <Typography
                      sx={{ fontSize: "16px", fontFamily: "Times New Roman" }}
                    >
                      Images to be generated:
                    </Typography>
                    <Slider
                      value={sliderValue}
                      aria-label="Restricted values"
                      defaultValue={0}
                      getAriaValueText={valuetext}
                      step={null}
                      marks={marks}
                      onChange={handleSliderChange}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: "12px ", sm: "14px", md: "16px" },
                        fontFamily: "Times New Roman",
                      }}
                    >
                      {wordCount} / {maxWords} words
                    </Typography>
                    <IconButton onClick={() => setPrompt("")}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: 1,
                  marginBottom: 2,
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
                      selectedChips.includes(word) ? "default" : "outlined"
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
                      color: selectedChips.includes(word) ? "#fff" : "primary",
                    }}
                  />
                ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={() => generateImages(numberOfImages)}
                disabled={loading}
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
                startIcon={<MagicWandIcon />}
              >
                Generate Image
              </Button>
              <Box>
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
                    sx={{ color: "white" }}
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
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            lg={8}
            sx={{
              paddingX: "10px",
              display: "flex",
              alignItems: "center",
              marginTop: { xs: "15px", md: "0px" },
            }}
          >
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
                    width: { xs: 330, sm: 500, md: 550, lg: 600, xl: 650 },
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

                    animation:
                      "typing 3.5s steps(40, end), blink 0.75s step-end infinite alternate",
                    width: "100%",
                  }}
                >
                  {message}
                </Typography>

                {showRefresh && (
                  <Typography variant="h6" align="center" color="error">
                    If your image has not been generated yet, please refresh the
                    page to try again.
                  </Typography>
                )}
              </Box>
            )}
            {!loading && images.length > 0 && (
              <Box>
                {images.map((imageUrl, index) => (
                  <Grid
                    item
                    xs={12}
                    md={gridImageValue === 4 ? 6 : 12}
                    key={index}
                    sx={{
                      display: "inline-block",
                      // margin: 1,
                      textAlign: "center",
                    }}
                  >
                    <Box>
                      <img
                        src={imageUrl}
                        alt={`Generated ${index + 1}`}
                        width={
                          gridImageValue === 2
                            ? "40%"
                            : gridImageValue === 4
                            ? "80%"
                            : "85%"
                        }
                        height={"100%"}
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                      />
                    </Box>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDownload(imageUrl)}
                      sx={{ marginY: 1 }}
                    >
                      Download Image {index + 1}
                    </Button>
                  </Grid>
                ))}
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                    // marginBottom: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<RefreshIcon />}
                    onClick={handleRerun}
                    disabled={loading}
                  >
                    Rerun Generation
                  </Button>
                </Grid>
              </Box>
            )}
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

          <ImageList />
        </Grid>
      </Container>
    </>
  );
};
const ImageLoaded = () => {
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
              width: { xs: 330, sm: 400, md: 450, lg: 500, xl: 550 },
              height: { xs: "auto" },
              my: "10px",
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
            Your Stunning Visual
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
            Your image has been successfully generated! Enjoy the AI-crafted
            visual masterpiece below.
          </Typography>
        </Box>
      </Box>
    </>
  );
};
const TextRenderer = (props) => {
  const { value = "", direction = "right", size = "large" } = props;
  const is1800 = useMediaQuery("(min-width:1800px)");
  const is1500 = useMediaQuery("(min-width:1500px)");
  const is1200 = useMediaQuery("(min-width:1200px)");
  const is900 = useMediaQuery("(min-width:900px)");
  const is600 = useMediaQuery("(min-width:600px)");
  const is100 = useMediaQuery("(min-width:100px)");

  const fontSize = () => {
    if (is1800) {
      return size === "large" ? "60px" : "36px";
    } else if (is1500) {
      return size === "large" ? "55px" : "32px";
    } else if (is1200) {
      return size === "large" ? "48px" : "29px";
    } else if (is900) {
      return size === "large" ? "45px" : "28px";
    } else if (is600) {
      return size === "large" ? "38px" : "24px";
    } else if (is100) {
      return size === "large" ? "32px" : "20px";
    } else {
      return size === "large" ? "60px" : "36px";
    }
  };

  return (
    <Typography
      sx={{
        fontSize: fontSize(),
        marginBottom: "7px",
        background: `linear-gradient(to-${direction}, #BBDEFB, #00BCD4)`,
        WebkitBackgroundClip: "text",
        fontWeight: "bold",
        textAlign: { xs: "justify", md: "center" },
        color: "black",
        paddingX: { xs: "20px", sm: "30px", lg: "35px" },
        marginTop: "20px",
        fontFamily: "Times New Roman",
      }}
    >
      {value}
    </Typography>
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
        marginBottom: "20px",
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
          value="SnapMaster: Turn Your Imagination into Stunning Visuals"
          size="large"
        />
        <TextRenderer
          value="Dive into a world of endless possibilities and watch your prompts morph into visually stunning masterpieces, all with the effortless magic of AI."
          direction="left"
          size="small"
        />
      </Box>

      <Box position="relative" alignItems="center">
        <AnimatedBox
          component="img"
          src={FileUpload}
          alt="Logo"
          sx={{
            width: { xs: 400, sm: 500, md: 550, lg: 600, xl: 650 },
            height: { xs: "auto" },
            my: "20px",
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
        <TextRenderer value="Type a prompt to get started" size="small" />
      </Box>
    </Box>
  );
};

export default ImageGenerator;
