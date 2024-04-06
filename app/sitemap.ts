import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://vikinx.in',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://vikinx.in/about',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://vikinx.in/gallery',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://vikinx.in/contact',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://vikinx.in/events',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://vikinx.in/announcements',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://vikinx.in/terms-and-conditions',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://vikinx.in/privacy-policy',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://vikinx.in/sign-in',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://vikinx.in/sign-up',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://vikinx.in/onboarding',
      lastModified: 'Sat Apr 06 2024 16:02:02 GMT+0530',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}