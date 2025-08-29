import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import PricingPage from './pages/PricingPage/PricingPage'
import CalculatorPage from './pages/CalculatorPage/CalculatorPage'
import ComparePage from './pages/ComparePage/ComparePage'
import './styles/global.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
