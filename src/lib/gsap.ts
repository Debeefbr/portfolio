"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, Physics2DPlugin, useGSAP);

export { gsap, ScrollTrigger, Draggable, InertiaPlugin, Physics2DPlugin, useGSAP };
