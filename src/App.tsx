import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Game } from './pages/Game'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCart'
import { CurrencyProvider } from './context/Currency'
function App() {

  return (
    <CurrencyProvider>
      <ShoppingCartProvider>
        <Navbar />
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/about' element={<About />} />
            <Route path='/game' element={<Game />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </CurrencyProvider>
  )
}

export default App
