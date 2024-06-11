import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Plan from "./pages/Plan";
import MySims from "./pages/MySims";
import Inside from "./pages/Inside";
import Main from "./layouts/Main";


import { PrivateRoute } from './components/PrivateRoute';
import { history } from './helpers/history';

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <Main>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/plan/:package_id' element={<Plan />} />
        <Route element={<PrivateRoute />}>
          <Route exact path='/account' element={<Account />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route exact path='/inside' element={<Inside />} />
          <Route exact path='/mysims' element={<MySims />} />
        </Route>
      </Routes>
    </Main>
  );
}

export default App;
