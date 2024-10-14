/* eslint-disable prettier/prettier */
declare module 'lucide-react' {
  import { SVGProps } from 'react';

  interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
  }

  export const User: (props: LucideProps) => JSX.Element;
  export const Settings: (props: LucideProps) => JSX.Element;
  export const Plus: (props: LucideProps) => JSX.Element;
  export const LogOut: (props: LucideProps) => JSX.Element;
  export const EyeIcon: (props: LucideProps) => JSX.Element;
  export const EyeOffIcon: (props: LucideProps) => JSX.Element;
  export const MailIcon: (props: LucideProps) => JSX.Element;
  export const Phone: (props: LucideProps) => JSX.Element;
  export const MapPin: (props: LucideProps) => JSX.Element;
  export const Loader: (props: LucideProps) => JSX.Element;
  export const ChevronUp: (props: LucideProps) => JSX.Element;
  export const ChevronDown: (props: LucideProps) => JSX.Element;
  export const Edit: (props: LucideProps) => JSX.Element;
  export const ShieldCheck: (props: LucideProps) => JSX.Element;
  export const Bookmark: (props: LucideProps) => JSX.Element;
  export const Trash2: (props: LucideProps) => JSX.Element;
  export const LayoutDashboard: (props: LucideProps) => JSX.Element;
  export const LayoutDashboard: (props: LucideProps) => JSX.Element;
  export const HelpCircle: (props: LucideProps) => JSX.Element;
  export const Leaf: (props: LucideProps) => JSX.Element;
}