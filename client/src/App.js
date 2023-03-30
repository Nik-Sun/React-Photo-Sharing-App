import { Footer } from "./components/Footer/Footer";
import { Navigation } from "./components/Navigation/Navigation";
import { PhotosList } from "./components/PhotosList/PhotosList";
import { Search } from "./components/Search/Search";
import { Route, Routes } from 'react-router-dom';
import { Upload } from "./components/Upload/Upload";
import { Register } from "./components/Register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./components/Login/Login";
import { Logout } from "./components/Logout/Logout";
import { PhotoDetail } from "./components/PhotoDetails/PhotoDetails";



function App() {
  return (
    <div>
      <AuthProvider>
        <Navigation />
        <Search />
        <Routes>
          <Route path={'/'} element={<PhotosList />} />
          <Route path={'/upload'} element={<Upload />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/logout'} element={<Logout />} />
          <Route path={'/photos/:photoId'} element={<PhotoDetail />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
