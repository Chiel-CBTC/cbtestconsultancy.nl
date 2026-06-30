const clients = [
  { name: 'Rabobank', slug: 'rabobank' },
  { name: 'TenneT', slug: 'tennet' },
  { name: 'Action', slug: 'action' },
  { name: 'Europarcs', slug: 'europarcs' },
  { name: 'Gadero', slug: 'gadero' },
  { name: 'Provincie Gelderland', slug: 'gelderland' },
]

export default function ClientLogoStrip() {
  return (
    <section className="border-y border-surface py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {clients.map(({ name }) => (
            <span
              key={name}
              className="text-text-muted font-display font-semibold text-lg opacity-40 hover:opacity-80 transition-opacity cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
