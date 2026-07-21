"use client";

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { DivIcon } from "leaflet";
import { useEffect } from "react";
import type {
  ProducerCategory,
  ProducerPin,
} from "@/components/koperasi/peta-sebaran/producer-data";

const CATEGORY_COLOR: Record<ProducerCategory, string> = {
  pertanian: "#008aa9",
  kelautan: "#0369a1",
  hub: "#f59e0b",
};

function pinIcon(kategori: ProducerCategory) {
  return new DivIcon({
    className: "",
    html: `<div style="width:20px;height:20px;border-radius:9999px;background:${CATEGORY_COLOR[kategori]};border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function FlyToSelection({ pin }: { pin: ProducerPin | null }) {
  const map = useMap();

  useEffect(() => {
    if (pin) {
      map.flyTo([pin.lat, pin.lng], 10, { duration: 0.6 });
    }
  }, [pin, map]);

  return null;
}

export function DistributionMap({
  pins,
  selectedPin,
  onSelectPin,
}: {
  pins: ProducerPin[];
  selectedPin: ProducerPin | null;
  onSelectPin: (pin: ProducerPin) => void;
}) {
  return (
    <MapContainer
      center={[1.2, 124.5]}
      zoom={9}
      scrollWheelZoom
      className="size-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToSelection pin={selectedPin} />
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          icon={pinIcon(pin.kategori)}
          eventHandlers={{ click: () => onSelectPin(pin) }}
        />
      ))}
    </MapContainer>
  );
}
