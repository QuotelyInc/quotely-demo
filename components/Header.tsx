import { ResponsiveNavigation } from '@/components/ResponsiveNavigation';

const menuItems = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Support', href: '/support' },
];

export const Header = () => (
  <ResponsiveNavigation
    logo="/logos/quotely-logo.svg"
    menuItems={menuItems}
    ctaButton={{ label: 'Start Free Trial', href: '/signup' }}
  />
);