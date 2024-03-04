import { createBrowserRouter } from 'react-router-dom'
import ProductAdmin from './Admin/Products'
import LayoutAdmin from './Components/Layouts/Admin'
import VariantsAdmin from './Admin/Variants'
import NewsPageDemo from './Components/pages/NewsPageDemo'
import HomePage from './User/Pages/HomePage/HomePage';
import ProductPage from './User/Pages/ProductsPage/ProductsPage'
import NewsPage from './User/Pages/NewsPage/NewsPage';
import LoginPage from './User/Pages/LoginPage/LoginPage';
import SignupPage from './User/Pages/LoginPage/SignupPage';
import HstoryPage from './User/Pages/HstoryPage/Hstory';
import CartPage from './User/Pages/CartPage/CartPage';
import ProductDetail from './User/Pages/HomePage/ProductDetail'
import ScreenPage from './User/Pages/ProductsPage/ProductsPage'
import ContactPage from './User/Pages/contact'

export const router = createBrowserRouter([
  {
    path: '/admin',
    element: <LayoutAdmin />,
    children: [
      {
        path: '/admin/products',
        element: <ProductAdmin />
      },
      {
        path: '/admin/variants',
        element: <VariantsAdmin />
      },
      {
        path: '/admin/news',
        element: <NewsPageDemo />
      }
    ]
  },
  {
    path: '',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/products',
    element: <ProductPage />
  },
  {
    path: '/products/:id',
    element: <ProductDetail />
  },
  {
    path: '/news/:id',
    element: <NewsPage />
  },
  {
    path: '/news',
    element: <NewsPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/history',
    element: <HstoryPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
])
