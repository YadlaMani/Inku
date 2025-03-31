import React from "react";

const Footer = () => {
  return (
    <footer className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-black/10 pt-8">
        <div className="text-sm text-muted-foreground">
          © 2024 Inku. Crafted with simplicity in mind.
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Discord
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
