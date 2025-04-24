
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "./Button";

const events = [
  {
    id: 1,
    title: "Community Garden Workshop",
    date: "Oct 15, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Central Park",
    image: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbXVuaXR5JTIwZ2FyZGVufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "Neighborhood Clean-up Day",
    date: "Oct 22, 2023",
    time: "9:00 AM - 1:00 PM",
    location: "Main Street",
    image: "https://images.unsplash.com/photo-1604187352516-4f27a4e9e902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYW4lMjB1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "Local Business Networking",
    date: "Oct 28, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center",
    image: "https://images.unsplash.com/photo-1608476267687-0ea46b7e10e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1c2luZXNzJTIwbmV0d29ya2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

const EventsList = () => {
  return (
    <section className="section-container bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-accent2-50 text-accent2-600 font-medium mb-4 text-sm">
              Upcoming Events
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Join community events</h2>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" icon={<Calendar size={16} />}>
            View All Events
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
  };
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  return (
    <div 
      className="glass-card overflow-hidden opacity-0"
      style={{
        animationName: 'slideUp',
        animationDuration: '0.5s',
        animationFillMode: 'forwards',
        animationDelay: `${0.2 + index * 0.1}s`
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-community-600">
            <Calendar size={16} className="mr-2 text-accent1-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-community-600">
            <Clock size={16} className="mr-2 text-accent1-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-community-600">
            <MapPin size={16} className="mr-2 text-accent1-500" />
            <span>{event.location}</span>
          </div>
        </div>
        <Button variant="secondary" className="w-full group">
          RSVP Now
          <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default EventsList;
