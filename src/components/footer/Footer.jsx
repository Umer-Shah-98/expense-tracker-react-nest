import React, { useRef, useState } from "react";
import InstagramIcon from "../../assets/insta.png";
import { Button, TextField, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
const Footer = ({ focusOnScroll }) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Box className="social-media-links flex justify-center sm:justify-around md:justify-between gap-2 mx-5 mt-20 mb-2">
        <Typography variant="body2" sx={{ fontFamily: "Poppins" }} color="gray">
          <span>
            Connect with Expensify{" "}
            <a href="#">
              <img
                src={InstagramIcon}
                alt="insta-icon"
                className="inline ml-3 mb-1"
              />
            </a>
          </span>
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "Poppins" }} color="gray">
          @ Expensify inc <span>{currentYear}</span>.
        </Typography>
      </Box>
    </>
  );
};

export { Footer };
