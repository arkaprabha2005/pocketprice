
import { useEffect, useMemo, useState } from 'react'
import { phones } from './data/phones'
import BuyingGuide from './BuyingGuide'
import InfoPages from './InfoPages'
import {
  Smartphone, Search, Menu, X, ChevronRight,
  ArrowRight, Heart, SlidersHorizontal, Star, Zap, ShieldCheck,
  Truck, BadgePercent, RefreshCw, SmartphoneNfc, ArrowUpDown,
  Info, ExternalLink
} from 'lucide-react'
const categories = [
  { label: 'Under ₹5,000', max: 5000, icon: Smartphone },
  { label: 'Under ₹10,000', max: 10000, icon: BadgePercent },
  { label: 'Under ₹20,000', max: 20000, icon: Zap },
  { label: '5G Phones', key: '5g', icon: SmartphoneNfc },
  { label: 'Premium', key: 'premium', icon: Star },
  { label: 'Refurbished', key: 'refurbished', icon: RefreshCw },
]

// Listing prices and availability are supplied by the product dataset; they are not live-verified.

const money = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

function Logo() {
  return (
    <a href="#home" className="flex shrink-0 items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm">
        <Smartphone size={23} strokeWidth={2.3} />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        Pocket<span className="text-blue-700">Price</span>
      </span>
    </a>
  )
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

function formatCheckedDate(value) {
  if (!value) return null
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

function isUnavailable(phone) {
  const status = String(phone.availability || '').toLowerCase().replace(/[ -]/g, '_')
  return status === 'sold_out' || status === 'unavailable' || status === 'out_of_stock'
}

function PhoneCard({ phone, onSelect, saved, onSave }) {
  const unavailable = isUnavailable(phone)
  const checkedDate = formatCheckedDate(phone.priceChecked)
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-50 p-5">
        <img
          src={phone.image}
          alt={`${phone.name} product image`}
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        <span className="absolute left-3 top-3 rounded-full border border-blue-100 bg-white/95 px-2.5 py-1 text-[11px] font-bold text-blue-800">
          {phone.tag}
        </span>
        <button
          type="button"
          aria-label={saved ? 'Remove from saved phones' : 'Save phone'}
          aria-pressed={saved}
          onClick={() => onSave(phone.id)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border bg-white transition ${
            saved
              ? 'border-rose-200 text-rose-600'
              : 'border-slate-200 text-slate-500 hover:text-rose-500'
          }`}
        >
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold text-slate-400">{phone.brand}</p>
        <h3 className="mt-1 min-h-12 text-base font-bold leading-6 text-slate-900">
          {phone.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {phone.specs.map((spec) => (
            <span
              key={spec}
              className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {phone.condition && (
              <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
                {phone.condition}
              </span>
            )}
            {unavailable && (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700">
                Currently unavailable
              </span>
            )}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {phone.sourceName ? `Listed at ${phone.sourceName}` : 'Retailer listing price'}
          </p>
          <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
            {phone.price == null ? 'Check retailer' : money(phone.price)}
          </p>
          {checkedDate && (
            <p className="mt-1 text-xs text-slate-400">Price checked: {checkedDate}</p>
          )}
          <p className="mt-2 text-xs leading-5 text-slate-500">
            {phone.description}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSelect(phone)}
              className="flex items-center justify-center gap-1 rounded-xl border border-slate-300 px-2 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Details <ArrowRight size={15} />
            </button>
            {phone.sourceUrl ? (
              <a
                href={phone.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Check ${phone.name} at ${phone.sourceName || 'retailer'}`}
                className={`flex items-center justify-center gap-1 rounded-xl px-2 py-3 text-sm font-bold text-white transition ${unavailable ? 'bg-slate-500 hover:bg-slate-600' : 'bg-blue-700 hover:bg-blue-800'}`}
              >
                {unavailable ? 'Check listing' : 'View deal'} <ExternalLink size={15} />
              </a>
            ) : (
              <button type="button" disabled className="rounded-xl bg-slate-200 px-2 py-3 text-sm font-bold text-slate-500">
                Link unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [savedPhones, setSavedPhones] = useState([])
  const [selectedPhone, setSelectedPhone] = useState(null)

  const filteredPhones = useMemo(() => {
    let result = phones.filter((phone) => {
      const search = query.trim().toLowerCase()
      const matchesSearch =
        !search ||
        [phone.name, phone.brand, phone.description, ...phone.specs]
          .join(' ')
          .toLowerCase()
          .includes(search)

      let matchesCategory = true

      if (activeCategory === 'under5000') {
        matchesCategory = phone.price != null && phone.price <= 5000
      } else if (activeCategory === 'under10000') {
        matchesCategory = phone.price != null && phone.price <= 10000
      } else if (activeCategory === 'under20000') {
        matchesCategory = phone.price != null && phone.price <= 20000
      } else if (activeCategory === '5g') {
        matchesCategory = phone.specs.includes('5G')
      } else if (activeCategory === 'premium') {
        matchesCategory = phone.category === 'premium'
      } else if (activeCategory === 'refurbished') {
        matchesCategory = phone.category === 'refurbished'
      }

      return matchesSearch && matchesCategory
    })

    if (sort === 'low') result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    if (sort === 'high') result = [...result].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
    if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [query, activeCategory, sort])

  const chooseCategory = (category) => {
    setActiveCategory(category)
    setMobileMenu(false)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleSaved = (id) => {
    setSavedPhones((current) =>
      current.includes(id)
        ? current.filter((phoneId) => phoneId !== id)
        : [...current, id],
    )
  }

  const resetFilters = () => {
    setQuery('')
    setActiveCategory('all')
    setSort('featured')
  }

  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  
useEffect(() => {
  const pages = {
    '/': {
      title: 'PocketPrice India | Compare Budget & Refurbished Phones',
      description:
        'Explore budget and refurbished smartphones in India. Compare phone features, check retailer-listed prices, and find options that fit your budget.',
    },
    '/about': {
      title: 'About PocketPrice | Our Smartphone Discovery Website',
      description:
        'Learn how PocketPrice presents smartphone listings, prices, specifications, and retailer information.',
    },
    '/contact': {
      title: 'Contact PocketPrice | Listing Corrections & Questions',
      description:
        'Contact PocketPrice about incorrect prices, outdated smartphone listings, broken links, or suggestions.',
    },
    '/privacy-policy': {
      title: 'Privacy Policy | PocketPrice',
      description:
        'Read how PocketPrice handles information, external retailer links, and potential advertising services.',
    },
    '/disclosure': {
      title: 'Price & Affiliate Disclosure | PocketPrice',
      description:
        'Understand PocketPrice retailer prices, availability information, external links, and potential affiliate relationships.',
    },
    '/guides/best-refurbished-phones-under-5000-india': {
      title: 'Best Refurbished Phones Under ₹5,000 in India | PocketPrice',
      description:
        'Learn what to check when comparing refurbished phones under ₹5,000, including condition, battery, warranty, and returns.',
    },
  }

  const page = pages[pathname]
  if (!page) return

  document.title = page.title

  let description = document.querySelector('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.name = 'description'
    document.head.appendChild(description)
  }
  description.content = page.description

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = `https://pocketprice.vercel.app${pathname}`
}, [pathname])


  if (pathname === '/guides/best-refurbished-phones-under-5000-india') {
    return <BuyingGuide />
  }

  if (['/about', '/contact', '/privacy-policy', '/disclosure'].includes(pathname)) {
    return <InfoPages path={pathname} />
  }

  return (
    <div id="home" className="min-h-screen bg-[#f7f9fc] text-slate-800">
      {/* Announcement strip */}
      <div className="bg-[#102b57] px-4 py-2 text-center text-xs font-medium text-blue-50 sm:text-sm">
        Compare smartphone prices and features before you buy.
        <a href="#products" className="ml-1 font-bold underline underline-offset-2">
          Explore phones
        </a>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Logo />

          <form
            className="mx-auto hidden max-w-xl flex-1 md:flex"
            onSubmit={(event) => {
              event.preventDefault()
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <div className="flex w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white">
              <Search size={19} className="shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search phones, brands or specifications..."
                aria-label="Search phones"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={17} className="text-slate-400" />
                </button>
              )}
            </div>
          </form>

          <button
            type="button"
            onClick={() => chooseCategory('all')}
            className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 lg:flex"
          >
            <Heart size={18} />
            Saved ({savedPhones.length})
          </button>

          <button
            type="button"
            aria-label={mobileMenu ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu((open) => !open)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
          >
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-3 md:hidden">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search smartphones..."
              aria-label="Search phones"
              className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden border-t border-slate-100 md:block" aria-label="Main navigation">
          <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-6 py-3 lg:px-8">
            <button onClick={() => chooseCategory('all')} className="shrink-0 text-sm font-bold text-blue-800">
              All Phones
            </button>
            <button onClick={() => chooseCategory('under5000')} className="shrink-0 text-sm font-medium text-slate-600 hover:text-blue-700">
              Under ₹5,000
            </button>
            <button onClick={() => chooseCategory('under10000')} className="shrink-0 text-sm font-medium text-slate-600 hover:text-blue-700">
              Under ₹10,000
            </button>
            <button onClick={() => chooseCategory('under20000')} className="shrink-0 text-sm font-medium text-slate-600 hover:text-blue-700">
              Under ₹20,000
            </button>
            <button onClick={() => chooseCategory('5g')} className="shrink-0 text-sm font-medium text-slate-600 hover:text-blue-700">
              5G Phones
            </button>
            <button onClick={() => chooseCategory('premium')} className="shrink-0 text-sm font-medium text-slate-600 hover:text-blue-700">
              Premium
            </button>
            <button onClick={() => chooseCategory('refurbished')} className="shrink-0 text-sm font-medium text-slate-600 hover:text-blue-700">
              Refurbished
            </button>
          </div>
        </nav>

        {mobileMenu && (
          <nav className="border-t border-slate-200 bg-white p-4 md:hidden" aria-label="Mobile navigation">
            {[
              ['All Phones', 'all'],
              ['Under ₹5,000', 'under5000'],
              ['Under ₹10,000', 'under10000'],
              ['Under ₹20,000', 'under20000'],
              ['5G Phones', '5g'],
              ['Premium Phones', 'premium'],
              ['Refurbished', 'refurbished'],
            ].map(([label, key]) => (
              <button
                key={key}
                onClick={() => chooseCategory(key)}
                className="block w-full border-b border-slate-100 px-2 py-3 text-left text-sm font-semibold text-slate-700"
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="px-4 pb-8 pt-6 sm:px-6 sm:pt-9 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#102b57]">
            <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border-[48px] border-white/5 sm:right-10 sm:top-0" />
            <div className="pointer-events-none absolute -bottom-40 right-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100">
                  <Zap size={14} /> YOUR SMARTPHONE DISCOVERY GUIDE
                </span>
                <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Find your next phone.
                  <span className="mt-1 block text-sky-300">Know your price.</span>
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                  Explore smartphone features, compare options and discover
                  phones for every budget — from ₹5,000 to flagship territory.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    onClick={() => chooseCategory('under10000')}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-[#102b57] transition hover:bg-blue-50"
                  >
                    Explore budget phones <ArrowRight size={17} />
                  </button>
                  <button
                    onClick={() => chooseCategory('5g')}
                    className="rounded-xl border border-white/30 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Browse 5G phones
                  </button>
                </div>
                <p className="mt-4 text-xs leading-5 text-blue-200">
                  Prices are retailer-listed snapshots, not guaranteed live prices. Check the retailer before buying.
                </p>
              </div>

              <div className="hidden items-center justify-center lg:flex">
                <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <div className="absolute h-56 w-56 rounded-full bg-blue-400/10 blur-2xl" />
                  <div className="relative rotate-[-9deg] rounded-[2.5rem] border-[5px] border-slate-700 bg-slate-950 p-2 shadow-2xl">
                    <div className="flex h-64 w-36 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-300 via-blue-500 to-indigo-800">
                      <Smartphone size={90} strokeWidth={0.8} className="text-white/80" />
                    </div>
                  </div>
                  <div className="absolute bottom-7 left-0 rounded-2xl border border-white/10 bg-white p-3 shadow-xl">
                    <p className="text-[10px] font-semibold text-slate-500">YOUR BUDGET</p>
                    <p className="mt-0.5 text-lg font-black text-slate-900">Your choice.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category shortcuts */}
        <section className="px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Shop by budget"
              title="Find phones in your range"
              description="Start with your budget, then compare the options available."
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category, index) => {
                const Icon = category.icon
                const keys = ['under5000', 'under10000', 'under20000', '5g', 'premium', 'refurbished']
                return (
                  <button
                    key={category.label}
                    onClick={() => chooseCategory(keys[index])}
                    className={`group flex min-h-32 flex-col items-start justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-1 hover:shadow-md ${
                      activeCategory === keys[index]
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-blue-200'
                    }`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                      <Icon size={21} />
                    </span>
                    <span className="mt-4 text-sm font-extrabold text-slate-800">
                      {category.label}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      Explore <ChevronRight size={13} />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trust / value strip */}
        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-3 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-blue-50 p-2.5 text-blue-700"><SlidersHorizontal size={20} /></span>
              <div>
                <p className="font-bold text-slate-800">Compare clearly</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Understand features before choosing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-blue-50 p-2.5 text-blue-700"><ShieldCheck size={20} /></span>
              <div>
                <p className="font-bold text-slate-800">Transparent information</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Check retailer details and price dates.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-blue-50 p-2.5 text-blue-700"><Truck size={20} /></span>
              <div>
                <p className="font-bold text-slate-800">Retailer-directed shopping</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Purchases happen on the retailer's site.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product listing */}
        <section id="products" className="scroll-mt-40 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Explore the catalogue"
              title={
                activeCategory === 'under5000' ? 'Phones under ₹5,000' :
                activeCategory === 'under10000' ? 'Phones under ₹10,000' :
                activeCategory === 'under20000' ? 'Phones under ₹20,000' :
                activeCategory === '5g' ? 'Explore 5G phones' :
                activeCategory === 'premium' ? 'Premium phones' :
                activeCategory === 'refurbished' ? 'Refurbished phones' :
                query ? 'Search results' : 'Explore smartphones'
              }
              description="Explore retailer-listed phones by budget and features. Check the retailer's page for the latest price, condition and availability before buying."
              action={
                <button
                  onClick={resetFilters}
                  className="text-sm font-bold text-blue-700 hover:text-blue-900"
                >
                  Clear filters
                </button>
              }
            />

            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <SlidersHorizontal size={17} />
                <span>
                  Showing <strong className="text-slate-900">{filteredPhones.length}</strong> phone listings
                </span>
                {(query || activeCategory !== 'all') && (
                  <button onClick={resetFilters} className="ml-2 font-semibold text-blue-700 underline">
                    Reset
                  </button>
                )}
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <ArrowUpDown size={16} />
                Sort by
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>

            {filteredPhones.length ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPhones.map((phone) => (
                  <PhoneCard
                    key={phone.id}
                    phone={phone}
                    onSelect={setSelectedPhone}
                    saved={savedPhones.includes(phone.id)}
                    onSave={toggleSaved}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <Search size={34} className="mx-auto text-slate-300" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">No matching phones</h3>
                <p className="mt-2 text-sm text-slate-500">Try another search or clear your filters.</p>
                <button onClick={resetFilters} className="mt-5 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">
                  Show all phones
                </button>
              </div>
            )}

            <div className="mt-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              <Info size={17} className="mt-0.5 shrink-0" />
              <p>
                <strong>Before you buy:</strong> prices and availability can change, especially for used and refurbished phones.
                Check the retailer's listing for the current price, exact variant, condition, warranty and stock. PocketPrice is an independent discovery site and does not sell these phones directly.
              </p>
            </div>
          </div>
        </section>

        {/* Buying guides */}
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Buying guides</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Research before you buy</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Practical advice for choosing a phone, understanding refurbished condition and checking a deal before you spend.</p>
            <a href="/guides/best-refurbished-phones-under-5000-india" className="mt-5 flex max-w-2xl items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50">
              <span><span className="block font-bold text-slate-900">Best refurbished phones under ₹5,000 in India</span><span className="mt-1 block text-sm text-slate-500">What to check about condition, battery, warranty and returns.</span></span>
              <ArrowRight className="shrink-0 text-blue-700" size={20}/>
            </a>
          </div>
        </section>

        {/* Editorial section */}
        <section className="border-y border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Buy smarter</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
                The right phone isn't always the most expensive one.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                Compare battery life, display quality, performance, camera features and software
                support. Your budget should guide your choice, not marketing hype.
              </p>
              <button
                onClick={() => chooseCategory('under10000')}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Explore budget options <ArrowRight size={17} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['₹5,000', 'Entry-level phones'],
                ['₹10,000', 'Value-focused picks'],
                ['₹20,000', 'More features'],
                ['Premium', 'Flagship features'],
              ].map(([price, text]) => (
                <div key={price} className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5 sm:p-6">
                  <p className="text-xl font-black text-blue-800 sm:text-2xl">{price}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d1f3e] px-4 pb-8 pt-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <Smartphone size={22} />
                </span>
                <span className="text-xl font-extrabold">
                  Pocket<span className="text-sky-300">Price</span>
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-blue-100/70">
                Compare smartphone options, explore budget-friendly listings and find useful buying information before visiting a retailer.
              </p>
              <p className="mt-3 text-xs leading-5 text-blue-100/50">
                PocketPrice is an independent smartphone discovery website. Purchases, delivery and returns are handled by the retailer.
              </p>
            </div>

            <div>
              <h3 className="font-bold">Explore</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-blue-100/70">
                <button onClick={() => chooseCategory('under5000')} className="text-left hover:text-white">Phones under ₹5,000</button>
                <button onClick={() => chooseCategory('under10000')} className="text-left hover:text-white">Phones under ₹10,000</button>
                <button onClick={() => chooseCategory('under20000')} className="text-left hover:text-white">Phones under ₹20,000</button>
                <button onClick={() => chooseCategory('5g')} className="text-left hover:text-white">5G smartphones</button>
                <button onClick={() => chooseCategory('refurbished')} className="text-left hover:text-white">Refurbished phones</button>
              </div>
            </div>

            <div>
              <h3 className="font-bold">Information</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-blue-100/70">
                <a href="/about" className="hover:text-white">About PocketPrice</a>
                <a href="/contact" className="hover:text-white">Contact</a>
                <a href="/disclosure" className="hover:text-white">Price & affiliate disclosure</a>
                <a href="/privacy-policy" className="hover:text-white">Privacy policy</a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-xs leading-6 text-blue-100/60">
              Prices and availability can change. Verify the current price, condition, warranty and stock with the retailer before buying. PocketPrice does not sell or ship phones directly.
            </p>
            <p className="mt-4 text-xs text-blue-100/50">
              © {new Date().getFullYear()} PocketPrice. An independent phone discovery site.
            </p>
          </div>
        </div>
      </footer>

      {/* Product details dialog */}
      {selectedPhone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPhone(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-dialog-title"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 id="product-dialog-title" className="font-extrabold text-slate-900">Phone details</h2>
              <button onClick={() => setSelectedPhone(null)} aria-label="Close details" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 flex h-44 items-center justify-center rounded-xl bg-slate-50 p-4">
                <img src={selectedPhone.image} alt="" className="h-full max-w-full object-contain" />
              </div>
              <p className="text-xs font-semibold text-slate-400">{selectedPhone.brand}</p>
              <h3 className="mt-1 text-xl font-extrabold text-slate-900">{selectedPhone.name}</h3>
              <p className="mt-2 text-2xl font-black text-blue-800">{selectedPhone.price == null ? 'Check retailer for price' : money(selectedPhone.price)}</p>
              {selectedPhone.condition && <p className="mt-2 text-sm font-semibold text-violet-700">Condition: {selectedPhone.condition}</p>}
              {isUnavailable(selectedPhone) && <p className="mt-2 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">This listing was marked unavailable when checked. Visit the retailer to confirm current stock.</p>}
              {formatCheckedDate(selectedPhone.priceChecked) && <p className="mt-2 text-xs text-slate-400">Price checked: {formatCheckedDate(selectedPhone.priceChecked)}</p>}
              <p className="mt-3 text-sm leading-6 text-slate-600">{selectedPhone.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedPhone.specs.map((spec) => (
                  <span key={spec} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">{spec}</span>
                ))}
              </div>
              
<div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
  Prices and availability may change. Verify the details on the retailer's website.
</div>

{selectedPhone.sourceUrl ? (
                <a
                  href={selectedPhone.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800"
                >
                  {isUnavailable(selectedPhone) ? 'Check current retailer listing' : 'View deal at retailer'}
                  <ExternalLink size={16} />
                </a>
              ) : (
                <p className="mt-4 text-sm text-slate-500">A retailer link has not been added for this phone yet.</p>
              )}

              <button onClick={() => setSelectedPhone(null)} className="mt-4 w-full rounded-xl bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800">
                Back to catalogue
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
