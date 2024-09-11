'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Smile } from 'lucide-react'
import { Button } from "@/components/ui/button"

const utahCities = [
  "Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem", "Sandy", "Ogden", "St. George", "Layton", "Taylorsville",
  "South Jordan", "Lehi", "Millcreek", "Cottonwood Heights", "Murray", "Bountiful", "Logan", "Roy", "Draper", "Riverton",
  "Spanish Fork", "Pleasant Grove", "Herriman", "Tooele", "Springville", "Midvale", "Cedar City", "Kaysville", "Holladay", "American Fork"
]

export function UtahDentistSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const filtered = utahCities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCities(filtered)
    setIsOpen(searchTerm.length > 0 && filtered.length > 0)
  }, [searchTerm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleCitySelect = (city: string) => {
    setSearchTerm(city)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault()
      listRef.current?.firstElementChild?.focus()
    }
  }

  const handleSearch = () => {
    console.log(`Searching for dentists in ${searchTerm}`)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <Smile className="inline-block w-12 h-12 text-blue-500 mb-2" />
        <h2 className="text-2xl font-bold text-blue-800">Find a Dentist in Utah</h2>
        <p className="text-sm text-blue-600">Smile brighter with our local dental experts</p>
      </div>
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter a city in Utah"
            className="w-full pl-10 pr-4 py-3 text-lg border-2 border-blue-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-blue-800 placeholder-blue-300"
            aria-label="Search for a dentist in Utah"
            aria-autocomplete="list"
            aria-controls="utah-cities-list"
            aria-expanded={isOpen}
          />
          <Button 
            onClick={handleSearch}
            className="rounded-r-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200"
          >
            Search
          </Button>
        </div>
        {isOpen && (
          <ul
            ref={listRef}
            id="utah-cities-list"
            className="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-md shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {filteredCities.map((city, index) => (
              <li
                key={city}
                onClick={() => handleCitySelect(city)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCitySelect(city)
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    const nextSibling = e.currentTarget.nextElementSibling as HTMLElement
                    nextSibling?.focus()
                  }
                  if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    const prevSibling = e.currentTarget.previousElementSibling as HTMLElement
                    prevSibling ? prevSibling.focus() : inputRef.current?.focus()
                  }
                }}
                className="px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none cursor-pointer text-blue-800"
                role="option"
                tabIndex={0}
                aria-selected={index === 0}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-4 text-center text-sm text-blue-600">Find top-rated dentists in your area</p>
    </div>
  )
}