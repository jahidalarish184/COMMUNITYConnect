
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Users, ThumbsUp, Tag, Plus, Filter } from "lucide-react";
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

// Mock forum data - would typically come from database
const forumTopicsData = [
  {
    id: 1,
    title: "Tips for organizing a successful community garage sale",
    content: "I'm planning to organize a community garage sale next month and would love to hear any tips or suggestions from those who have done this before. What worked well? What challenges did you face?",
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
    content: "My extended family is coming to visit next month, and I'm looking for recommendations for restaurants that can accommodate a group of 12 people. Preferably somewhere with a diverse menu to satisfy different preferences.",
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
    content: "Our community center is organizing a food drive on the last weekend of this month. We need volunteers to help with collection, sorting, and distribution. If you can spare a few hours, please let me know!",
    author: "Emma Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    replies: 15,
    likes: 28,
    timeAgo: "2 days ago",
    category: "Volunteer",
  },
  {
    id: 4,
    title: "Ideas for improving our neighborhood park",
    content: "I've noticed our local park could use some improvements. I'm thinking of proposing some changes to the city council and would love to gather ideas from fellow residents. What would you like to see improved?",
    author: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    replies: 31,
    likes: 56,
    timeAgo: "3 days ago",
    category: "Community",
  },
];

// Categories for the forum
const categories = [
  "All",
  "Events",
  "Recommendations",
  "Volunteer",
  "Community",
  "Questions",
  "News",
  "Discussion"
];

// Form schema
const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  content: z.string().min(30, "Content must be at least 30 characters"),
  category: z.string().min(1, "Please select a category"),
});

const Forum = () => {
  const [topics, setTopics] = useState(forumTopicsData);
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would send data to a database
    const newTopic = {
      id: topics.length + 1,
      title: values.title,
      content: values.content,
      author: "Current User", // In a real app, this would come from authentication
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg", // Placeholder avatar
      replies: 0,
      likes: 0,
      timeAgo: "Just now",
      category: values.category,
    };
    
    setTopics([newTopic, ...topics]);
    form.reset();
    setShowForm(false);
    
    toast({
      title: "Topic Created",
      description: "Your discussion topic has been posted successfully",
    });
  };

  // Filter topics by category
  const filteredTopics = activeCategory === "All" 
    ? topics 
    : topics.filter(topic => topic.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-accent1-50 to-accent1-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Forum</h1>
            <p className="text-xl text-community-600 max-w-2xl mx-auto mb-8">
              Share ideas, ask questions, and engage in meaningful conversations with your community.
            </p>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-accent1-500 hover:bg-accent1-600 text-white"
            >
              <Plus className="mr-2" size={16} />
              {showForm ? "Cancel" : "Start a Discussion"}
            </Button>
          </div>
        </section>

        {/* Form Section */}
        {showForm && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Start a New Discussion</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topic Title</FormLabel>
                          <FormControl>
                            <Input placeholder="What would you like to discuss?" {...field} />
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
                    
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your thoughts, questions, or ideas..."
                              className="min-h-[200px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-accent1-500 hover:bg-accent1-600">
                        Post Discussion
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </section>
        )}

        {/* Forum Topics Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Category Filters */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={activeCategory === category ? "bg-accent1-500" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Topics List */}
            <div className="space-y-6">
              {filteredTopics.length === 0 ? (
                <div className="text-center py-10">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900">No discussions found</h3>
                  <p className="mt-2 text-gray-500">Be the first to start a discussion in this category!</p>
                </div>
              ) : (
                filteredTopics.map((topic) => (
                  <div 
                    key={topic.id} 
                    className="glass-card p-6 hover:shadow-highlight transition-all duration-300"
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <img 
                            src={topic.avatar} 
                            alt={topic.author}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <h3 className="font-medium">{topic.author}</h3>
                            <p className="text-sm text-gray-500">{topic.timeAgo}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-accent1-50 text-accent1-600 rounded-full">
                          {topic.category}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-2 hover:text-accent1-600 cursor-pointer">
                        {topic.title}
                      </h2>
                      
                      <p className="text-gray-700 mb-4">
                        {topic.content.length > 200 
                          ? `${topic.content.substring(0, 200)}...` 
                          : topic.content
                        }
                      </p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
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
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-sm"
                        >
                          View Discussion
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Forum;
