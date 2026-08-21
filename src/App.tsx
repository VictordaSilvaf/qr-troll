import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { WifiBaitPage } from './pages/WifiBaitPage'
import { RevealPage } from './pages/RevealPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/t" element={<WifiBaitPage />} />
        <Route path="/t/reveal" element={<RevealPage />} />
      </Routes>
    </BrowserRouter>
  )
}
