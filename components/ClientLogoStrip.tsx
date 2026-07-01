import Image from 'next/image'

const clients = [
  { name: 'Zwijsen', img: '/images/clients/zwijsen.svg', url: 'https://www.zwijsen.nl', w: 240, h: 80 },
  { name: 'Action', img: '/images/clients/action.png', url: 'https://www.action.com', w: 300, h: 130 },
  { name: 'Europarcs', img: '/images/clients/europarcs.png', url: 'https://www.europarcs.nl', w: 220, h: 90 },
  { name: 'TenneT', img: '/images/clients/tennet.png', url: 'https://www.tennet.eu', w: 260, h: 110 },
  { name: 'Rabobank', img: '/images/clients/rabobank.png', url: 'https://www.rabobank.nl', w: 300, h: 130 },
  { name: 'Provincie Gelderland', img: '/images/clients/gelderland.png', url: 'https://www.gelderland.nl', w: 220, h: 90 },
]

export default function ClientLogoStrip() {
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-6">
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase text-center">Clients I&apos;ve worked with</p>
      </div>
      <div className="border-y border-surface py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-10 items-center justify-items-center">
          {clients.map(({ name, img, url, w, h }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 transition-transform duration-300 hover:scale-110"
              aria-label={name}
            >
              {img ? (
                <Image
                  src={img}
                  alt={name}
                  height={h}
                  width={w}
                  className="w-auto h-auto max-w-full object-contain"
                  style={{ maxWidth: w, maxHeight: h }}
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
      </div>
    </section>
  )
}
