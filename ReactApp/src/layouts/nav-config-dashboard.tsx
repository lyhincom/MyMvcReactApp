import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  private?: boolean;
};

export const navData = [
  {
    title: 'Hello World',
    path: '/hello-world',
    icon: icon('ic-blog'),
  },
  {
    title: 'Basic Input',
    path: '/basic-input',
    icon: icon('ic-blog'),
  },
  {
    title: 'Basic Input With List',
    path: '/basic-input-with-list',
    icon: icon('ic-blog'),
  },
  {
    title: 'Component Input',
    path: '/component-input',
    icon: icon('ic-blog'),
  },
  {
    title: 'Component Output',
    path: '/component-output',
    icon: icon('ic-blog'),
  },
  {
    title: 'Unrelated Components',
    path: '/unrelated-components',
    icon: icon('ic-blog'),
  },
  {
    title: 'Sign In Page',
    path: '/sign-in-page',
    icon: icon('ic-blog'),
  },
  {
    title: 'Private Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
    private: true,
  },
  {
    title: 'Private User',
    path: '/user',
    icon: icon('ic-user'),
    private: true,
  },
  {
    title: 'Private Product',
    path: '/products',
    icon: icon('ic-cart'),
    private: true,
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Private Blog',
    path: '/blog',
    icon: icon('ic-blog'),
    private: true,
  },
  {
    title: 'Private Not found',
    path: '/404',
    icon: icon('ic-disabled'),
    private: true,
  },
];
