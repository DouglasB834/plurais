import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from '@studio-freight/react-lenis';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Synchronize GSAP with Lenis ticker
    function update(time: number) {
      ScrollTrigger.update();
    }

    gsap.ticker.add(update);
    
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.5,
      smoothWheel: true 
    }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ReactLenis>
  );
};

export default App;
