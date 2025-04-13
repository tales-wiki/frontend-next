import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center gap-2 py-4 text-sm text-white bg-slate-800">
      <a
        href="https://discord.gg/57Cp6uCkp8"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-gray-300"
      >
        <FaDiscord className="w-6 h-6" />
      </a>
      <span>© {currentYear} 테일즈위키. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
