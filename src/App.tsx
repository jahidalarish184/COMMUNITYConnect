
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventSignup from "./pages/EventSignup";
import Forum from "./pages/Forum";
import Volunteers from "./pages/Volunteers";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Messaging from "./components/Messaging";
import Auth from "./pages/Auth";
import ProfileEdit from "./pages/ProfileEdit";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event-signup" element={<EventSignup />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/privacy" element={<NotFound />} />
          <Route path="/terms" element={<NotFound />} />
          <Route path="/accessibility" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Messaging />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
