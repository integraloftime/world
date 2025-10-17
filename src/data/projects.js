// Import project components
import WhatDoYouDreamAbout from "../components/works/WhatDoYouDreamAbout";
import LettersToMyMom from "../components/works/LettersToMyMom";
import DiffusionMe from "../components/works/DiffusionMe";

// Import project images
import tweezerImage from "../assets/projects/tweezer.jpg";
import lettersToMyMomImage from "../assets/projects/letters.jpg";
import pearlImage from "../assets/projects/pearl.jpeg";
import pearlMobileImage from "../assets/projects/pearlios.png";
import stylescapeImage from "../assets/projects/stylescape.png";
import diffusionMeImage from "../assets/projects/diffusionme.png";

import tangentImage from "../assets/projects/tangent.png";

import dreamInk from "../assets/projects/dreamInk.jpg";

// import cognitionEssay from "./projects/essay.pdf";

export const projects = [
  {
    title: "essay on the limits of Jung's theories of cognition",
    year: "2025",
    completionDate: "mm/dd/yyyy",
    creativeRating: 0.75,
    path: null,
    component: null,
    image: dreamInk,
    status:
      "a non-scientific paper of understanding the role of cognition in consciousness",
    // links: [
    //   { label: "pdf", url: cognitionEssay, icon: "external" },
    // ],
  },
  {
    title: "psychology research",
    year: "tbd",
    completionDate: "mm/dd/yyyy",
    creativeRating: 0.8,
    path: "/work/what-do-you-dream-about",
    component: WhatDoYouDreamAbout,
    image: tweezerImage,
    status: "working alongside professor on cognitive processes of facial recognition",
    // links: [
    //   {
    //     label: "GitHub",
    //     url: "https://github.com/49emily/what-do-you-dream-about",
    //     icon: "github",
    //   },
    //   // { label: "Demo", url: "https://what-do-you-dream-about.com", icon: "external" },
    // ],
  },
  {
    title: "chiral collective",
    year: "2025",
    completionDate: "05/10/2025",
    creativeRating: 0.9,
    path: "/work/letters-to-my-mom",
    component: LettersToMyMom,
    image: lettersToMyMomImage,
    status: "a community of understanding the human experience through art",
    // links: [
    //   { label: "GitHub", url: "https://github.com/49emily/ai-art-calligraphy", icon: "github" },
    // ],
  },
  {
    title: "creating a guava fragrance",
    year: "tbd",
    completionDate: "mm/dd/yyyy",
    creativeRating: 0.6,
    path: "/work/emily-diffusion",
    component: DiffusionMe,
    image: diffusionMeImage,
    status: "olfactory notes translated: guava fruit, fresh, subtle sweetness",
    links: [
      { label: "GitHub", url: "https://github.com/49emily/emily-diffusion", icon: "github" },
    ],
  },
  {
    title: "Japanese study",
    year: "tbd",
    completionDate: "03/04/2022",
    creativeRating: 0.4,
    path: null,
    component: null,
    image: pearlImage,
    status: "learning a new language",
    links: [
      // { label: "GitHub", url: "https://github.com/emilyz49/prl", icon: "github" },
      { label: "Live Site", url: "https://www.writewithprl.com/", icon: "external" },
      { label: "Info", url: "https://info.writewithprl.com/", icon: "external" },
      { label: "Updates", url: "https://x.com/writewithprl", icon: "twitter" },
      {
        label: "Product Hunt",
        url: "https://www.producthunt.com/products/pearl-8",
        icon: "external",
      },
      { label: "Discord", url: "https://discord.gg/prl", icon: "discord" },
    ],
  },
  {
    title: "youtube",
    year: "2025",
    completionDate: "03/15/2025",
    creativeRating: 0.3,
    path: null,
    component: null,
    image: pearlMobileImage,
    status: "where I explore ideas I cannot reconcile within my limitations",
    links: [{ label: "Youtube", url: "https://www.youtube.com/@integraloftime", icon: "youtube" }],
  },
  {
    title: "extrapolating cognition from linguistic style",
    year: "always",
    completionDate: "never ending",
    creativeRating: 0.2,
    path: null,
    component: null,
    image: tangentImage,
    status: "customizing an llm to derive semantic and grammatical patterns and their cognitive correlates",
    //links: [
    //  {
    //    label: "Demo",
    //    url: "https://x.com/emilyzsh/status/1882154398597734419",
    //    icon: "twitter",
    //  },
    //],
  },
  {
    title: "starting a convenience store",
    year: "tbd",
    completionDate: "before I get old",
    creativeRating: 0.2,
    path: null,
    component: null,
    image: tangentImage,
    status: "my dream job",
    //links: [
    //  {
    //    label: "Demo",
    //    url: "https://x.com/emilyzsh/status/1882154398597734419",
    //    icon: "twitter",
    //  },
    //],
  },
  {
    title: "optimism",
    year: "always",
    completionDate: "never ending",
    creativeRating: 0.2,
    path: null,
    component: null,
    image: tangentImage,
    status: "a perhaps juvenile absurdity I cannot live without",
    //links: [
    //  {
    //    label: "Demo",
    //    url: "https://x.com/emilyzsh/status/1882154398597734419",
    //    icon: "twitter",
    //  },
    //],
  },
];

// Helper function to get projects with routes (for routing setup)
export const getProjectRoutes = () => {
  return projects.filter((project) => project.path && project.component);
};

// Helper function to get project by path
export const getProjectByPath = (path) => {
  return projects.find((project) => project.path === path);
};
