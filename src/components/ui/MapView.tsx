"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Leaflet needs to be dynamically imported because it relies on window
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

interface MapViewProps {
  className?: string;
  markers?: Array<{ lat: number; lng: number }>;
}

export function MapView({ className, markers = [] }: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-full h-full bg-gray-900 ${className || ''}`} />;
  }

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      {/* 
        Using a dark tile layer for the futuristic aesthetic. 
        CartoDB Dark Matter is great for this.
      */}
      <MapContainer 
        center={[28.9931, 77.0151]} // Sonipat coordinates
        zoom={14} 
        zoomControl={false}
        className="w-full h-full"
        style={{ background: '#050508' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* We would use custom icons here for drivers/users, keeping it simple for now */}
        {markers.map((marker, idx) => (
          <Marker key={idx} position={[marker.lat, marker.lng]} />
        ))}
      </MapContainer>
      
      {/* Overlay gradient to blend map with UI */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-dark to-transparent z-[400] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-dark to-transparent z-[400] pointer-events-none" />
    </div>
  );
}
