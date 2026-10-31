import { education, live, profile, stack } from "@/lib/content";

/** Structured data so search engines can tie the site to the person and their work. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${profile.site}/#website`,
        url: profile.site,
        name: `${profile.name} | Portfolio`,
        inLanguage: "en",
        publisher: { "@id": `${profile.site}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${profile.site}/#person`,
        name: profile.name,
        url: profile.site,
        image: `${profile.site}/opengraph-image.png`,
        jobTitle: profile.role,
        description:
          "Full stack developer building payment platforms, e-commerce and AI products with React, Next.js and Node.js.",
        worksFor: { "@type": "Organization", name: profile.employer },
        address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
        alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
        knowsAbout: stack.flatMap((g) => g.items),
        knowsLanguage: ["Bangla", "English", "Hindi", "Urdu"],
        sameAs: [profile.github, profile.linkedin],
        subjectOf: live.map((p) => ({
          "@type": "WebSite",
          name: p.name,
          url: p.href,
          description: `${p.kind}. ${p.scope}.`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
