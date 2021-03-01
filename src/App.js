import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./Pages/Index";
import "antd/dist/antd.css";
import "./index.css";
import AuthenticatedComponent from "./Components/auth/AuthenticatedComponent";
import Login from "./Pages/Login";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthenticatedComponent>
            <Route path="/" component={Index} />
          </AuthenticatedComponent>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
