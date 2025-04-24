
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Newspaper, Clock, ArrowRight, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define NewsArticle Type
interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

// Mock news data
const newsItemsData: NewsArticle[] = [
  {
    id: 1,
    title: "New Community Center Expansion Plans Revealed",
    excerpt: "The city council has approved plans to expand our community center with new amenities including a library and workshop spaces.",
    content: "The city council has approved plans to expand our community center with new amenities including a library and workshop spaces. The expansion, set to begin next month, will add approximately 5,000 square feet to the existing structure. The project is expected to cost $1.2 million and will be funded through a combination of municipal bonds and community fundraising efforts. \"This expansion will allow us to better serve our growing community with more programming and resources,\" said Mayor Johnson at yesterday's council meeting. Construction is expected to be completed by next summer.",
    author: "Community Council",
    date: "October 10, 2023",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbXVuaXR5JTIwY2VudGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    category: "Development",
  },
  {
    id: 2,
    title: "Local Farmer's Market Expanding to Twice Weekly",
    excerpt: "Due to popular demand, our local farmer's market will now operate both on Saturdays and Wednesdays starting next month.",
    content: "Due to popular demand, our local farmer's market will now operate both on Saturdays and Wednesdays starting next month. The market, which has been a weekend fixture for the past five years, will add Wednesday afternoons from 3:00 PM to 7:00 PM to accommodate shoppers who can't make it on weekends. \"We've seen incredible support from the community,\" said market coordinator Lisa Chen. \"Adding a weekday option will help both our vendors and customers who have busy weekend schedules.\" The market features over 40 local vendors selling fresh produce, baked goods, crafts, and prepared foods.",
    author: "Market Association",
    date: "October 5, 2023",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVycyUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    category: "Business",
  },
  {
    id: 3,
    title: "Community Clean-Up Initiative Sees Record Participation",
    excerpt: "Last weekend's community clean-up event attracted over 200 volunteers who collected more than 1,500 pounds of litter from our parks and streets.",
    content: "Last weekend's community clean-up event attracted over 200 volunteers who collected more than 1,500 pounds of litter from our parks and streets. The semi-annual event, organized by the Environmental Action Committee, saw its highest participation rate since it began eight years ago. Volunteers of all ages spent Saturday morning picking up trash, removing invasive plants, and planting native species in public spaces throughout the community. \"We're thrilled with the turnout,\" said organizer Robert Thompson. \"It shows how much people care about keeping our community beautiful and healthy.\"",
    author: "Environmental Action Committee",
    date: "September 28, 2023",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29tbXVuaXR5JTIwY2xlYW4lMjB1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    category: "Environment",
  },
  {
    id: 4,
    title: "Local School Receives State Recognition for STEM Program",
    excerpt: "Riverside Elementary School has been named a \"School of Excellence\" for its innovative science and technology curriculum.",
    content: "Riverside Elementary School has been named a \"School of Excellence\" for its innovative science and technology curriculum. The recognition comes with a $50,000 grant to further enhance the school's STEM programs. Principal Maria Rodriguez attributes the success to dedicated teachers and strong community partnerships. \"We've worked hard to create hands-on learning experiences that engage students and prepare them for the future,\" she said. The school's program includes a robotics club, coding classes starting in kindergarten, and a maker space where students can design and build their own projects.",
    author: "Education Department",
    date: "September 20, 2023",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    category: "Education",
  },
];

// Categories for news
const categories = [
  "All",
  "Development",
  "Business",
  "Environment",
  "Education",
  "Health",
  "Events",
  "Community"
];

// Form schema
const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  author: z.string().min(3, "Author name is required"),
  category: z.string().min(1, "Please select a category"),
});

type FormValues = z.infer<typeof formSchema>;

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>(newsItemsData);
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // In a real app, this would send data to a database
    const newArticle: NewsArticle = {
      id: newsItems.length + 1,
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      author: values.author,
      category: values.category,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      image: "https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    };
    
    // Similar to Java's ArrayList.add() at the beginning
    setNewsItems([newArticle, ...newsItems]);
    form.reset();
    setShowForm(false);
    
    toast({
      title: "News Article Published",
      description: "Your article has been published successfully",
    });
  };

  // Filter news by category
  const filteredNews = activeCategory === "All" 
    ? newsItems 
    : newsItems.filter(news => news.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Community News</h1>
            <p className="text-xl text-community-600 max-w-2xl mx-auto mb-8">
              Stay informed about what's happening in your community with the latest news and announcements.
            </p>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="mr-2" size={16} />
              {showForm ? "Cancel" : "Submit News Article"}
            </Button>
          </div>
        </section>

        {/* Form Section */}
        {showForm && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Submit News Article</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Article Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a clear, descriptive title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name or organization" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                {...field}
                              >
                                <option value="">Select a category</option>
                                {categories.filter(cat => cat !== "All").map(category => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A brief summary of your article (shown in listings)"
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Article Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Write your full article here..."
                              className="min-h-[250px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Publish Article
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </section>
        )}

        {/* Category Filters */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={activeCategory === category ? "bg-blue-600" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Articles Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8">
              {filteredNews.map((article) => (
                <div 
                  key={article.id} 
                  className="glass-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center text-community-500 text-sm mb-2">
                        <Clock size={14} className="mr-1.5" />
                        <span>{article.date}</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      
                      <p className="text-community-600 mb-4">{article.excerpt}</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium text-community-700">By {article.author}</span>
                        <Button 
                          variant="outline"
                          className="group text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          Read More
                          <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default News;
