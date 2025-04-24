
import { useEffect, useRef } from "react";
import { Button } from "./Button";
import { ArrowRight, Users, Calendar, MessageSquare } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Spotlight effect
    const spotlight = (e: MouseEvent) => {
      if (heroRef.current) {
        const spotlight = heroRef.current.querySelector('.spotlight') as HTMLElement;
        if (spotlight) {
          spotlight.style.top = `${e.clientY}px`;
          spotlight.style.left = `${e.clientX}px`;
        }
      }
    };

    document.addEventListener('mousemove', spotlight);
    return () => document.removeEventListener('mousemove', spotlight);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="spotlight"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-gray-100"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center relative z-10">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left animate-slideUp opacity-0" style={{animationDelay: '0.1s'}}>
          <div className="inline-block px-3 py-1 rounded-full bg-accent1-50 text-accent1-600 font-medium mb-4 text-sm">
            Connect. Share. Thrive.
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your community, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent1-600 to-accent1-400">
              all in one place
            </span>
          </h1>
          
          <p className="text-xl text-community-600 max-w-xl">
            CommunityConnect brings people together. Join events, share resources, and build meaningful connections in your neighborhood.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="group">
              Join Today
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
          
          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
            <FeaturePill icon={<Users size={14} />} text="Thriving Community" />
            <FeaturePill icon={<Calendar size={14} />} text="Local Events" />
            <FeaturePill icon={<MessageSquare size={14} />} text="Discussion Forums" />
          </div>
        </div>
        
        {/* Right side - Hero image with animation */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative animate-fadeIn opacity-0" style={{animationDelay: '0.3s'}}>
          <div className="relative">
            {/* Main image */}
            <div className="relative z-10 glass-card rounded-2xl overflow-hidden shadow-glass animate-float">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Community members collaborating" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent1-50 rounded-full blur-2xl opacity-60 animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute -top-5 -right-5 w-32 h-32 bg-accent2-50 rounded-full blur-2xl opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature pill component
const FeaturePill = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center px-3 py-1.5 rounded-full bg-white shadow-subtle border border-gray-100">
    <span className="mr-1.5 text-accent1-500">{icon}</span>
    <span className="text-sm font-medium text-community-800">{text}</span>
  </div>
);

export default Hero;
