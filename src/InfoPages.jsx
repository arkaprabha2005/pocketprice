import { useEffect } from 'react'
import { ArrowLeft, Smartphone, Mail, ExternalLink } from 'lucide-react'

const CONTACT_EMAIL = 'arka200515@gmail.com'

const pageContent = {
  '/about': {
    title: 'About PocketPrice',
    description: 'Learn what PocketPrice does, how listings are presented, and how to verify smartphone deals before buying.',
    eyebrow: 'About us',
  },
  '/contact': {
    title: 'Contact PocketPrice',
    description: 'Contact PocketPrice about corrections, listing issues, suggestions, or questions about the website.',
    eyebrow: 'Get in touch',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Read the PocketPrice privacy policy and learn how information, external links, and potential advertising services are handled.',
    eyebrow: 'Your privacy',
  },
  '/disclosure': {
    title: 'Price & Affiliate Disclosure',
    description: 'Understand how PocketPrice presents retailer prices, availability, external links, advertising, and potential affiliate relationships.',
    eyebrow: 'Transparency',
  },
}

function PageShell({ children, path }) {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <a href="/" className="flex items-center gap-2.5" aria-label="PocketPrice home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
              <Smartphone size={22} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Pocket<span className="text-blue-700">Price</span></span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50">
            <ArrowLeft size={16} /> Back to phones
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {children}
        <p className="mt-10 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
          Last updated: 16 October 2026. If you have questions about this page, contact{' '}
          <a className="font-semibold text-blue-700 underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </main>
      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PocketPrice · Independent smartphone discovery website
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
          <a className="hover:text-blue-700" href="/about">About</a>
          <a className="hover:text-blue-700" href="/contact">Contact</a>
          <a className="hover:text-blue-700" href="/privacy-policy">Privacy</a>
          <a className="hover:text-blue-700" href="/disclosure">Disclosure</a>
        </div>
      </footer>
    </div>
  )
}

export default function InfoPages({ path }) {
  const page = pageContent[path] || pageContent['/about']

  useEffect(() => {
    document.title = `${page.title} | PocketPrice`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = page.description
  }, [page.title, page.description])

  return (
    <PageShell path={path}>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">{page.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{page.title}</h1>

        {path === '/about' && (
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
            <p>PocketPrice helps people explore smartphone options by budget, brand, features, and listing condition. The goal is to make early research easier before a visitor decides whether to buy from a retailer.</p>
            <h2 className="text-lg font-extrabold text-slate-900">How PocketPrice works</h2>
            <p>Phone listings can include a retailer name, a listed price, basic specifications, a condition label, and a link to the retailer's website. Use these details as a starting point for comparison, then verify the exact model and variant, current price, stock, condition, warranty, return policy, and delivery terms on the retailer's own page.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Prices and editorial approach</h2>
            <p>Prices shown on PocketPrice are not guaranteed to be live or available to every buyer. Where a price-check date is displayed, it indicates when that listing was last checked by the site; it does not guarantee that the price or stock remains unchanged. We aim to present listings clearly and avoid describing an item as available when the listing is marked unavailable.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Independent website</h2>
            <p>PocketPrice is an independent smartphone discovery website. It does not sell, fulfil, deliver, or provide warranty service for the phones listed. Purchases and after-sales matters are handled by the relevant retailer.</p>
            <p>Questions or corrections? Visit our <a className="font-semibold text-blue-700 underline underline-offset-2" href="/contact">Contact page</a>.</p>
          </div>
        )}

        {path === '/contact' && (
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
            <p>Have you spotted an incorrect price, outdated listing, broken retailer link, or an issue with PocketPrice? Email us and include the phone name and the relevant page URL so we can understand the issue.</p>
            <a href={`mailto:${CONTACT_EMAIL}?subject=PocketPrice%20website%20query`} className="flex flex-wrap items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-blue-900 hover:border-blue-300">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white"><Mail size={22} /></span>
              <span className="min-w-0 flex-1"><span className="block font-extrabold">Email PocketPrice</span><span className="break-all text-sm">{CONTACT_EMAIL}</span></span>
              <ExternalLink size={17} />
            </a>
            <h2 className="text-lg font-extrabold text-slate-900">What to include</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>The phone name and the PocketPrice page or retailer URL.</li>
              <li>The price or listing detail that appears incorrect.</li>
              <li>A short description of your question or suggestion.</li>
            </ul>
            <p>Please do not send passwords, payment card details, or other sensitive information by email. PocketPrice cannot resolve an order, refund, delivery, or warranty claim on behalf of a retailer; contact the seller directly for those issues.</p>
          </div>
        )}

        {path === '/privacy-policy' && (
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
            <p>This policy explains how PocketPrice handles information when you visit this website. It is written for the site's current basic functionality and must be updated if additional analytics, accounts, forms, advertising, or other data-collection features are introduced.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Information you provide</h2>
            <p>You can browse the phone catalogue without creating an account. If you email us, we receive the email address and the information you choose to include so we can respond to your message.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Technical information</h2>
            <p>The hosting provider may process standard technical data needed to deliver, protect, and troubleshoot the website, such as request and error logs. PocketPrice does not currently offer user accounts or a checkout flow.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Cookies, analytics, and advertising</h2>
            <p>The site's current interface uses temporary in-page state for features such as search and filters. If analytics, advertising cookies, or services such as Google AdSense are added, those services may use cookies or similar technologies to operate, measure performance, prevent fraud, or show ads. This policy and any required consent controls should be updated before those services are enabled. Third-party providers' practices are governed by their own privacy policies.</p>
            <h2 className="text-lg font-extrabold text-slate-900">External retailer links</h2>
            <p>Links may take you to third-party retailer websites. Once you leave PocketPrice, the retailer's privacy policy and terms apply to your activity there. Review those policies before sharing personal information or making a purchase.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Your choices and contact</h2>
            <p>You can choose not to email us and can leave the site at any time. For privacy questions or requests concerning information you sent directly to PocketPrice, email <a className="font-semibold text-blue-700 underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
            <p className="rounded-xl bg-amber-50 p-4 text-amber-900">Before applying for advertising or adding analytics, review this policy against the services actually enabled on the live site and add any disclosures or consent mechanisms required for your visitors and location.</p>
          </div>
        )}

        {path === '/disclosure' && (
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
            <h2 className="text-lg font-extrabold text-slate-900">Prices and availability</h2>
            <p>Prices and stock can change without notice and may differ by variant, seller, location, payment method, or promotion. Any displayed price is a reference point, not a guarantee or binding offer. Confirm the final price, condition, warranty, returns, delivery charges, and availability on the retailer's website before buying.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Retailer links and commissions</h2>
            <p>PocketPrice links to external retailer listings, and purchases take place on those third-party websites. PocketPrice does not currently claim that every retailer link earns a commission. If affiliate links or commission-generating partnerships are used, we will identify that relationship clearly where appropriate. A commission, if offered, should not increase the price you pay unless the retailer's own terms say otherwise.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Advertising</h2>
            <p>PocketPrice may display third-party advertising in the future, subject to the applicable service's approval and policies. Advertisements, if enabled, are distinct from editorial descriptions and retailer listings. The presence of an ad should not be treated as an endorsement or guarantee of a product or seller.</p>
            <h2 className="text-lg font-extrabold text-slate-900">Corrections</h2>
            <p>If you notice a price, specification, availability, or link that needs attention, please email <a className="font-semibold text-blue-700 underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may not be able to independently verify every retailer update immediately, so always confirm the details with the seller before purchasing.</p>
          </div>
        )}
      </div>
    </PageShell>
  )
}
