import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-gray-200 bg-slate-800">
      <Link
        href="https://discord.gg/57Cp6uCkp8"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-gray-300"
      >
        <FaDiscord className="w-6 h-6" />
      </Link>
      <span>© {currentYear} 테일즈위키. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
