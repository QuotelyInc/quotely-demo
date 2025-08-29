import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SearchAtlas from './components/SearchAtlas/SearchAtlas'
import Home from './pages/Home/Home'
import PricingPage from './pages/PricingPage/PricingPage'
import CalculatorPage from './pages/CalculatorPage/CalculatorPage'
import ComparePage from './pages/ComparePage/ComparePage'
import BlogList from './pages/Blog/BlogList'
import BlogPost from './pages/Blog/BlogPost'
import BlogEditor from './pages/Admin/BlogEditor'
import './styles/global.css'

function App() {
  return (
    <Router>
      <div className="app">
        <SearchAtlas />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin/blog-editor" element={<BlogEditor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
