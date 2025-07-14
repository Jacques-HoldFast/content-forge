export interface TestimonialReview {
  rating: number;
  text: string;
  name: string;
  title: string;
  image?: string;
}

export interface SiteContent {
  siteId: string;
  siteName: string;
  contact: {
    phone: string;
    email: string;
  };
  navigation: {
    home: string;
    qualify: string;
    about: string;
    contact: string;
    complain: string;
  };
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    buttonText: string;
    buttonLink: string;
  };
  howItWorks?: {
    title: string;
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
  };
  testimonials?: {
    title: string;
    subtitle: string;
    reviews: TestimonialReview[];
  };
  qualify?: {
    title: string;
    subtitle: string;
    requirement1: {
      title: string;
      icon: string;
    };
    requirement2: {
      title: string;
      icon: string;
    };
    requirement3: {
      title: string;
      icon: string;
    };
    requirement4: {
      title: string;
      icon: string;
    };
  };
  complaintsProcedure?: {
    logo: string;
    title: string;
    step1: {
      title: string;
      item1: string;
      item2: string;
    };
    step2: {
      title: string;
      item1: string;
      item2: string;
    };
    step3: {
      title: string;
      description: string;
      address: string;
      email: string;
      fax: string;
    };
  };
  footer?: {
    address: string;
    hours: string;
    quickLinks: {
      title: string;
      aboutUs: string;
      loans: string;
      careers: string;
      contactUs: string;
    };
    legal: {
      title: string;
      terms: string;
      privacy: string;
      cookies: string;
      complaints: string;
    };
    social: {
      title: string;
      facebook: string;
      facebookIcon: string;
      twitter: string;
      twitterIcon: string;
      linkedin: string;
      linkedinIcon: string;
      instagram: string;
      instagramIcon: string;
    };
    copyright: string;
  };
  whyChooseUs?: {
    title: string;
    benefit1: {
      title: string;
      description: string;
      icon: string;
    };
    benefit2: {
      title: string;
      description: string;
      icon: string;
    };
    benefit3: {
      title: string;
      description: string;
      icon: string;
    };
  };
  lastUpdated: string;
}

export const SITE_IDS = ['site1', 'site2'] as const;
export type SiteId = typeof SITE_IDS[number];