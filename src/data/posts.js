// Import project components
// import WhatDoYouDreamAbout from "../components/works/WhatDoYouDreamAbout";

// Import project images
// import tweezerImage from "../assets/projects/tweezer.jpg";

export const posts = [
  {
    title: "essay on the limits of Jung's theories of cognition",
    year: "2025",
    completionDate: "mm/dd/yyyy",
    creativeRating: 0.75,
    path: null,
    component: null,
    image: null,
    status:
      "a non-scientific paper of understanding the role of cognition in consciousness",
    // links: [
    //   { label: "pdf", url: cognitionEssay, icon: "external" },
    // ],
  },
];

// Helper function to get posts with routes (for routing setup)
export const getPostRoutes = () => {
  return posts.filter((post) => post.path && post.component);
};

// Helper function to get project by path
export const getPostByPath = (path) => {
  return posts.find((post) => post.path === path);
};
