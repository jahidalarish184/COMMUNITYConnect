import { useState, useEffect } from "react";
import { Button } from "./Button";
import { Menu, X, ChevronRight, Calendar, MessageSquare, Users, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Navbar animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigate = useNavigate();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-subtle py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent1-600 to-accent1-500">
            CommunityConnect
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/events" icon={<Calendar size={16} />}>
            Events
          </NavLink>
          <NavLink href="/forum" icon={<MessageSquare size={16} />}>
            Forum
          </NavLink>
          <NavLink href="/volunteers" icon={<Users size={16} />}>
            Volunteer
          </NavLink>
          <NavLink href="/news" icon={<Newspaper size={16} />}>
            News
          </NavLink>
          
          <div className="ml-4 flex space-x-3">
            {session ? (
              <ProfileMenu />
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="font-medium"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="font-medium"
                  onClick={() => navigate("/auth")}
                >
                  Join Now
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 animate-slideDown md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <MobileNavLink href="/events" icon={<Calendar size={18} />}>
              Events
            </MobileNavLink>
            <MobileNavLink href="/forum" icon={<MessageSquare size={18} />}>
              Forum
            </MobileNavLink>
            <MobileNavLink href="/volunteers" icon={<Users size={18} />}>
              Volunteer
            </MobileNavLink>
            <MobileNavLink href="/news" icon={<Newspaper size={18} />}>
              News
            </MobileNavLink>
            
            {session ? (
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => navigate("/profile-edit")}
                >
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-center mt-2"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-center mt-2"
                  onClick={() => supabase.auth.signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="pt-4 flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full justify-center"
                  onClick={() => navigate("/auth")}
                >
                  Join Now
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop NavLink component
const NavLink = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Link
    to={href}
    className="px-3 py-2 rounded-full text-foreground hover:text-accent1-600 hover:bg-gray-50 transition-colors duration-200 flex items-center"
  >
    <span className="mr-1.5 text-accent1-500">{icon}</span>
    <span className="font-medium">{children}</span>
  </Link>
);

// Mobile NavLink component with additional styling
const MobileNavLink = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Link
    to={href}
    className="p-3 flex items-center rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
  >
    <span className="mr-3 p-2 rounded-full bg-white text-accent1-500">{icon}</span>
    <span className="font-medium flex-1">{children}</span>
    <ChevronRight size={18} className="text-gray-400" />
  </Link>
);

export default Navbar;
