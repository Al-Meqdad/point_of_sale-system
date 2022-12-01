import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import "./Index.css";
import store from "./Store";
import { Provider } from "react-redux";
import AllFather from "./AllFather";
import Login from "./Login/Login"
import { AuthProvider } from "./context/AuthProvider";

const Index = () => {
  return (
    <StrictMode>
      <AuthProvider>
   
      <Provider store={store}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllFather />} />
            <Route path="Login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>

      </Provider>
      </AuthProvider>
    </StrictMode>
  );
};

render(<Index />, document.getElementById("root"));
