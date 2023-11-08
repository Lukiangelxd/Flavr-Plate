import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './utils/App.jsx'
import Error from './pages/Errorpage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />
      }, {
        path: '/saved',
        element: <S />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
