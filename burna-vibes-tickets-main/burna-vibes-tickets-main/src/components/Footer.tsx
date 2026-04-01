import { Instagram, Twitter, Youtube, Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gradient-gold font-display text-xl font-black">BURNA BOY</p>
            <p className="text-muted-foreground text-sm mt-1">Official Concert Ticketing</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Instagram, href: "https://instagram.com/burnaboygram" },
              { icon: Twitter, href: "https://twitter.com/burnaboy" },
              { icon: Youtube, href: "https://youtube.com/@BurnaBoyOfficial" },
              { icon: Music, href: "https://open.spotify.com/artist/3wcj11K77LjEY1PkEazffa" },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-xs">© 2026 Burna Boy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
