import { featuredProjects, ProjectRecord } from '@/src/constants/projects'
import { HomePage } from '@/src/features/home'
import { Layout } from '@/src/layouts/Public'

export async function getStaticProps() {
  return {
    props: {
      featured: featuredProjects,
    },
    revalidate: 60,
  }
}

const Index = ({ featured }: { featured: ProjectRecord[] }) => (
  <Layout>
    <HomePage featured={featured} />
  </Layout>
)

export default Index
