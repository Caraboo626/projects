import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import script from './web_pages/script';

function App() {
  return(
    <div className='App'>
      <Header />
      <Outlet />
      <Footer/>
    </div>
    );
}

export default App;
