import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-2 py-4 text-sm text-white bg-slate-800">
      <span>© 2024 Tales Wiki. All rights reserved.</span>
      <a
        href="https://discord.gg/your-discord-link"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-gray-300"
      >
        <FaDiscord className="w-4 h-4" />
        <span>Discord</span>
      </a>
    </footer>
  );
};

export default Footer;
