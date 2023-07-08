import React from "react";
import { styled, Box, Typography } from "@mui/material";

const Image = styled(Box)`
  width: 100%;
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
    center/55% repeat-x #000;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  background-color: #fff;
  line-height: 1;
  border: 3px solid black;
  margin-bottom: 10px;
  padding: 5px 20px
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #ffffff;
  border: 2px dotted black;
  padding: 3px 10px;
`;

const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>Code for Interview</SubHeading>
    </Image>
  );
};

export default Banner;
