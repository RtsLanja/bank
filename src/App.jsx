
import "./output.css"
import Home from "./components/home.jsx"
import Add from "./components/add.jsx"
import Update from "./components/update.jsx";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/add',
      element: <Add/> 
    },
    {
      path: 'client/:id/edit',
      element : <Update/>
    }
  ])

function App() {

  return <RouterProvider router={router}/>
}
export default App
