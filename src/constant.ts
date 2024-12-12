// List of routes that necessitate user authentication to access
export const protectedRoutes = [
  '/profile',
  '/profile/:page*',
  '/post/:page*',
  '/admin',
  '/login',
  '/register',
];

// define table columns value
export const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];

// Define dropdown category
export const categories = [
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Flowers', label: 'Flowers' },
  { value: 'Landscaping', label: 'Landscaping' },
  { value: 'Succulents', label: 'Succulents' },
  { value: 'Indoor Plants', label: 'Indoor Plants' },
  { value: 'Others', label: 'Others' },
];

// Define motion variants
export const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
