import { notFound } from 'next/navigation'
import CityQuiz from '@/components/CityQuiz'
import LanguagePhrases from '@/components/LanguagePhrases'

const cities = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    description: 'The City of Light',
    language: 'French',
    famousLandmarks: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral'],
    phrases: [
      { original: 'Bonjour', translation: 'Hello' },
      { original: 'Merci', translation: 'Thank you' },
      { original: "S'il vous plaît", translation: 'Please' },
    ],
  },
  // ... (add more cities with similar structure)
]

export default function City({ params }: { params: { id: string } }) {
    const city = cities.find(c => c.id === parseInt(params.id))
  
    if (!city) {
      notFound()
    }
  
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{city.name}</h1>
        <p className="text-xl mb-4">{city.country}</p>
        <p className="mb-6">{city.description}</p>
        
        <h2 className="text-2xl font-semibold mb-3">Famous Landmarks</h2>
        <ul className="list-disc pl-5 mb-6">
          {city.famousLandmarks.map((landmark, index) => (
            <li key={index}>{landmark}</li>
          ))}
        </ul>
        
        <LanguagePhrases language={city.language} phrases={city.phrases} />
        
        <CityQuiz cityName={city.name} />
      </div>
    )
  }