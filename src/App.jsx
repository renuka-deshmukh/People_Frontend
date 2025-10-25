import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'

function App() {


 return(

 <AuthProvider>
       <Navbar /> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          {/* <Route path="/product/:id" element={<>} /> */}
          {/* <Route path="/products/:category" element={<ProductsPage />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>



 )
}

export default App
