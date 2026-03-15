import { ChevronsLeftRightEllipsis, Heart } from "lucide-react";

export const paths = {
  login: "/",
  skills: "/skills",
  projects: "/projects",
};

export const links = [
  { label: "pages" },
  { label: "skills", link: paths.skills, icon: Heart },
  { label: "projects", link: paths.projects, icon: ChevronsLeftRightEllipsis },
];
