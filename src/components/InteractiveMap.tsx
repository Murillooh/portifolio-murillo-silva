import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Maximize2, Minimize2 } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// São Paulo Coordinates
const CENTER = { lat: -23.5505, lng: -46.6333 };

export function InteractiveMap() {
  const [isMinimized, setIsMinimized] = useState(true);

  if (!hasValidKey) {
    return (
      <div className="w-full h-[400px] bg-card-bg border border-card-border rounded-3xl flex items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <div className="w-12 h-12 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center mx-auto mb-4 text-accent-purple">
            <MapPin size={24} />
          </div>
          <h3 className="text-white font-display text-lg mb-2">Google Maps API Key Required</h3>
          <p className="text-gray-400 text-sm mb-6">
            To view the interactive map, please add your API key in the AI Studio Secrets panel.
          </p>
          <div className="text-left space-y-4 text-xs">
            <p className="text-gray-500">
              <strong>1. Get an API key:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" rel="noopener" className="text-accent-teal hover:underline">Cloud Console</a>
            </p>
            <p className="text-gray-500">
              <strong>2. Add secret:</strong> Open Settings (⚙️) → Secrets → Add <code>GOOGLE_MAPS_PLATFORM_KEY</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      animate={{ height: isMinimized ? 250 : 500 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full rounded-3xl overflow-hidden border border-card-border relative group"
    >
      <div className="absolute inset-0 bg-accent-purple/5 pointer-events-none z-10" />
      
      {/* Dynamic Overlay for Interaction when minimized */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none"
          />
        )}
      </AnimatePresence>

      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={CENTER}
          defaultZoom={12}
          mapId="portfolio_map"
          colorScheme="DARK"
          gestureHandling={isMinimized ? "none" : "greedy"}
          disableDefaultUI={true}
          style={{ width: '100%', height: '100%' }}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        >
          <AdvancedMarker position={CENTER}>
            <Pin 
              background="#A855F7" 
              borderColor="#7C3AED" 
              glyphColor="#FFFFFF" 
              scale={1.2}
            />
          </AdvancedMarker>
        </Map>
      </APIProvider>
      
      {/* Minimize/Maximize Button */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute top-4 right-4 z-30 p-2 bg-card-bg/80 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-accent-purple/20 transition-colors"
        title={isMinimized ? "Expandir Mapa" : "Minimizar Mapa"}
      >
        {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
      </button>

      {/* Overlay info */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-card-bg/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl inline-flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple shrink-0">
            <MapPin size={16} />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Localização</p>
            <p className="text-xs text-white font-medium">São Paulo, Brasil</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
