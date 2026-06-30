import Image from 'next/image'

const clients = [
  { name: 'Action', img: '/images/clients/action.png', url: 'https://www.action.com', w: 300, h: 130 },
  { name: 'Europarcs', img: '/images/clients/europarcs.png', url: 'https://www.europarcs.nl', w: 220, h: 90 },
  { name: 'Gadero', img: '/images/clients/gadero.png', url: 'https://www.gadero.nl', w: 220, h: 90 },
  { name: 'TenneT', img: '/images/clients/tennet.png', url: 'https://www.tennet.eu', w: 260, h: 110 },
  { name: 'Rabobank', img: '/images/clients/rabobank.png', url: 'https://www.rabobank.nl', w: 300, h: 130 },
  { name: 'Provincie Gelderland', img: '/images/clients/gelderland.png', url: 'https://www.gelderland.nl', w: 220, h: 90 },
]

export default function ClientLogoStrip() {
  return (
    <section className="border-y border-surface py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-10 text-center">Clients I&apos;ve worked with</p>
        <div className="grid grid-cols-3 gap-x-12 gap-y-10 items-center justify-items-center">
          {clients.map(({ name, img, url, w, h }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
              style={{ width: w, height: h }}
              aria-label={name}
            >
              {img ? (
                <Image
                  src={img}
                  alt={name}
                  height={h}
                  width={w}
                  className="max-h-full max-w-full w-auto h-auto object-contain"
                />
              ) : (
                <span className="text-text-muted font-display font-semibold text-lg">
                  {name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
