import { Home, Film, Plus, User, GraduationCap } from 'lucide-react';

export const NAVIGATION_CONFIG = {
  mainNav: [
    {
      href: '/',
      label: 'Home',
      description: 'Return to homepage'
    },
    {
      href: '/dashboard',
      label: 'Dashboard',
      description: 'Dashboard with personalized insights'
    },{
      href: '/reel',
      label: 'Reel',
      description: 'Explore trending videos'
    },
    {
      href: '/upload',
      label: 'Upload',
      description: 'Upload content for fact-checking'
    },
    {
      href: '/profile',
      label: 'Profile',
      description: 'User profile and settings'
    },
    {
      href: '/timeline',
      label: 'Education',
      description: 'Educational timeline'
    }
  ]
} as const;


interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isSpecial?: boolean;
}

// Updated navigation: Home, Reel, Upload, Profile, Education
export const MOBILE_NAV: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    href: '/'
  },
  {
    id: 'reel',
    label: 'Reel',
    icon: Film,
    href: '/reel'
  },
  {
    id: 'upload',
    label: 'Upload',
    icon: Plus,
    href: '/upload',
    isSpecial: true // Highlight the upload button
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    href: '/profile'
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    href: '/timeline'
  }
];