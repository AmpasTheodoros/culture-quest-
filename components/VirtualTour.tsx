"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface Landmark {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface VirtualTourProps {
  cityName: string;
  landmarks: Landmark[];
}

export default function VirtualTour({ cityName, landmarks }: VirtualTourProps) {
  const [currentLandmark, setCurrentLandmark] = useState(0);

  const nextLandmark = () => {
    setCurrentLandmark((prev) => (prev + 1) % landmarks.length);
  };

  const prevLandmark = () => {
    setCurrentLandmark((prev) => (prev - 1 + landmarks.length) % landmarks.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Virtual Tour of {cityName}</h2>
      <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
        <Image
          src={landmarks[currentLandmark].imageUrl}
          alt={landmarks[currentLandmark].name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-purple-600">{landmarks[currentLandmark].name}</h3>
      <p className="mb-4 text-gray-600">{landmarks[currentLandmark].description}</p>
      <div className="flex justify-between">
        <button
          onClick={prevLandmark}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={nextLandmark}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
