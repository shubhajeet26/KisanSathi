// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { Cloud, Thermometer, Droplets, Layers, Navigation, Loader2 } from "lucide-react";
// import { useLanguage } from "@/lib/i18n/LanguageContext";

// // Fix default icon issue with Leaflet in React
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon,
//   iconRetinaUrl: markerIcon2x,
//   shadowUrl: markerShadow,
// });

// function UpdateMapCenter({ center }: { center: [number, number] }) {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center, map.getZoom());
//   }, [center, map]);
//   return null;
// }

// export default function MapPage() {
//   const { t } = useLanguage();
//   const [position, setPosition] = useState<[number, number] | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser");
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       (pos) => {
//         setPosition([pos.coords.latitude, pos.coords.longitude]);
//       },
//       (err) => {
//         setError("Unable to retrieve your location. Please check browser permissions.");
//         console.warn("Geolocation error:", err);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0
//       }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <div>
//         <h1 className="text-2xl font-display font-bold text-foreground">{t.mapTitle}</h1>
//         <p className="text-sm text-muted-foreground mt-1">{t.mapSubtitle}</p>
//       </div>

//       <div className="glass-card relative overflow-hidden rounded-2xl p-0.5 border border-border/50 shadow-sm" style={{ height: "450px" }}>
//         {!position ? (
//           <div className="w-full h-full flex flex-col items-center justify-center bg-muted/10">
//             {error ? (
//                <p className="text-sm font-medium text-critical px-6 text-center">{error}</p>
//             ) : (
//                <>
//                  <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
//                  <p className="text-sm font-medium text-foreground">Detecting your location...</p>
//                  <p className="text-xs text-muted-foreground mt-1">Please allow GPS access</p>
//                </>
//             )}
//           </div>
//         ) : (
//           <>
//             <MapContainer 
//               center={position} 
//               zoom={14} 
//               zoomControl={false}
//               className="w-full h-full rounded-2xl z-0"
//             >
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               <UpdateMapCenter center={position} />
//               <Marker position={position}>
//                 <Popup className="rounded-xl overflow-hidden shadow-xl border-none">
//                   <div className="text-center font-sans p-1">
//                     <p className="font-semibold text-sm text-foreground">Your Farm Location</p>
//                     <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
//                        Lat: {position[0].toFixed(5)}<br/>
//                        Lng: {position[1].toFixed(5)}
//                     </p>
//                   </div>
//                 </Popup>
//               </Marker>
//             </MapContainer>

//             {/* Floating Info Card Overlay */}
//             <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-md border border-border/50 rounded-xl p-3 shadow-lg animate-in fade-in slide-in-from-top-4">
//               <div className="flex items-center gap-2 mb-1.5">
//                  <Navigation className="w-4 h-4 text-primary" />
//                  <span className="text-sm font-bold text-foreground">Coordinates</span>
//               </div>
//               <div className="text-xs text-muted-foreground ml-6 space-y-1">
//                  <p>Latitude: <span className="font-mono font-medium text-foreground">{position[0].toFixed(5)}°</span></p>
//                  <p>Longitude: <span className="font-mono font-medium text-foreground">{position[1].toFixed(5)}°</span></p>
//               </div>
//             </div>
            
//             <div className="absolute bottom-4 right-4 z-10 bg-safe/90 text-safe-foreground border border-safe/30 rounded-full px-4 py-1.5 text-xs font-semibold shadow-xl backdrop-blur-md animate-pulse">
//               GPS Active
//             </div>
//           </>
//         )}
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//         {[
//           { icon: <Layers className="w-5 h-5" />, label: t.mapTotalArea, value: "12.5 acres" },
//           { icon: <Cloud className="w-5 h-5" />, label: t.mapWeatherZone, value: "Semi-arid" },
//           { icon: <Thermometer className="w-5 h-5" />, label: t.mapAvgTemp, value: "32°C" },
//           { icon: <Droplets className="w-5 h-5" />, label: t.mapRainfall, value: "650mm/yr" },
//         ].map((item, i) => (
//           <motion.div
//             key={item.label}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * i }}
//             className="glass-card p-4 flex flex-col items-center text-center gap-2"
//           >
//             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div>
//             <p className="text-xs text-muted-foreground">{item.label}</p>
//             <p className="font-display font-bold text-foreground text-sm">{item.value}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }





import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const latitude = 22.57; // temporary (Kolkata)
  const longitude = 88.36;

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>Your Farm Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}