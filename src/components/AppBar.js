import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
// import emptyNotesIcon from "./assets/icons8-notes-64.png";

import SpeakEase from "./SpeakEase";
import ImageGenerator from "./ImageGeneration";
import TextToAudio from "./textToAudio";
// // import Poems from "./poems";
import SnapTalk from "./SnapTalk";
import HomePage from "./HomePage";
import TextToSpeech from "./textToSpeech";
import { useTheme } from "@emotion/react";
import { useScrollTrigger } from "@mui/material";
// import TextTranslation from "./textTranslation";

const pages = ["SpeakEase", "SnapTalk", "Imaginix", "MusicGen", "EchoVerse"];
// const settings = ["Profile", "Logout"];

function Header() {
  const theme = useTheme();
  const trigger = useScrollTrigger();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <Router>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.15)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0px 4px 12px rgba(0, 0, 0, 0.15)" : "none",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
          borderRadius: "8px",
          transition:
            "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
          padding: "0 16px",
          height: "64px",
          color: "black",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <Box
              component="img"
              // src={emptyNotesIcon}
              alt="Logo"
              sx={{
                display: { xs: "none", md: "flex" },
                width: 40,
                height: 40,
                mr: 1,
              }}
            /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "fantasy",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AI Innovate Hub
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ paddingTop: "0px" }}
                  >
                    <Button
                      component={Link}
                      to={`/${page.toLowerCase()}`}
                      textAlign="center"
                      sx={{ color: "black", backgroundColor: "ButtonFace" }}
                    >
                      {page}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              SnapSpeak
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link} // Use Link to route to the page
                  to={`/${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Button textAlign="center">{setting}</Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ mt: 8 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SpeakEase" element={<SpeakEase />} />
          {/* <Route path="/poems" element={<Poems />} /> */}
          <Route path="/SnapTalk" element={<SnapTalk />} />
          {/* <Route path="/TextTranslation" element={<TextTranslation />} /> */}
          <Route path="/Imaginix" element={<ImageGenerator />} />
          <Route path="/MusicGen" element={<TextToAudio />} />
          <Route path="/EchoVerse" element={<TextToSpeech />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default Header;
