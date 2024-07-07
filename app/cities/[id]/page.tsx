import { notFound } from 'next/navigation'
import LanguagePhrases from '@/components/LanguagePhrases'
import CityQuiz from '@/components/CityQuiz'
import VirtualTour from '@/components/VirtualTour'

const cities = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    description: 'The City of Light',
    language: 'French',
    famousLandmarks: [
      { 
        id: 'eiffel-tower',
        name: 'Eiffel Tower', 
        description: 'Iconic iron lattice tower on the Champ de Mars, named after engineer Gustave Eiffel.',
        imageUrl: '/images/paris/eiffel-tower.jpg'
      },
      { 
        id: 'louvre-museum',
        name: 'Louvre Museum', 
        description: "World's largest art museum and home to many famous works including the Mona Lisa.",
        imageUrl: '/images/paris/louvre-museum.jpg'
      },
      { 
        id: 'notre-dame',
        name: 'Notre-Dame Cathedral', 
        description: 'Medieval Catholic cathedral noted for its French Gothic architecture.',
        imageUrl: '/images/paris/notre-dame.jpg'
      },
    ],
    phrases: [
      { original: "Bonjour", translation: 'Hello', audioSrc: '/audio/french/bonjour.mp3' },
      { original: "Merci", translation: 'Thank you', audioSrc: '/audio/french/merci.mp3' },
      { original: "S'il vous plaît", translation: 'Please', audioSrc: '/audio/french/sil-vous-plait.mp3' },
    ],
  },
  // ... (add more cities with similar structure)
]

export default function City({ params }: { params: { id: string } }) {
  const city = cities.find(c => c.id === parseInt(params.id));

  if (!city) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">{city.name}</h1>
        <p className="text-xl mb-4 text-purple-600">{city.country}</p>
        <p className="mb-6 text-gray-600">{city.description}</p>
      </div>
      
      <VirtualTour cityName={city.name} landmarks={city.famousLandmarks} />
      
      <LanguagePhrases language={city.language} phrases={city.phrases} />
      
      <CityQuiz cityName={city.name} />
    </div>
  )
}