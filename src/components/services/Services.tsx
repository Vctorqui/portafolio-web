import { SectionHeader } from './SectionHeader'
import { ServiceCard } from './ServiceCard'
import { services } from './data'

export const Services = () => {
  return (
    <section id='services' className='px-4 py-14 md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <SectionHeader
          eyebrow='services'
          title='Servicios web para una presencia digital clara y profesional'
          description='Cada sitio se piensa desde el objetivo del negocio, la experiencia del usuario y una base técnica lista para crecer.'
        />

        <div className='grid gap-4 md:grid-cols-2'>
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
