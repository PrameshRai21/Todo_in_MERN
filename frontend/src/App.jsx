import AboutUs from "./components/AboutUs"
import Home from "./components/Home"
import Todo from "./components/Todo"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import RootLayout from "./components/RootLayout"
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "./features/authSlice"
import { useEffect } from "react"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<Home/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
    </Route>
  ))

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      const id = sessionStorage.getItem("id");
      if(id) {
        dispatch(login())
      }
  }, [])
  return (
    <>
      <RouterProvider router={ router } />
    </>
  )
}

export default App
