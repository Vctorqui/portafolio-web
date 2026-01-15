import Head from 'next/head'
import { SEO_DATA } from '../constants/seo'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: string
}

export const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
}: SEOProps) => {
  const siteTitle = title ? `${title} | ${SEO_DATA.title}` : SEO_DATA.title
  const siteDescription = description || SEO_DATA.description
  const siteUrl = canonical || SEO_DATA.url
  const siteOgImage = ogImage || SEO_DATA.ogImage

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name='description' content={siteDescription} />
      <meta name='keywords' content={SEO_DATA.keywords} />
      <meta name='author' content={SEO_DATA.author} />
      <link rel='canonical' href={siteUrl} />

      {/* Open Graph */}
      <meta property='og:title' content={siteTitle} />
      <meta property='og:description' content={siteDescription} />
      <meta property='og:url' content={siteUrl} />
      <meta property='og:image' content={siteOgImage} />
      <meta property='og:type' content={ogType} />
      <meta property='og:site_name' content='Victor Quiñones Portfolio' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={SEO_DATA.twitterHandle} />
      <meta name='twitter:title' content={siteTitle} />
      <meta name='twitter:description' content={siteDescription} />
      <meta name='twitter:image' content={siteOgImage} />
    </Head>
  )
}
