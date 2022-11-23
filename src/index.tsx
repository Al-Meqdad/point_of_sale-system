import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import "./Index.css";
import store from "./Store"
import {Provider} from "react-redux"
import AllFather from "./AllFather"



const Index = () => {


  return (
    <StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllFather />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

render(<Index />, document.getElementById("root"));
