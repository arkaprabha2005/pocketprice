import { useEffect } from 'react'
import { phones } from './data/phones'
import { ArrowLeft, ExternalLink, ShieldCheck, BatteryCharging, RotateCcw, Smartphone } from 'lucide-react'

const money = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(value)

const guidePhones = phones.filter((phone) =>
  phone.category === 'refurbished' && phone.price != null && phone.price <= 5000
)

function isUnavailable(phone) {
  return String(phone.availability ?? '').toLowerCase().includes('sold') ||
    String(phone.availability ?? '').toLowerCase().includes('unavailable')
}

export default function BuyingGuide() {
  useEffect(() => {
    document.title = 'Best Refurbished Phones Under ₹5,000 in India | PocketPrice'
    const description = 'Compare refurbished and pre-owned phones listed under ₹5,000 in India. Learn what to check about condition, battery, warranty, returns and current stock before buying.'
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 font-extrabold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white"><Smartphone size={21} /></span>
            Pocket<span className="-ml-2 text-blue-700">Price</span>
          </a>
          <a href="/" className="text-sm font-semibold text-blue-700 hover:text-blue-900">All phones</a>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-4 py-9 sm:px-6 sm:py-14">
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <a href="/" className="hover:text-blue-700">Home</a><span className="mx-2">/</span><span>Buying guides</span><span className="mx-2">/</span><span className="text-slate-700">Phones under ₹5,000</span>
        </nav>

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">PocketPrice buying guide</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          Best refurbished phones under ₹5,000 in India
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
          A phone under ₹5,000 can make sense as a basic daily device, a backup phone or a first smartphone. At this budget, many listings are pre-owned, refurbished or open-box, so the seller’s condition grading, return window and warranty matter as much as the model name.
        </p>
        <p className="mt-3 text-xs leading-5 text-slate-500">Listings below are drawn from PocketPrice’s catalogue. Prices and stock are not guaranteed live; open the retailer page and verify the exact variant before deciding.</p>

        <section className="mt-9 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <h2 className="text-lg font-extrabold text-slate-900">Quick checklist before buying used</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3"><BatteryCharging className="mt-1 shrink-0 text-blue-700" size={21}/><div><h3 className="font-bold">Battery and charging</h3><p className="mt-1 text-sm leading-6 text-slate-600">Ask about battery health, charging port condition and whether the phone heats up during use.</p></div></div>
            <div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-blue-700" size={21}/><div><h3 className="font-bold">Warranty and returns</h3><p className="mt-1 text-sm leading-6 text-slate-600">Read the return period, warranty exclusions and what happens if the device arrives faulty.</p></div></div>
            <div className="flex gap-3"><Smartphone className="mt-1 shrink-0 text-blue-700" size={21}/><div><h3 className="font-bold">Exact variant and condition</h3><p className="mt-1 text-sm leading-6 text-slate-600">Confirm RAM, storage, network bands, screen condition and whether accessories are included.</p></div></div>
            <div className="flex gap-3"><RotateCcw className="mt-1 shrink-0 text-blue-700" size={21}/><div><h3 className="font-bold">Software support</h3><p className="mt-1 text-sm leading-6 text-slate-600">Older phones may no longer receive security updates. Check the model’s support status before using it for banking.</p></div></div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="listing-heading">
          <h2 id="listing-heading" className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Phones listed under ₹5,000</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">These are options to investigate, not an independently tested ranking. Availability and prices can change.</p>

          {guidePhones.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {guidePhones.map((phone) => (
                <article key={phone.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                  <div className="flex gap-4">
                    <div className="flex h-28 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                      {phone.image ? <img src={phone.image} alt={phone.name} loading="lazy" className="h-full w-full object-contain" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} /> : <Smartphone className="text-slate-300" size={36}/>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-400">{phone.brand}</p>
                      <h3 className="mt-1 font-extrabold text-slate-900">{phone.name}</h3>
                      <p className="mt-2 text-xl font-black text-blue-800">{money(phone.price)}</p>
                      <p className="mt-1 text-xs text-slate-500">{phone.condition || 'Used / refurbished listing'}</p>
                      {isUnavailable(phone) && <p className="mt-2 text-xs font-bold text-red-600">Previously marked unavailable — recheck retailer</p>}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{phone.description || 'Check the retailer listing for the exact condition, specifications and included accessories.'}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{(phone.specs || []).map((spec) => <span key={spec} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{spec}</span>)}</div>
                  {phone.sourceUrl ? (
                    <a href={phone.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white hover:bg-blue-800">
                      Verify price and stock <ExternalLink size={16}/>
                    </a>
                  ) : <p className="mt-4 text-sm text-slate-500">Retailer link not available yet.</p>}
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">No matching listings are available in the current dataset. Check back after the catalogue is updated.</p>
          )}
        </section>

        <section className="mt-12 space-y-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <div><h2 className="text-xl font-extrabold text-slate-950">Is a refurbished phone under ₹5,000 worth it?</h2><p className="mt-3 text-sm leading-7 text-slate-600">It can be a reasonable choice for calls, messaging, light browsing and a backup device, provided the unit is in good condition. It may be a poor fit for demanding games, long-term software support or users who need dependable battery life. An unusually cheap listing is not automatically a good deal.</p></div>
          <div><h2 className="text-xl font-extrabold text-slate-950">What should you avoid?</h2><p className="mt-3 text-sm leading-7 text-slate-600">Avoid listings with unclear return terms, missing model numbers, no explanation of device condition or claims that cannot be verified. Check whether the phone is network-unlocked and whether the seller provides a valid invoice. Never rely on a product photo alone to judge condition.</p></div>
          <div><h2 className="text-xl font-extrabold text-slate-950">How PocketPrice lists prices</h2><p className="mt-3 text-sm leading-7 text-slate-600">PocketPrice is an independent phone-discovery site, not the seller. A displayed price is a reference from the catalogue and may be outdated. The retailer’s page is the final place to verify price, stock, condition, warranty and return terms. We do not process purchases on this site.</p></div>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"><ArrowLeft size={16}/> Back to PocketPrice</a>
          <a href="/#products" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-white">Browse all phones</a>
        </div>
      </article>
      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PocketPrice · Prices and availability must be verified with the retailer.
      </footer>
    </main>
  )
}
