import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/Signup'
import App from './App.jsx'
import Error from './pages/Errorpage'
import Profile from './pages/Profile'
import RecipeForm from'./pages/Form/recipeInputForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/Signup',
        element: <Signup />
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/create-recipe',
        element: <RecipeForm/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
