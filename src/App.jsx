import { useEffect, useMemo, useState } from 'react'
import { ShoppingCart, Search, Menu, Star, ChevronRight } from 'lucide-react'

const currency = (v) => new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(v)

function useBackend() {
  return useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
}

function Navbar({ cartCount }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/75 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-gray-100 sm:hidden"><Menu className="w-5 h-5" /></button>
          <a href="/" className="text-xl font-extrabold tracking-tight"><span className="text-pink-600">Kidz</span><span className="text-gray-900">Bazaar</span></a>
        </div>
        <div className="hidden sm:flex items-center gap-2 w-full max-w-xl mx-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search for tees, frocks, shoes..." className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-400" />
          </div>
          <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg">Search</button>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:inline text-sm text-gray-700 hover:text-gray-900">Offers</a>
          <a href="#" className="hidden sm:inline text-sm text-gray-700 hover:text-gray-900">New In</a>
          <button className="relative p-2 rounded-md hover:bg-gray-100">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
            Fashion for Little Stars in Bangladesh
          </h1>
          <p className="mt-4 text-gray-700 text-lg">Trendy, comfy and affordable outfits for babies, boys and girls. Cash on Delivery all over Bangladesh.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#collections" className="px-5 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg">Shop Collections</a>
            <a href="#winter" className="px-5 py-3 bg-white border border-pink-200 hover:border-pink-300 text-pink-700 rounded-lg">Winter Wear</a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 text-amber-500"><Star className="w-4 h-4 fill-amber-400" />4.8 rating</div>
            <span>•</span>
            <div>Free Size Exchange</div>
            <span>•</span>
            <div>COD Nationwide</div>
          </div>
        </div>
        <div className="relative">
          <img className="rounded-2xl shadow-xl w-full object-cover" src="https://images.unsplash.com/photo-1611428813653-aa606c998586?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxLaWRzJTIwZmFzaGlvbnxlbnwwfDB8fHwxNzYzMTIxNTk1fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Kids fashion" />
          <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur rounded-xl shadow-md p-4 hidden sm:block">
            <div className="font-semibold">Eid Collection</div>
            <div className="text-sm text-gray-600">Shop festive looks <ChevronRight className="inline w-4 h-4" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ p, onAdd }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden transition-all">
      <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
        <img src={p.images?.[0] || 'https://placehold.co/600x400'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="text-sm text-pink-600 font-medium">{p.category}</div>
        <h3 className="mt-1 font-semibold text-gray-900 line-clamp-1">{p.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold">{currency(p.price_bdt)}</div>
          <div className="flex items-center gap-1 text-amber-500 text-sm"><Star className="w-4 h-4 fill-amber-400" />{p.rating || 4.5}</div>
        </div>
        <button onClick={() => onAdd(p)} className="mt-3 w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg">Add to cart</button>
      </div>
    </div>
  )
}

function Collections({ products, onAdd }) {
  const groups = products.reduce((acc, p) => {
    (acc[p.category] = acc[p.category] || []).push(p); return acc
  }, {})
  const order = ['Girls', 'Boys', 'Baby', 'Winter Wear', 'School Wear', 'Accessories', 'Eid Collection']
  return (
    <section id="collections" className="py-12 sm:py-16 bg-gradient-to-b from-white to-pink-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {order.filter(k => groups[k]).map((cat) => (
          <div key={cat} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{cat}</h2>
              <a href="#" className="text-pink-600 hover:text-pink-700 text-sm">View all</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {groups[cat].map((p) => <ProductCard key={p.id || p._id || p.title} p={p} onAdd={onAdd} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="text-xl font-extrabold"><span className="text-pink-600">Kidz</span>Bazaar</div>
          <p className="mt-2 text-sm text-gray-600">Trendy kidswear, delivered across Bangladesh. Cash on delivery available.</p>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Customer Care</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>Shipping & Delivery</li>
            <li>Return & Exchange</li>
            <li>Size Guide</li>
            <li>Contact: 01XXXXXXXXX</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900">We accept</div>
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span className="px-2 py-1 rounded border">COD</span>
            <span className="px-2 py-1 rounded border">bKash</span>
            <span className="px-2 py-1 rounded border">Nagad</span>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-6">© {new Date().getFullYear()} KidzBazaar. All rights reserved.</div>
    </footer>
  )
}

function App() {
  const backend = useBackend()
  const [products, setProducts] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/products`)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length === 0) {
          // try seed if empty
          await fetch(`${backend}/api/products/seed`, { method: 'POST' })
          const res2 = await fetch(`${backend}/api/products`)
          const data2 = await res2.json()
          setProducts(data2)
        } else {
          setProducts(data)
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const onAdd = (p) => {
    setCartCount((c) => c + 1)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar cartCount={cartCount} />
      <Hero />
      <main>
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">Loading products...</div>
        ) : (
          <Collections products={products} onAdd={onAdd} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
