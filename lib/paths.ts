import { ArrowDownAZ, ChevronsLeftRightEllipsis, Heart, RadioTower, Telescope, Wallpaper } from "lucide-react";

export const paths = {
  login: "/",
  about: "/about",
  pics: "/pictures",
  cv: "/cv",
  skills: "/skills",
  projects: "/projects",
  socialMedia: "/social-media",
};

export const links = [
  { label: "bit" },
  { label: "about", link: paths.about, icon: ArrowDownAZ },
  { label: "my-pics", link: paths.pics, icon: Wallpaper },
  { label: "cv", link: paths.cv, icon: Telescope },
  { label: "pages" },
  { label: "skills", link: paths.skills, icon: Heart },
  { label: "projects", link: paths.projects, icon: ChevronsLeftRightEllipsis },
  { label: "contact" },
  { label: "social-media", link: paths.socialMedia, icon: RadioTower },
];
