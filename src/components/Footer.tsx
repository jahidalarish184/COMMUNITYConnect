
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowRight
} from "lucide-react";
import { Button } from "./Button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-community-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <h3 className="text-2xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-accent1-400 to-accent1-300">
              CommunityConnect
            </h3>
            <p className="text-community-200 mb-6">
              Building stronger communities through connection, engagement, and shared resources.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Youtube size={18} />} href="#" />
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-white/90">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/forum">Forum</FooterLink>
              <FooterLink href="/volunteers">Volunteer</FooterLink>
              <FooterLink href="/news">News</FooterLink>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-white/90">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-accent1-400 mt-1" />
                <span className="text-community-200">
                  123 Community Avenue<br />Cityville, ST 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-accent1-400" />
                <span className="text-community-200">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-accent1-400" />
                <span className="text-community-200">info@communityconnect.com</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-white/90">Stay Updated</h3>
            <p className="text-community-200 mb-4">
              Subscribe to our newsletter for the latest updates and community news.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-community-800 text-white border-0 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent1-500 w-full"
              />
              <Button className="rounded-l-none">
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-community-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-community-300 text-sm mb-4 md:mb-0">
              © {currentYear} CommunityConnect. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-community-300 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-community-300 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-community-300 text-sm hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink = ({ icon, href }: SocialLinkProps) => (
  <a
    href={href}
    className="h-9 w-9 rounded-full flex items-center justify-center bg-community-800 text-community-200 hover:bg-accent1-500 hover:text-white transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link
      to={href}
      className="text-community-200 hover:text-white transition-colors inline-flex items-center group"
    >
      <span className="mr-2 opacity-0 transition-all group-hover:opacity-100 group-hover:mr-3">
        <ArrowRight size={14} />
      </span>
      {children}
    </Link>
  </li>
);

export default Footer;
