
import { PackageCheck, ArrowRight, ThumbsUp, Heart, BookOpen } from "lucide-react";
import { Button } from "./Button";

const resources = [
  {
    id: 1,
    title: "Community Food Pantry",
    description: "Donate non-perishable food items to help families in need throughout our community.",
    icon: <PackageCheck size={24} />,
    category: "Food",
    tags: ["Donations", "Food Security", "Weekly"],
  },
  {
    id: 2,
    title: "After-School Tutoring Program",
    description: "Volunteer tutors needed for our after-school program helping students with homework and studies.",
    icon: <BookOpen size={24} />,
    category: "Education",
    tags: ["Volunteer", "Youth", "Weekdays"],
  },
  {
    id: 3,
    title: "Senior Companion Initiative",
    description: "Spend time with elderly neighbors who could use company. Make a meaningful connection and brighten someone's day.",
    icon: <Heart size={24} />,
    category: "Companionship",
    tags: ["Seniors", "Flexible Hours", "One-on-One"],
  },
];

const ResourcesHub = () => {
  return (
    <section className="section-container bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-accent2-50 text-accent2-600 font-medium mb-4 text-sm">
            Volunteer & Resources
          </div>
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
            Share, contribute, and make a difference in your community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="group">
            View All Resources
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    category: string;
    tags: string[];
  };
  index: number;
}

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  return (
    <div 
      className="glass-card p-6 h-full flex flex-col opacity-0"
      style={{
        animationName: 'slideUp',
        animationDuration: '0.5s',
        animationFillMode: 'forwards',
        animationDelay: `${0.2 + index * 0.1}s`
      }}
    >
      <div className="mb-5 inline-flex p-3 rounded-2xl bg-accent2-50 text-accent2-600">
        {resource.icon}
      </div>
      <div className="mb-2 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span key={tag} className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
      <p className="text-community-600 mb-5 flex-grow">{resource.description}</p>
      <Button variant="secondary" size="sm" className="group self-start">
        Learn More
        <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={14} />
      </Button>
    </div>
  );
};

export default ResourcesHub;
