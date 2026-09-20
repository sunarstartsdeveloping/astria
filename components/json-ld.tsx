export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": "https://www.astria.co.in/#business",
        "name": "Astria & Co.",
        "alternateName": ["Astria", "Astria and Co", "Astria Creative"],
        "url": "https://www.astria.co.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.astria.co.in/logo-mark-green.png",
          "caption": "Astria & Co. Logo",
        },
        "image": "https://www.astria.co.in/logo-mark-green.png",
        "description":
          "Astria & Co. is a digital agency providing website development, Meta ads management, business automation, WhatsApp workflows, and graphic design in Narnaul, Rewari, Gurugram, Delhi NCR, and worldwide remotely.",
        "slogan": "Diverting world digitally",
        "telephone": "+918278455700",
        "email": "astriacreative.co@gmail.com",
        "priceRange": "$$",
        "currenciesAccepted": "INR, USD, EUR",
        "paymentAccepted": "Credit Card, Debit Card, UPI, Net Banking, Stripe, Razorpay",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Narnaul",
          "addressRegion": "Haryana",
          "postalCode": "123001",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.0445,
          "longitude": 76.1084,
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Narnaul",
            "sameAs": "https://en.wikipedia.org/wiki/Narnaul",
          },
          {
            "@type": "City",
            "name": "Rewari",
            "sameAs": "https://en.wikipedia.org/wiki/Rewari",
          },
          {
            "@type": "City",
            "name": "Gurugram",
            "sameAs": "https://en.wikipedia.org/wiki/Gurgaon",
          },
          {
            "@type": "AdministrativeArea",
            "name": "Delhi NCR",
          },
          {
            "@type": "State",
            "name": "Haryana",
          },
          {
            "@type": "Country",
            "name": "India",
          },
          {
            "@type": "AdministrativeArea",
            "name": "Worldwide (Remote Services)",
          },
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            "opens": "09:00",
            "closes": "19:00",
          },
        ],
        "sameAs": [
          "https://instagram.com/astriacreative.co",
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Core Digital Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Website & Web Application Development",
                "description":
                  "Custom responsive web development, Next.js web applications, and e-commerce platforms engineered for fast loading and search ranking.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Meta Ads Management",
                "description":
                  "Data-driven Facebook and Instagram advertising campaigns built for ROI, hyper-targeted lead generation, and scalable client acquisition.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Business Automation & WhatsApp Workflows",
                "description":
                  "Automated CRM workflows, customer onboarding pipelines, and WhatsApp API chatbots that streamline business operations.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "UI/UX & Graphic Design",
                "description":
                  "Premium brand identity design, visual collateral, marketing creatives, and conversion-focused web and mobile interfaces.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Video Editing & Motion Graphics",
                "description":
                  "Engaging short-form videos, promotional reels, and brand motion design tailored for organic retention and social media performance.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "High-Converting Sales Funnels",
                "description":
                  "Turnkey landing page funnels, opt-in sequences, and checkout systems designed to maximize visitor-to-customer conversion rates.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.astria.co.in/#website",
        "url": "https://www.astria.co.in",
        "name": "Astria & Co.",
        "alternateName": "Astria",
        "description": "Diverting world digitally — modern digital agency.",
        "publisher": {
          "@id": "https://www.astria.co.in/#business",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
