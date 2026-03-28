import { ChevronsLeftRightEllipsis, Heart, RadioTower, Telescope } from "lucide-react";

export const paths = {
  login: "/",
  cv: "/cv",
  skills: "/skills",
  projects: "/projects",
  socialMedia: "/social-media",
};

export const links = [
  { label: "bit" },
  { label: "cv", link: paths.cv, icon: Telescope },
  { label: "pages" },
  { label: "skills", link: paths.skills, icon: Heart },
  { label: "projects", link: paths.projects, icon: ChevronsLeftRightEllipsis },
  { label: "contact" },
  { label: "social-media", link: paths.socialMedia, icon: RadioTower },
];
