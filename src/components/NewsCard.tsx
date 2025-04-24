
import { Newspaper, Clock, ArrowRight } from "lucide-react";
import { Button } from "./Button";

const newsItems = [
  {
    id: 1,
    title: "New Community Center Expansion Plans Revealed",
    excerpt: "The city council has approved plans to expand our community center with new amenities including a library and workshop spaces.",
    author: "Community Council",
    date: "October 10, 2023",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbXVuaXR5JTIwY2VudGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "Local Farmer's Market Expanding to Twice Weekly",
    excerpt: "Due to popular demand, our local farmer's market will now operate both on Saturdays and Wednesdays starting next month.",
    author: "Market Association",
    date: "October 5, 2023",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVycyUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

const NewsCard = () => {
  return (
    <section className="section-container">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-accent1-50 text-accent1-600 font-medium mb-4 text-sm">
              Community News
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Stay informed</h2>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" icon={<Newspaper size={16} />}>
            View All News
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.map((item, index) => (
            <NewsItem key={item.id} news={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface NewsItemProps {
  news: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
  };
  index: number;
}

const NewsItem = ({ news, index }: NewsItemProps) => {
  return (
    <div 
      className="glass-card flex flex-col md:flex-row overflow-hidden opacity-0"
      style={{
        animationName: 'slideUp',
        animationDuration: '0.5s',
        animationFillMode: 'forwards',
        animationDelay: `${0.2 + index * 0.1}s`
      }}
    >
      <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="md:w-3/5 p-6">
        <div className="flex items-center text-community-500 text-sm mb-2">
          <Clock size={14} className="mr-1.5" />
          <span>{news.date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{news.title}</h3>
        <p className="text-community-600 mb-4">{news.excerpt}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm font-medium text-community-700">By {news.author}</span>
          <Button variant="link" size="sm" className="group text-accent1-600">
            Read More
            <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
