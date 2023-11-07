//import ReactDOM from 'react-dom/client'
//import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css'

import App from './utils/App.jsx'
import Error from './pages/Error.jsx'
//import SavedBooks from './pages/SavedBooks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        //element: <SearchBooks />
      }, {
        path: '/saved',
        //element: <SavedBooks />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
