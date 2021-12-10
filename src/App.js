import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogList from './LogList';


function App() {

    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={LogList}/>
           
          </Switch> 
        </Router>
    )
  }


export default App;
