import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Movie from './Movie';
import Recomendation from './Recomendation'




class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/movie" component={Movie} />
        <Route path="/recomendation" component={Recomendation} />
      </Router>
    );
  }
}

export default App;
