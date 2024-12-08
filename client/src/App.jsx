import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import About from './pages/About';

import Dashboard from './pages/Dashboard';
import Header from "./components/Header";
import Footer from "./components/Footer";
import '../src/firebase'
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";

import Blog from "./pages/Blog";
import Register from './components/Register';
import BecomeMentor from "./pages/BecomeMentor";
import Search from "./pages/Search";
import Product from "./pages/Product";
import GamePage from "./pages/GamePage";
import Library from "./pages/Library";


const App = () => {
  
  return (
   
   <BrowserRouter>
   <ScrollToTop />
   <Header />
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/about" element={ <About /> } />
      <Route path="/sign-up" element={ <SignUp /> } />
      <Route path="/sign-in" element={ <SignIn /> } />
      <Route path='/search' element={<Search />} />
   
     
      <Route path="/products" element={ <Product /> } />
      <Route path="/blogs" element={ <Blog /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/becomeamentor" element={ <BecomeMentor /> } />
      
     
      <Route element={<PrivateRoute />}> 
      <Route path="/dashboard" element={ <Dashboard /> } />
      </Route>

      <Route element={<OnlyAdminPrivateRoute />}> 
      <Route path="/create-post" element={ <CreatePost /> } />
      <Route path="/update-post/:postId" element={ <UpdatePost /> } />
      </Route>

      
      
      <Route path="/post/:postSlug" element={ <PostPage /> } />
      <Route path="/game/:id" element={<GamePage />} />
      <Route path="/library" element={<Library />} />
    </Routes>
    <Footer />
   </BrowserRouter>
 
  )
}

export default App
