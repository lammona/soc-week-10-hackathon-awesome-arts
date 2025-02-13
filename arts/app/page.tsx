import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const kids = [
  { name: "Rafael", image: "/placeholder.svg?height=200&width=300" },
  { name: "Nina", image: "/placeholder.svg?height=200&width=300" },
  { name: "Filip", image: "/placeholder.svg?height=200&width=300" },
  { name: "Emily", image: "/placeholder.svg?height=200&width=300" },
]

export default function Home() {



  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <header className="bg-pink-200 p-4">
        <h1 className="text-3xl font-bold text-center text-pink-800">Awesome Artwork</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kids.map((kid) => (
            <Card key={kid.name} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${kid.image})` }} />
                <div className="p-4 bg-white">
                  <h2 className="text-xl font-semibold mb-2 text-pink-700">{kid.name}</h2>
                  <div className="flex flex-col space-y-2">
                    <Link href={`/gallery/${kid.name.toLowerCase()}`}>
                      <Button className="w-full bg-purple-400 hover:bg-purple-500 text-white">View Gallery</Button>
                    </Link>
                    <Link href={`/upload/${kid.name.toLowerCase()}`}>
                      <Button className="w-full bg-green-400 hover:bg-green-500 text-white">Upload Artwork</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button className="bg-blue-400 hover:bg-blue-500 text-white">Add New Child</Button>
        </div>
      </main>

      <footer className="bg-pink-200 p-4 text-center text-pink-800">2025 Maternal Instincts</footer>
    </div>
  )
}

