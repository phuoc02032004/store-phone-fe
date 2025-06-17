import React from "react";

interface NavLinkProps {
  text: string;
  href: string;
  onClick?: () => void; 
}

const NavLink: React.FC<NavLinkProps> = ({ text, href, onClick }) => {
  return (
    <a className="hover:text-white/50 text-white transition-colors" href={href} onClick={onClick}>
      {text}
    </a>
  );
};

export default NavLink; 