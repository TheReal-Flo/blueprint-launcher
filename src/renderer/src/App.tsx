import './index.scss';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from './pages/Start';
import Home from './pages/Home';
import Layout from './pages/Layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Start />} />
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
