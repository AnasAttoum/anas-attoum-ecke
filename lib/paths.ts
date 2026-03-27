import { ChevronsLeftRightEllipsis, Heart, Telescope } from "lucide-react";

export const paths = {
  login: "/",
  cv: "/cv",
  skills: "/skills",
  projects: "/projects",
};

export const links = [
  { label: "bit" },
  { label: "cv", link: paths.cv, icon: Telescope },
  { label: "pages" },
  { label: "skills", link: paths.skills, icon: Heart },
  { label: "projects", link: paths.projects, icon: ChevronsLeftRightEllipsis },
];
