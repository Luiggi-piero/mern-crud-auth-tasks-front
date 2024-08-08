import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import TaskFormPage from './pages/TaskFormPage';
import TasksPage from './pages/TasksPage';
import ProtectedRoute from './ProtectedRoute';
import { TasksProvider } from './context/TasksContext';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import { useLoading } from './context/LoadingContext.jsx';
import { useEffect } from 'react';
import setLoadingInterceptor from './interceptors/loadingInterceptor';

function App() {

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading })
  }, []);

  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />
            <Loading />

            <Routes>
              <Route path='/' element={<HomePage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>

              {/* Rutas protegidas (solo el usuario puede ver sus propias cosas como tareas) */}
              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TasksPage />}></Route>
                <Route path='/add-task' element={<TaskFormPage />}></Route>
                <Route path='/tasks/:id' element={<TaskFormPage />}></Route>
                <Route path='/profile' element={<ProfilePage />}></Route>
              </Route>

              {/* para cualquier otra ruta mostrara home */}
              <Route path='/*' element={<HomePage />}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  )
}

export default App

/**
 * tailwind
 * npm install react-hook-form  : maneja el cambio de estado y la validación
 * npm i axios  :  para hacer peticiones, biblioteca que engloba fetch
 * npm i js-cookie  :   para leer las cookies desde el front
 * npm install dayjs   : cambiar el formato de las fechas
 */