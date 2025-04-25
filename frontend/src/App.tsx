import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout';
import HomePage from './pages/HomePage';
import SignupForm from './pages/Signup';
import SigninPage from './pages/Signin';
import UploadPage from './pages/UploadPage';
import Profile from './pages/Profile';
import Dashboard from './pages/dashboard';
import Reconciliation from './pages/reconcillation';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path='profile' element={<Profile/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='reconcillation' element={<Reconciliation/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
