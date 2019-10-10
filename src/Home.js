import React, {Component} from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';


class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: 'avengers',
      movies:[],
      selected: String,
    }
    this.searchMovie =  this.searchMovie.bind(this);
    this.handleMovie = this.handleMovie.bind(this);
  }
  render(){
    return (
      <div className = "App">
        <div>
          <AppBar position="static" className="Logo">
            <Toolbar>
              <FontAwesomeIcon icon={faFilm} className="Logo" onClick={this.goHome.bind(this)}></FontAwesomeIcon>
              <Typography variant="h6">BUSCADOR DE PELICULAS</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className = "navbar">
          <label>Find a movie </label>
          <input
            onChange = {this.searchMovie} placeholder="Search for..."
          />
          <button onClick={this.handleSearch.bind(this)}>Search</button>
        </div>
        <div className = "container">
          <GridList cols={3}>
            {this.state.movies.map(movie =>
              <GridListTile onClick={this.handleMovie} key={movie.id} className="movie" value={movie.id}>
                <img src ={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} height="285" width="320"/>
                <GridListTileBar
                  title={movie.original_name}
                  subtitle={
                  <span>{movie.overview}</span>
                  }
                />
              </GridListTile>
            )}
          </GridList>
        </div>
      </div>
    );
  }
  async componentDidMount(){
    let response = await fetch("https://api.themoviedb.org/3/discover/tv?api_key=f3f8ed9199080cc5ed38d8a087af4f01&sort_by=popularity.desc&vote_average.gte=6");
    let data = await response.json();
    this.setState({movies : data.results});
  }
  searchMovie (event){
    this.setState({query: event.target.value});
  }
  goHome(){
    this.props.history.push('/');
  }
  handleMovie(event){
    this.setState({selected: event.currentTarget.value})
    this.props.history.push('/movie?'+event.currentTarget.value); 
  }
  async handleSearch(){
    let response = await fetch("https://api.themoviedb.org/3/search/tv?api_key=f3f8ed9199080cc5ed38d8a087af4f01&query="+this.state.query);
    let data = await response.json();
    this.setState({movies : data.results});
    this.props.history.push('/');
  }
}

export default withStyles({
  NavColor: {
    backgroundColor: "#2A3335",
    flexGrow: 1,
    marginRight: 1
  },
  card: {
    maxWidth: 345,
    borderRadius: 5,
    padding:30,
    margin: 10,
    backgroundColor: "#3c4245"
  },
  root: {
    textAlign: "center",
  },
  title: {
    flexGrow: 1,
  },
  image: {
    padding: 10,
  }
}) (Home);
