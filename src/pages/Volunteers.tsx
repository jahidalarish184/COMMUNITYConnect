
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Heart, Calendar, MapPin, Clock, Plus, Users } from "lucide-react";
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

// Define Opportunity Type
interface VolunteerOpportunity {
  id: number;
  title: string;
  organization: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  volunteersNeeded: number;
  category: string;
}

// Mock volunteer opportunities data
const volunteerData: VolunteerOpportunity[] = [
  {
    id: 1,
    title: "Food Bank Assistant",
    organization: "Community Food Bank",
    description: "Help sort and distribute food to families in need. No experience necessary, just a willingness to help!",
    date: "Every Saturday",
    time: "9:00 AM - 12:00 PM",
    location: "123 Main Street",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGJhbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    volunteersNeeded: 8,
    category: "Community Service",
  },
  {
    id: 2,
    title: "Park Clean-Up Volunteer",
    organization: "Parks & Recreation Department",
    description: "Join us in beautifying our local parks. Tasks include picking up litter, planting flowers, and general maintenance.",
    date: "October 15, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Central Park",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFyayUyMGNsZWFudXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    volunteersNeeded: 15,
    category: "Environment",
  },
  {
    id: 3,
    title: "Senior Companion",
    organization: "Elder Care Alliance",
    description: "Spend time with elderly residents at the community center, engaging in conversation, games, and activities to reduce isolation.",
    date: "Flexible",
    time: "Weekday afternoons",
    location: "Senior Living Center",
    image: "https://images.unsplash.com/photo-1581579438747-6d8ee9a47a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VuaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    volunteersNeeded: 10,
    category: "Healthcare",
  },
];

// Categories for volunteer opportunities
const categories = [
  "All",
  "Community Service",
  "Environment",
  "Healthcare",
  "Education",
  "Animal Welfare",
  "Disaster Relief",
  "Arts & Culture"
];

// Form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  organization: z.string().min(3, "Organization name is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  date: z.string().min(3, "Date information is required"),
  time: z.string().min(3, "Time information is required"),
  location: z.string().min(3, "Location is required"),
  volunteersNeeded: z.coerce.number().min(1, "At least 1 volunteer needed"),
  category: z.string().min(1, "Please select a category"),
});

type FormValues = z.infer<typeof formSchema>;

const Volunteers = () => {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>(volunteerData);
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      organization: "",
      description: "",
      date: "",
      time: "",
      location: "",
      volunteersNeeded: 5,
      category: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // In a real app, this would send data to a database
    const newOpportunity: VolunteerOpportunity = {
      id: opportunities.length + 1,
      title: values.title,
      organization: values.organization,
      description: values.description,
      date: values.date,
      time: values.time,
      location: values.location,
      volunteersNeeded: values.volunteersNeeded,
      category: values.category,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dm9sdW50ZWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    };
    
    // Java-like ArrayList.add() operation
    setOpportunities([...opportunities, newOpportunity]);
    form.reset();
    setShowForm(false);
    
    toast({
      title: "Opportunity Created",
      description: "Your volunteer opportunity has been posted successfully",
    });
  };

  // Filter opportunities by category
  const filteredOpportunities = activeCategory === "All" 
    ? opportunities 
    : opportunities.filter(opp => opp.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-50 to-amber-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Volunteer Opportunities</h1>
            <p className="text-xl text-community-600 max-w-2xl mx-auto mb-8">
              Make a difference in your community by volunteering your time and skills for a good cause.
            </p>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Plus className="mr-2" size={16} />
              {showForm ? "Cancel" : "Post Opportunity"}
            </Button>
          </div>
        </section>

        {/* Form Section */}
        {showForm && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Create Volunteer Opportunity</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Opportunity Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Food Bank Assistant" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization</FormLabel>
                            <FormControl>
                              <Input placeholder="Your organization name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
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
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about this volunteer opportunity"
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input placeholder="Oct 15, 2023 or 'Every Saturday'" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input placeholder="9:00 AM - 12:00 PM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="volunteersNeeded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Volunteers Needed</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                        Create Opportunity
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
                    className={activeCategory === category ? "bg-amber-500" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <div 
                  key={opportunity.id} 
                  className="glass-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-amber-50 text-amber-600 rounded-full">
                        {opportunity.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{opportunity.organization}</p>
                    
                    <p className="text-community-600 mb-4 line-clamp-3">
                      {opportunity.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-community-600">
                        <Calendar size={16} className="mr-2 text-amber-500" />
                        <span>{opportunity.date}</span>
                      </div>
                      <div className="flex items-center text-community-600">
                        <Clock size={16} className="mr-2 text-amber-500" />
                        <span>{opportunity.time}</span>
                      </div>
                      <div className="flex items-center text-community-600">
                        <MapPin size={16} className="mr-2 text-amber-500" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center text-community-600">
                        <Users size={16} className="mr-2 text-amber-500" />
                        <span>Volunteers needed: {opportunity.volunteersNeeded}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">
                      <Heart className="mr-2" size={16} />
                      Volunteer Now
                    </Button>
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

export default Volunteers;
