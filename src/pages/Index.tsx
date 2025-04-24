
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import EventsList from "@/components/EventsList";
import ForumPreview from "@/components/ForumPreview";
import ResourcesHub from "@/components/ResourcesHub";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { Users, MessageSquare, Calendar, Newspaper, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/Button";

const Index = () => {
  // Animation for elements as they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="page-transition">
      <AnnouncementBanner 
        message="Join our upcoming Community Workshop on October 15th!" 
        linkText="Register Now" 
        linkUrl="#" 
      />
      <Navbar />
      <Hero />
      
      {/* Core Features Section */}
      <section className="section-container">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-block px-3 py-1 rounded-full bg-accent1-50 text-accent1-600 font-medium mb-4 text-sm">
              Our Platform Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need in one place
            </h2>
            <p className="text-community-600 max-w-2xl mx-auto mt-4">
              CommunityConnect brings people together through a suite of powerful tools designed to foster communication, collaboration, and community building.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="User Profiles"
              description="Create personalized profiles, connect with neighbors, and build your community network."
              icon={<Users size={24} />}
              index={0}
            />
            <FeatureCard
              title="Discussion Forums"
              description="Engage in meaningful conversations with community members about topics that matter."
              icon={<MessageSquare size={24} />}
              index={1}
            />
            <FeatureCard
              title="Events Calendar"
              description="Discover and join local events, or create your own to bring people together."
              icon={<Calendar size={24} />}
              index={2}
            />
            <FeatureCard
              title="Local News"
              description="Stay informed with the latest announcements and news from your community."
              icon={<Newspaper size={24} />}
              index={3}
            />
            <FeatureCard
              title="Volunteer Opportunities"
              description="Find ways to contribute your time and skills to causes that make a difference."
              icon={<Heart size={24} />}
              index={4}
            />
            <FeatureCard
              title="Resource Sharing"
              description="Share or request resources, from tools to skills, with others in your neighborhood."
              icon={<Share2 size={24} />}
              index={5}
            />
          </div>
        </div>
      </section>
      
      {/* Events List Section */}
      <EventsList />
      
      {/* Forum Preview Section */}
      <ForumPreview />
      
      {/* Resources Hub Section */}
      <ResourcesHub />
      
      {/* News Section */}
      <NewsCard />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent1-600 to-accent1-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
            Ready to connect with your community?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Join thousands of neighbors already building stronger connections and more resilient communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="glass" className="font-medium">
              Join Now
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-medium">
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
