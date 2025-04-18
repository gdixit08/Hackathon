import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout';
import HomePage from './pages/HomePage';
import SignupForm from './pages/Signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignupForm />} />
          {/* <Route path="signup" element={<SignupPage />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
