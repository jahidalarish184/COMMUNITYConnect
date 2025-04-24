
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define Event Type
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  maxAttendees: number;
  image: string;
}

// Mock events data - would typically come from database
const eventsData: Event[] = [
  {
    id: 1,
    title: "Community Garden Workshop",
    description: "Learn about sustainable gardening practices and help plant our community garden.",
    date: "2023-10-15",
    time: "10:00 AM - 12:00 PM",
    location: "Central Park",
    organizer: "Green Thumbs Society",
    maxAttendees: 30,
    image: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbXVuaXR5JTIwZ2FyZGVufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "Neighborhood Clean-up Day",
    description: "Join us for a community clean-up. Supplies provided. Let's make our neighborhood shine!",
    date: "2023-10-22",
    time: "9:00 AM - 1:00 PM",
    location: "Main Street",
    organizer: "City Beautification Committee",
    maxAttendees: 50,
    image: "https://images.unsplash.com/photo-1604187352516-4f27a4e9e902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYW4lMjB1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "Local Business Networking",
    description: "Connect with local entrepreneurs and business owners. Refreshments provided.",
    date: "2023-10-28",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center",
    organizer: "Chamber of Commerce",
    maxAttendees: 40,
    image: "https://images.unsplash.com/photo-1608476267687-0ea46b7e10e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1c2luZXNzJTIwbmV0d29ya2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

// Form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)"),
  time: z.string().min(3, "Please enter valid time information"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  organizer: z.string().min(3, "Organizer must be at least 3 characters"),
  maxAttendees: z.coerce.number().min(1, "Must have at least 1 attendee"),
});

type FormValues = z.infer<typeof formSchema>;

const Events = () => {
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      organizer: "",
      maxAttendees: 20,
    },
  });

  const onSubmit = (values: FormValues) => {
    // In a real app, this would send data to a database
    const newEvent: Event = {
      id: events.length + 1,
      title: values.title,
      description: values.description,
      date: values.date,
      time: values.time,
      location: values.location,
      organizer: values.organizer,
      maxAttendees: values.maxAttendees,
      image: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbXVuaXR5JTIwZ2FyZGVufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    };
    
    // Similar to Java ArrayList.add()
    setEvents([...events, newEvent]);
    form.reset();
    setShowForm(false);
    
    toast({
      title: "Event Created",
      description: "Your event has been successfully created",
    });
  };

  const handleRSVP = (event: Event) => {
    navigate('/event-signup', { 
      state: { 
        event: {
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          maxAttendees: event.maxAttendees
        } 
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-accent2-50 to-accent2-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Events</h1>
            <p className="text-xl text-community-600 max-w-2xl mx-auto mb-8">
              Discover local happenings, attend workshops, and connect with your neighbors through shared experiences.
            </p>
            <Button 
              className="bg-accent2-500 hover:bg-accent2-600 text-white"
              onClick={() => setShowForm(!showForm)}
            >
              <Plus className="mr-2" size={16} />
              {showForm ? "Cancel" : "Create New Event"}
            </Button>
          </div>
        </section>

        {/* Form Section */}
        {showForm && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Create a New Event</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Community Garden Workshop" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="organizer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organizer</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name or organization" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide details about your event"
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
                              <Input type="date" {...field} />
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
                              <Input placeholder="6:00 PM - 8:00 PM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxAttendees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Attendees</FormLabel>
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
                            <Input placeholder="Community Center" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-accent2-500 hover:bg-accent2-600">
                        Create Event
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </section>
        )}

        {/* Events Listing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <div key={event.id} className="glass-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="md:w-3/5 p-6">
                      <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                      <p className="text-community-600 mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-community-600">
                          <Calendar size={16} className="mr-2 text-accent2-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-community-600">
                          <Clock size={16} className="mr-2 text-accent2-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-community-600">
                          <MapPin size={16} className="mr-2 text-accent2-500" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-community-600">
                          <Users size={16} className="mr-2 text-accent2-500" />
                          <span>Max attendees: {event.maxAttendees}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          className="w-full"
                          onClick={() => handleRSVP(event)}
                        >
                          RSVP Now
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

export default Events;
