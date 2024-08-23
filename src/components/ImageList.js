import React from "react";
import { Grid, Box, IconButton, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import Mountain from "../assets/Images/A breathtaking mountain landscape with snow-capped peaks, glowing golden under the first light of dawn. A crystal-clear lake at the base reflecting the vibrant colors of the sky, .png";
// import { Description } from "@mui/icons-material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Woman from "../assets/Images/a close up of a woman with long blonde hair, pale skin curly blond hair, julia garner, curly blonde hair | d & d, soft portrait shot 8 k, yelena belova, infp young woman, medium portrait soft light, with pale skin, 50mm portrait,.png";
import hummingBird from "../assets/Images/A delicate hummingbird hovering in mid-air, its wings a blur as it sips nectar from vibrant flowers. The bird's iridescent feathers and the vivid colors of the flowers create a stunning contrast. Ultra-realistic, high-quality, .png";
import SunFlower from "../assets/Images/Vibrant Sunflower Field at Sunrise.png";
import forest from "../assets/Images/A picturesque forest path .png";
import Pizza from "../assets/Images/Classic Margherita Pizza.png";
import Cake from "../assets/Images/Decadent Chocolate Lava Cake.png";
import Sunset from "../assets/Images/Desert Oasis at Sunset.png";
import Meadow from "../assets/Images/Enchanted Meadow Under the Moonlight.png";
import Flowring from "../assets/Images/Flowering Cherry Blossom Grove  .png";
import HummingBird from "../assets/Images/Gentle Hummingbird Hovering by Flowers.png";
import honeybee from "../assets/Images/Very large honey bee, on a huge sunflower, high definition, realistic bee, rain drops, sparkling, reflection sunlight, large drops hanging, dripping from flower and leaves      .png";
import redFox from "../assets/Images/Hyper-realistic image of a red fox in a snowy forest, its fur contrasted against the white snow, with keen eyes and a soft glow of twilight..png";
import Rainforest from "../assets/Images/Lush Rainforest with Exotic Wildlife 3.png";
import Elepahant from "../assets/Images/Majestic Elephant Family on the Savanna 1.png";
import Burger from "../assets/Images/Mouthwatering Burger with Fries.png";
import NorthernLight from "../assets/Images/Northern Lights Over a Snowy Landscape  .png";
import SeasideCliffs from "../assets/Images/Rocky Seaside Cliffs with Waves Crashing.png";
import Waterfall from "../assets/Images/Serene Forest Waterfall 1.png";
import Eagle from "../assets/Images/Soaring Eagle Over Mountains.png";
import muscleCar from "../assets/Images/Ultra-high-definition image of a classic muscle car, chrome details gleaming, parked under a streetlight at dusk..png";

const itemData = [
  {
    img: Mountain,
    title: "Majestic Mountain Landscape at Sunrise",
    author: "@bkristastucchio",
    checked: true,
    orientation: "vertical",
    description:
      "A breathtaking mountain landscape with snow-capped peaks, glowing golden under the first light of dawn. A crystal-clear lake at the base reflecting the vibrant colors of the sky, surrounded by lush green pine forests and wildflowers in full bloom. Ultra-realistic, high-quality, sharp focus, cinematic lighting.",
  },
  {
    img: Woman,
    title: "Enchanting Elegance",
    author: "@rollelflex_graphy726",
    orientation: "horizontal",
    description:
      "A close up of a woman with long blonde hair, pale skin curly blond hair, julia garner, curly blonde hair | d & d, soft portrait shot 8 k, yelena belova, infp young woman, medium portrait soft light, with pale skin, 50mm portrait, a girl with blonde hair, pale glowing skin, natural soft pale skin, color portrait",
  },
  {
    img: SunFlower,
    title: "Vibrant Sunflower Field at Sunrise",
    author: "@helloimnik",

    orientation: "vertical",
    description:
      "Exquisite depiction of a vibrant sunflower field at sunrise, with golden petals illuminated by the first light, dew-covered leaves glistening, and a backdrop of a soft pink and orange sky, creating a breathtakingly beautiful scene.",
  },
  {
    img: NorthernLight,
    title: "Northern Lights Over a Snowy Landscape",
    author: "@nolanissac",
    checked: true,
    orientation: "horizontal",
    description:
      "A breathtaking display of the Northern Lights over a pristine snowy landscape. The auroras dance across the sky in vibrant greens, purples, and pinks, reflecting off the snow-covered ground and frozen lake. Ultra-realistic, high-quality, sharp focus, ethereal lighting.",
  },
  {
    img: SeasideCliffs,
    title: "Rocky Seaside Cliffs with Waves Crashing",
    author: "@hjrc33",
    checked: true,
    orientation: "horizontal",
    description:
      "Dramatic rocky cliffs by the seaside, with powerful waves crashing against them, sending up plumes of white spray. Seagulls soar above, and the sky is a brilliant blue with a few wispy clouds. Ultra-realistic, high-quality, sharp focus, detailed water and rock textures.",
  },
  {
    img: Pizza,
    title: "Classic Margherita Pizza",
    author: "@southside_customs",
    orientation: "vertical",
    description:
      "A perfectly baked Margherita pizza with a golden, crispy crust, topped with fresh mozzarella cheese, vibrant tomato sauce, and aromatic basil leaves. The cheese is melted to perfection, with a slight char on the edges. Ultra-realistic, high-quality, sharp focus, enticing aroma",
  },
  {
    img: Rainforest,
    title: "Lush Rainforest with Exotic Wildlife",
    author: "@tjdragotta",
    checked: true,
    orientation: "vertical",
    description:
      "A dense, vibrant rainforest teeming with life. Exotic birds with colorful plumage perched on branches, while a river meanders through the forest floor, reflecting the emerald green canopy. The air is thick with humidity and the sounds of nature. Ultra-realistic, high-quality, sharp focus, rich biodiversity.",
  },
  {
    img: forest,
    title: "Golden Autumn Forest Path",
    author: "@katie_wasserman",
    orientation: "vertical",
    description:
      "A picturesque forest path covered in golden autumn leaves, leading into a dense grove of trees in various shades of red, orange, and yellow. The dappled sunlight filtering through the canopy creates a warm, inviting glow. Ultra-realistic, high-quality, sharp focus, vibrant autumn colors",
  },
  {
    img: Meadow,
    title: "Enchanted Meadow Under the Moonlight",
    author: "@shelleypauls",
    orientation: "vertical",
    description:
      "A tranquil meadow bathed in the soft, silvery light of a full moon. Wildflowers of various colors swaying gently in the night breeze, with fireflies adding a touch of magic. The distant silhouette of a forest outlines the horizon. Ultra-realistic, high-quality, sharp focus, dreamy atmosphere",
  },
  {
    img: Flowring,
    title: "Flowering Cherry Blossom Grove",
    author: "@silverdalex",
    orientation: "horizontal",
    description:
      "A grove of cherry blossom trees in full bloom, with delicate pink petals falling gently to the ground. A stone path winds through the grove, leading to a traditional Japanese tea house. The air is filled with the sweet fragrance of blossoms. Ultra-realistic, high-quality, bright colors, detailed blossoms.",
  },
  {
    img: HummingBird,
    title: "Gentle Hummingbird Hovering by Flowers",
    author: "@shelleypauls",
    orientation: "vertical",
    description:
      "A delicate hummingbird hovering in mid-air, its wings a blur as it sips nectar from vibrant flowers. The bird's iridescent feathers and the vivid colors of the flowers create a stunning contrast. Ultra-realistic, high-quality, sharp focus, serene atmosphere.",
  },
  {
    img: honeybee,
    title: "Sunlit Honey Bee",
    author: "@peterlaster",
    orientation: "vertical",
    description:
      "Very large honey bee, on a huge sunflower, high definition, realistic bee, rain drops, sparkling, reflection sunlight, large drops hanging, dripping from flower and leaves",
  },
  {
    img: Sunset,
    title: "Desert Oasis at Sunset",
    author: "@arwinneil",
    checked: true,
    orientation: "vertical",
    description:
      "A serene desert oasis surrounded by tall, swaying palm trees and golden sand dunes. The setting sun casts a warm, golden glow over the scene, and the oasis' clear blue waters create a stark contrast to the arid landscape. Ultra-realistic, high-quality, sharp focus, dramatic sunset lighting.",
  },
  {
    img: Cake,
    title: "Decadent Chocolate Lava Cake",
    author: "@tjdragotta",
    checked: true,
    // orientation: "vertical",
    orientation: "horizontal",
    description:
      "A rich, gooey chocolate lava cake with molten chocolate oozing out, served with a scoop of vanilla ice cream topped with fresh mint leaves. The warm cake contrasts with the cold, creamy ice cream, making it an irresistible dessert. Ultra-realistic, high-quality, sharp focus, mouthwatering textures.",
  },
  {
    img: Elepahant,
    title: "Majestic Elephant Family on the Savanna",
    author: "@katie_wasserman",
    orientation: "vertical",
    description:
      "A majestic elephant family walking across the African savanna at sunset, with the golden light casting long shadows and highlighting the elephants' textured skin. The baby elephant playfully follows its mother. Ultra-realistic, high-quality, sharp focus, warm colors.",
  },

  {
    img: Burger,
    title: "Mouthwatering Burger with Fries",
    author: "@southside_customs",
    orientation: "vertical",
    description:
      "A juicy, gourmet burger with a perfectly grilled beef patty, topped with melted cheddar cheese, crispy bacon, fresh lettuce, ripe tomato slices, and a dollop of tangy sauce. Served with a side of golden, crispy French fries. Ultra-realistic, high-quality, sharp focus, delectable details.",
  },
  {
    img: hummingBird,
    title: "Gentle Hummingbird Hovering by Flowers",
    author: "@tjdragotta",
    checked: true,
    orientation: "vertical",
    description:
      "A delicate hummingbird hovering in mid-air, its wings a blur as it sips nectar from vibrant flowers. The bird's iridescent feathers and the vivid colors of the flowers create a stunning contrast. Ultra-realistic, high-quality, sharp focus, serene atmosphere",
  },
  {
    img: Waterfall,
    title: "Serene Forest Waterfall",
    author: "@katie_wasserman",
    orientation: "vertical",
    description:
      "A serene forest with a cascading waterfall, surrounded by ancient trees and dense foliage. The sunlight filtering through the canopy creates a magical interplay of light and shadow on the moss-covered rocks and the sparkling water. Ultra-realistic, high-quality, bright colors, detailed textures.",
  },
  {
    img: redFox,
    title: "The Red Fox in a Snowy Wonderland",
    author: "@shelleypauls",
    orientation: "vertical",
    description:
      "Create a hyper-realistic image of a red fox standing gracefully in a snowy forest. The fox's rich, reddish fur should starkly contrast with the pristine, white snow. Capture the keen, alert eyes of the fox, reflecting the soft, ambient glow of twilight that gently illuminates its surroundings. The scene should evoke a sense of serene beauty and quiet majesty, with delicate details of the snow-covered trees and subtle hints of fading daylight.",
  },
  {
    img: Eagle,
    title: "Soaring Eagle Over Mountains",
    author: "@nolanissac",
    checked: true,
    orientation: "horizontal",
    description:
      "Ultra-detailed image of an eagle soaring above a mountain range at dawn, with feathers catching the early sunlight, a vast landscape below, and a sense of freedom and majesty in its flight, capturing the essence of the wild.",
  },
  {
    img: muscleCar,
    title: "Classic Muscle Car",
    author: "@hjrc33",
    checked: true,
    orientation: "horizontal",
    description:
      "Ultra-high-definition image of a classic muscle car with chrome details gleaming, parked under a streetlight at dusk. The scene captures the car’s polished surface reflecting the soft, ambient light of the streetlamp. The background features a dimly lit street, with shadows adding depth and emphasizing the car’s powerful, vintage design. The image should evoke a sense of nostalgia and sophistication, highlighting the intricate chrome work and the car’s iconic stance.",
  },
];

export default function CustomImageGallery() {
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
  const is1800 = useMediaQuery("(min-width:1800px)");
  const is1500 = useMediaQuery("(min-width:1500px)");
  const is1200 = useMediaQuery("(min-width:1200px)");
  const is900 = useMediaQuery("(min-width:900px)");
  const is600 = useMediaQuery("(min-width:600px)");
  const is100 = useMediaQuery("(min-width:100px)");

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "auto",
        height: "auto",
        overflow: "hidden",
        padding: 0,
        margin: 0,
      }}
    >
      {itemData.map((item, index) => (
        <Grid
          item
          key={index}
          xs={6}
          sm={item.orientation === "vertical" ? 3 : 6}
          lg={item.orientation === "vertical" ? 3 : 6}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px",
            "&:hover": {
              "& .image": {
                filter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.1)",
                // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                // backdropFilter: "blur(10px)",
              },
              "& .description": {
                opacity: 1,
              },
            },
          }}
        >
          <Box
            className="image"
            component="img"
            src={item.img}
            alt={item.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
              transition: "filter 0.3s ease",
            }}
          />
          <Box
            className="description"
            sx={{
              position: "absolute",
              top: 20,
              left: 0,
              right: 0,
              opacity: 0,
              color: "white",
              fontSize: { xs: "14px", md: "16px" },
              fontFamily: "Times New Roman",
              paddingLeft: "22px",
              transition: "opacity 0.3s ease",
            }}
          >
            <IconButton
              sx={{ color: "white" }}
              aria-label={`star ${item.title}`}
            >
              <StarBorderIcon />
            </IconButton>
            {item.title}
          </Box>
          <Box
            className="description"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              fontSize: { xs: "15px", md: "17px" },
              letterSpacing: "0.5px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              color: "white",
              padding: "10px 22px",
              fontFamily: "Times New Roman",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {item.description &&
              (is1200
                ? item.description
                : is900
                ? item.description.slice(0, 100) + "..."
                : is600
                ? item.description.slice(0, 60) + "..."
                : is100
                ? item.description.slice(0, 40) + "..."
                : item.description)}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
