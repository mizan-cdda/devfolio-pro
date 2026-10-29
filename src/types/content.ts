import type { StaticImageData } from 'next/image';
import type { BrandName } from '@/components/icons/brand-paths';

/* -------------------------------------------------------------------------- */
/*  Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

/** Year and month, for example `2024-03`. */
export type YearMonth = `${number}-${number}`;

export interface ImageAsset {
  /** A static import (`import cover from './images/cover.webp'`) so Next.js knows its size. */
  src: StaticImageData;
  /** Describe what the image shows. Use an empty string only for purely decorative images. */
  alt: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/*  Site                                                                       */
/* -------------------------------------------------------------------------- */

export type ThemeName = 'editorial' | 'studio' | 'ledger';
export type ColorMode = 'light' | 'dark' | 'system';

export type SectionId = 'about' | 'skills' | 'projects' | 'experience' | 'credentials' | 'contact';

export type ContactProvider =
  /** Opens the visitor's email app with the message pre-filled. Needs no account. */
  | { type: 'mailto' }
  /**
   * Any form service that accepts a JSON POST and answers with a 2xx status:
   * Formspree (https://formspree.io/f/xxxx), Basin, Getform, FormKeep and similar.
   */
  | { type: 'endpoint'; url: string; serviceName: string }
  /** Web3Forms (https://web3forms.com). The access key is designed to be public. */
  | { type: 'web3forms'; accessKey: string };

export interface SiteConfig {
  /** Canonical production URL without a trailing slash. `NEXT_PUBLIC_SITE_URL` overrides it. */
  url: string;
  /** BCP 47 language tag for `<html lang>`, for example `en` or `de`. */
  language: string;
  /** Open Graph locale, for example `en_US`. */
  locale: string;
  /** Browser tab title for the home page. Sub-pages use `%s · {titleSuffix}`. */
  title: string;
  titleSuffix: string;
  description: string;
  keywords: string[];
  theme: {
    default: ThemeName;
    defaultMode: ColorMode;
    /** Shows the theme picker to visitors. Handy for demos, usually off for a personal site. */
    allowVisitorThemeSwitch: boolean;
  };
  /** Turn sections off without deleting their content. Navigation follows automatically. */
  sections: Record<SectionId, boolean>;
  resume: {
    enabled: boolean;
    /** File name visitors get when downloading, for example `jordan-avery-resume.pdf`. */
    fileName: string;
    /**
     * `generated` builds the PDF from this config at build time.
     * `file` serves your own PDF from `public/` (set `filePath`, for example `/my-cv.pdf`).
     */
    source: 'generated' | 'file';
    filePath?: string;
  };
  contact: {
    heading: string;
    intro: string;
    provider: ContactProvider;
    /** Submissions faster than this are treated as bots. 3 to 5 seconds suits humans. */
    minSecondsBeforeSubmit: number;
  };
  /**
   * Shows a small "sample content" note in the footer. Set to `false` once the content is yours;
   * the content tests then also fail if any example.com links remain.
   */
  sampleContent: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Profile                                                                    */
/* -------------------------------------------------------------------------- */

export type SocialPlatform = BrandName | 'website' | 'email' | 'blog' | 'rss';

export interface SocialLink {
  platform: SocialPlatform;
  /** Visible label and accessible name, for example `GitHub`. */
  label: string;
  href: string;
  /** Shown next to the label in the contact section, for example `@jordanavery`. */
  handle?: string;
}

export interface Highlight {
  /** Short figure or phrase, for example `8 years` or `Remote since 2019`. */
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  /** Used where space is tight, for example the header wordmark. */
  shortName: string;
  role: string;
  /** The large hero statement. One sentence about the value you bring. */
  headline: string;
  /** Two or three sentences under the headline. */
  intro: string;
  location: string;
  /** Free text such as `UTC+1, overlaps with US East mornings`. */
  timezone?: string;
  email: string;
  availability: {
    status: 'available' | 'selective' | 'unavailable';
    label: string;
  };
  portrait?: ImageAsset;
  primaryCta: { label: string; href: string };
  about: {
    heading: string;
    paragraphs: string[];
    highlights: Highlight[];
  };
  socials: SocialLink[];
}

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export interface Skill {
  name: string;
  /** Marks the tools you want to be hired for. They are visually emphasised. */
  core?: boolean;
}

export interface SkillGroup {
  name: string;
  description?: string;
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/* -------------------------------------------------------------------------- */

export interface Outcome {
  /** The figure, for example `-38%` or `2.1s`. Only publish numbers you can back up. */
  value: string;
  label: string;
  /** How it was measured, for example `p75 LCP, CrUX, 28 days`. */
  context?: string;
}

export interface Challenge {
  title: string;
  detail: string;
}

export type ProjectLinkKind = 'live' | 'source' | 'writeup' | 'video';

export interface ProjectLink extends ExternalLink {
  kind: ProjectLinkKind;
}

export interface Project {
  /** URL segment for the case study page: `/projects/{slug}`. Lowercase, hyphenated. */
  slug: string;
  title: string;
  /** One sentence for cards and meta descriptions. */
  summary: string;
  /** Your role, for example `Lead frontend engineer`. */
  role: string;
  /** Free text such as `2024` or `2023 – 2024`. */
  period: string;
  /** Who it was for, for example `Client: logistics SaaS` or `Personal project`. */
  context: string;
  cover: ImageAsset;
  stack: string[];
  featured: boolean;
  links: ProjectLink[];
  /** The case study. Keep each part short and specific. */
  caseStudy: {
    problem: string;
    approach: string[];
    challenges: Challenge[];
    outcomes: Outcome[];
    learnings?: string[];
  };
}

/* -------------------------------------------------------------------------- */
/*  Experience                                                                 */
/* -------------------------------------------------------------------------- */

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';

export interface Experience {
  company: string;
  companyUrl?: string;
  role: string;
  employment: EmploymentType;
  location: string;
  start: YearMonth;
  /** Omit for your current role. */
  end?: YearMonth;
  summary: string;
  achievements: string[];
  stack: string[];
}

/* -------------------------------------------------------------------------- */
/*  Education, certifications, achievements                                    */
/* -------------------------------------------------------------------------- */

export interface Education {
  institution: string;
  qualification: string;
  location?: string;
  start: YearMonth;
  end?: YearMonth;
  notes?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issued: YearMonth;
  expires?: YearMonth;
  /** Public verification URL from the issuer. */
  credentialUrl?: string;
}

export interface Achievement {
  title: string;
  detail: string;
  year: string;
  url?: string;
}

export interface Credentials {
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
}

/* -------------------------------------------------------------------------- */
/*  Aggregate                                                                  */
/* -------------------------------------------------------------------------- */

export interface PortfolioContent {
  site: SiteConfig;
  profile: Profile;
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  credentials: Credentials;
}
