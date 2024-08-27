import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Home from "./pages/Home/Homes";
import Headers from "./components/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refresh } from "./services/userService"
import { USER_LOGIN } from "./redux/actions/action";


function App() {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userState = useSelector(state => state.user)
  const showHeader = location.pathname !== '/login' && location.pathname !== '/register';
  const nonSecurePaths = ['/register'] // khais bao nhung trang nao khi refresh maf chua login thif da ve trang login

  const handleRefresh = async () => {
    const res = await refresh()


    if (res.EC === 1) {
      dispatch(USER_LOGIN(res.DT.userRole))

    }
    else {
      const IsNotTrueWebToNavigate = nonSecurePaths.find((item) => item === window.location.pathname)
      if (!IsNotTrueWebToNavigate) {
        navigate("/login")
      }

    }
  }
  useEffect(() => {
    handleRefresh()
  }, [])

  // useEffect(() => {

  // }, [userState]);

  return (

    <div className="">
      {userState.isLoading ?
        <div id="spinner" className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
          <div className="spinner-grow text-primary" role="status"></div>
        </div>
        :
        <>
          {showHeader && <Headers />}
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          /></>
      }
    </div>
  );
}

export default App;
