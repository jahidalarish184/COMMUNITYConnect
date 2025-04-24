
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CalendarCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Signup form schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  comments: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

// Define participant type
interface Participant {
  id: number;
  eventId: number;
  name: string;
  email: string;
  phone?: string;
  comments?: string;
  createdAt: string;
}

// Define location state type from navigate
interface LocationState {
  event?: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    maxAttendees: number;
  };
}

const EventSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [event, setEvent] = useState<LocationState["event"] | null>(null);
  
  // Initialize the form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      comments: "",
    },
  });

  useEffect(() => {
    // Get event data from location state
    const state = location.state as LocationState;
    if (!state || !state.event) {
      // If no event data, redirect back to events page
      toast({
        title: "Event Not Found",
        description: "We couldn't find the event you're looking for.",
        variant: "destructive",
      });
      navigate("/events");
      return;
    }
    
    setEvent(state.event);
  }, [location, navigate, toast]);

  const onSubmit = async (values: SignupFormValues) => {
    if (!event) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app with Supabase, this would be:
      // const { data, error } = await supabase
      //   .from('participants')
      //   .insert([{
      //     eventId: event.id,
      //     name: values.name,
      //     email: values.email,
      //     phone: values.phone,
      //     comments: values.comments,
      //     createdAt: new Date().toISOString(),
      //   }]);
      
      // Simulate saving to database
      console.log("Saving to database:", {
        eventId: event.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        comments: values.comments,
        createdAt: new Date().toISOString(),
      });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration Successful!",
        description: `You've registered for ${event.title}. We'll send you a confirmation email shortly.`,
      });
      
      // Redirect back to events page after successful signup
      navigate("/events");
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration Failed",
        description: "There was a problem with your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate("/events")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
          
          <div className="glass-card p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Register for Event</h1>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-accent2-600">{event.title}</h2>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-community-600">
                    <div className="flex items-center">
                      <CalendarCheck className="mr-2 h-4 w-4 text-accent2-500" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-accent2-50 text-accent2-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  <span>Spots available: {event.maxAttendees}</span>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any dietary restrictions, special requirements, or questions?"
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-accent2-500 hover:bg-accent2-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Complete Registration"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventSignup;
