import { SEO } from '@/src/components/SEO'
import { About } from '@/src/components/services/About'
import { Benefits } from '@/src/components/services/Benefits'
import { CTA } from '@/src/components/services/CTA'
import { Hero } from '@/src/components/services/Hero'
import { Packages } from '@/src/components/services/Packages'
import { Process } from '@/src/components/services/Process'
import { Services } from '@/src/components/services/Services'
import { Footer } from '@/src/layouts/public/Footer'

const ServicesPage = () => {
  return (
    <>
      <SEO
        title='Desarrollo Web'
        description='Landing pages, sitios corporativos y portafolios profesionales desarrollados con Next.js, React y TypeScript por Victor Quiñones.'
        canonical='https://victorqui.dev/services'
      />
      <main className='min-h-screen text-white'>
        <Hero />
        <Services />
        <Process />
        <Benefits />
        <Packages />
        <About />
        <CTA />
      </main>
      <Footer language='es' />
    </>
  )
}

export default ServicesPage
