import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Álbum", href: "#album" },
  { label: "Agenda", href: "#agenda" },
  { label: "Ouça", href: "#playlist" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-display max-w-[100px] text-3xl text-gradient tracking-wider">
          <img src="/Plurais_Transparente-white.png" alt="plurais" className="" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium text-sm tracking-wide uppercase text-white/80 "
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-border/30 animate-slide-up">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium text-lg tracking-wide uppercase py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
