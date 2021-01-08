import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import "antd/dist/antd.css";
import "../index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
