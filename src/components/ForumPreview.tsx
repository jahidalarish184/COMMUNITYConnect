
import { MessageSquare, Users, ThumbsUp, Clock, ArrowRight } from "lucide-react";
import { Button } from "./Button";

const forumTopics = [
  {
    id: 1,
    title: "Tips for organizing a successful community garage sale",
    author: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    replies: 24,
    likes: 47,
    timeAgo: "3 hours ago",
    category: "Events",
  },
  {
    id: 2,
    title: "Local restaurant recommendations for family gatherings",
    author: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    replies: 18,
    likes: 32,
    timeAgo: "1 day ago",
    category: "Recommendations",
  },
  {
    id: 3,
    title: "Looking for volunteers for the upcoming food drive",
    author: "Emma Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    replies: 15,
    likes: 28,
    timeAgo: "2 days ago",
    category: "Volunteer",
  },
];

const ForumPreview = () => {
  return (
    <section className="section-container">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-accent1-50 text-accent1-600 font-medium mb-4 text-sm">
              Community Forum
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Join the conversation</h2>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" icon={<MessageSquare size={16} />}>
            Browse All Topics
          </Button>
        </div>

        <div className="space-y-5">
          {forumTopics.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="glass" className="group">
            View All Discussions
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

interface TopicCardProps {
  topic: {
    id: number;
    title: string;
    author: string;
    avatar: string;
    replies: number;
    likes: number;
    timeAgo: string;
    category: string;
  };
  index: number;
}

const TopicCard = ({ topic, index }: TopicCardProps) => {
  return (
    <div 
      className="glass-card p-6 opacity-0 hover:shadow-highlight transition-all duration-300"
      style={{
        animationName: 'slideUp',
        animationDuration: '0.5s',
        animationFillMode: 'forwards',
        animationDelay: `${0.2 + index * 0.1}s`
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <span className="px-2.5 py-0.5 text-xs font-medium bg-accent1-50 text-accent1-600 rounded-full mr-3">
              {topic.category}
            </span>
            <div className="flex items-center text-community-500 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{topic.timeAgo}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold hover:text-accent1-600 transition-colors cursor-pointer">
            {topic.title}
          </h3>
          <div className="flex items-center mt-2">
            <img
              src={topic.avatar}
              alt={topic.author}
              className="w-6 h-6 rounded-full mr-2"
              loading="lazy"
            />
            <span className="text-sm text-community-700">{topic.author}</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center text-community-600">
            <MessageSquare size={16} className="mr-1.5 text-accent1-400" />
            <span className="text-sm font-medium">{topic.replies} replies</span>
          </div>
          <div className="flex items-center text-community-600">
            <ThumbsUp size={16} className="mr-1.5 text-accent1-400" />
            <span className="text-sm font-medium">{topic.likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPreview;
