import { HiHome, HiCloud, HiInformationCircle } from "react-icons/hi";

import { IoToggleOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import logofooter from "../assets/image-footer.png";

const sidebarNavItems = [
  {
    title: "Dashboard",
    path: "/Lessons",
    icon: <HiHome className="sidebar-btn-icon" />,
  },
  {
    title: "Inventory",
    path: "/Inventory",
    icon: <HiInformationCircle className="sidebar-btn-icon" />,
  },

  {
    title: "Predict",
    path: "/Predict",
    icon: <HiCloud className="sidebar-btn-icon" />,
  },
];

const socialLinks = [
  {
    title: "PPNS",
    url: "https://ppns.ac.id/",
    icon: <img src={logofooter} alt="PPNS Logo" className="social-link" />,
  },
];

const charBannerText = {
  Katakana: "Practice essential characters for loanwords",
  Kanji: "Take your mastery to the next level",
};

export { sidebarNavItems, socialLinks, charBannerText };
