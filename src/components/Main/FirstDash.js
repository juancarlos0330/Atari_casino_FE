import React from "react";
import Header from "../Header/Header";
import Games from "../Games/Games";
import Variety from "../Variety/Variety.js";
import Winner from "../Winner/Winner";
import Atari from "../Atari/Atari";
import Dashboard from "../Dashboard/Dashboard";
import Rating from "../Rating/Rating";
import Partner from "../Partner/Partner";
import Contact from "../Contact/Contact";
import { MotionInView } from "../../animate/index";
import {
  varFadeInLeft,
  varFadeInRight,
  varFadeIn,
  varFadeInUp,
  varFadeInDown,
} from "../../animate/variants";
function FirstDash(props) {
  return (
    <>
      <MotionInView variants={varFadeInRight}>
        <Header />
      </MotionInView>
      <MotionInView variants={varFadeInDown}>
        <Games />
      </MotionInView>
      <MotionInView variants={varFadeInUp}>
        <Variety />
      </MotionInView>
      <MotionInView variants={varFadeIn}>
        <Winner />
      </MotionInView>
      <MotionInView variants={varFadeInLeft}>
        <Atari />
      </MotionInView>
      <MotionInView variants={varFadeInUp}>
        <Dashboard />
      </MotionInView>
      <MotionInView variants={varFadeInUp}>
        <Rating />
      </MotionInView>
      <MotionInView variants={varFadeIn}>
        <Partner />
      </MotionInView>
      <MotionInView variants={varFadeInDown}>
        <Contact />
      </MotionInView>
    </>
  );
}

export default FirstDash;
