import React from "react";
import { Box, GlobalStyles } from "@mui/material";
import styled from "styled-components";

const bubbleCount = 50; // Number of bubbles

const BubbleComponent = () => {
  const bubbles = Array.from({ length: bubbleCount }, (_, i) => i);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -2,
      }}
    >
      <GlobalStyles
        styles={`
          @keyframes float-up {
            to {
              transform: translateY(-175vh);
            }
          }

          @keyframes sway-left-to-right {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(100%);
            }
          }

          @keyframes sway-right-to-left {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }

          .bubbles {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .bubble {
            position: absolute;
            display: block;
            border-radius: 50%;
            background: hsla(183, 94%, 76%, 0.3);
            animation: float-up var(--bubble-float-duration) var(--bubble-float-delay) ease-in infinite;

            &::before {
              position: absolute;
              content: '';
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: hsla(183, 94%, 76%, 0.3);
              border-radius: inherit;
              animation: var(--bubble-sway-type) var(--bubble-sway-duration) var(--bubble-sway-delay) ease-in-out alternate infinite;
            }
          }

          .bubble:nth-child(1) { --bubble-left-offset: 10vw; --bubble-radius: 5vw; --bubble-float-duration: 10s; --bubble-sway-duration: 5s; --bubble-float-delay: 0s; --bubble-sway-delay: 0s; --bubble-sway-type: sway-left-to-right; }
          .bubble:nth-child(2) { --bubble-left-offset: 20vw; --bubble-radius: 8vw; --bubble-float-duration: 12s; --bubble-sway-duration: 6s; --bubble-float-delay: 1s; --bubble-sway-delay: 1s; --bubble-sway-type: sway-right-to-left; }
          /* Add similar styling for all bubble elements... */
        `}
      />
      <Box className="bubbles">
        {bubbles.map((_, index) => (
          <Box
            key={index}
            className="bubble"
            style={{
              left: `${Math.random() * 100}vw`,
              bottom: `${-Math.random() * 50}vh`,
              width: `${Math.random() * 10 + 5}vw`,
              height: `${Math.random() * 10 + 5}vw`,
              animationDuration: `${Math.random() * 6 + 6}s`,
              animationDelay: `${Math.random() * 4}s`,
              backgroundColor: `hsla(${Math.random() * 360}, 70%, 80%, 0.3)`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BubbleComponent;
