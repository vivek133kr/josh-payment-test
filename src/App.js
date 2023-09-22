import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import PayNavbar from './Components/Navbar/Navbar';
import PaymentPage from './Components/PaymentPage/PaymentPage';
import { PrivateCounsellorRoute } from './Components/Routes/privateCounsellor';
import BasicModal from './Components/PaymentPage/PaymentLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PrivateLoginRoute } from './Components/Routes/loginPrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateCounsellorRoute>
              <PayNavbar />
              <PaymentPage />
            </PrivateCounsellorRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateLoginRoute>
              <GoogleOAuthProvider clientId="555163836458-ekq299o1li21bvqavnppmuqjt66vv95o.apps.googleusercontent.com">
                <BasicModal />
              </GoogleOAuthProvider>
            </PrivateLoginRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
