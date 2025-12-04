export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  live_link?: string; // Changed to match DB column common naming convention or mapping
  details_link?: string;
  created_at?: string;
}

export interface SkillItem {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export interface SiteSetting {
  key: string;
  value: string;
}

// Color theme configuration for different pages
export interface PageTheme {
  primary: string; // Hex code for primary color
  bgLight: string; // Hex code for light background
  bgDark: string; // Hex code for dark background
  textLight: string;
  textDark: string;
  navActive: string;
}