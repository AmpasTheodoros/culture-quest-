import Link from 'next/link'

const cities = [
  { id: 1, name: 'Paris', country: 'France' },
  { id: 2, name: 'Tokyo', country: 'Japan' },
  { id: 3, name: 'Rome', country: 'Italy' },
]

export default function Cities() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Choose a City to Explore</h1>
      <ul className="space-y-4">
        {cities.map((city) => (
          <li key={city.id}>
            <Link href={`/cities/${city.id}`} className="text-blue-500 hover:underline">
              {city.name}, {city.country}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}