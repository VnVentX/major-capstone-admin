import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "../Pages/Index";
import "antd/dist/antd.css";
import "../index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Index} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
