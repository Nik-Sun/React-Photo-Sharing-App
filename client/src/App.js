import { Footer } from "./components/Footer/Footer";
import { Navigation } from "./components/Navigation/Navigation";
import { PhotosList } from "./components/PhotosList/PhotosList";
import { Search } from "./components/Search/Search";
import { Route, Routes, useLocation } from 'react-router-dom';
import { Upload } from "./components/Upload/Upload";
import { Register } from "./components/Register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./components/Login/Login";
import { PhotoDetail } from "./components/PhotoDetails/PhotoDetails";
import { Home } from "./components/Home/Home";
import { useEffect, useState } from "react";

import styles from './public/css/loader.module.css'

function App() {
  const location = useLocation().pathname;

  const [transition, setTransition] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      console.log('fire loader');
      setTransition(false)
    }, 250)

    return () => {
      console.log('fire cleanup');
      setTransition(true)
    }
  }, [location])
  return (
    <div>
      <AuthProvider>

        <div className={transition ? styles.loaderWrapper : styles.loadedLoaderWrapper}>
          <div className={transition ? styles.loader : styles.loadedLoader}></div>
          <div className={transition ? styles.loaderSectionLeft : styles.loadedSectionLeft}></div>
          <div className={transition ? styles.loaderSectionRight : styles.loadedSectionRight}></div>
        </div >
        <Navigation />
        <Search />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/photos'} element={<PhotosList />} />
          <Route path={'/upload'} element={<Upload />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/photos/:photoId'} element={<PhotoDetail />} />
        </Routes>
        <Footer />
      </AuthProvider >
    </div >
  );
}

export default App;
