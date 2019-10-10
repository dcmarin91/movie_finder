import React, {Component} from 'react';
import './Movie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class Recomendation extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies:[],
      selected: String,
      genre_id : this.props.location.search.replace("?",""),
    }
  }
  render() {
    console.log(this.state.genre_id);
    return (
      <div className="App">
        <div>
          <AppBar  position="static" className="Logo">
            <Toolbar>
              <FontAwesomeIcon icon={faFilm} className="Logo" onClick={this.goHome.bind(this)}></FontAwesomeIcon>
              <Typography variant="h6">BUSCADOR DE PELICULAS</Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className = "container">
          <h3>RECOMENDACIONES</h3>
          <GridList cols={3}>
            {this.state.movies.map(movie =>
              <GridListTile onClick={this.handleMovie.bind(this)} key={movie.id} className="movie" value={movie.id}>
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
  goHome(){
    this.props.history.push('/');
  }

  async componentDidMount(){
    let response = await fetch("https://api.themoviedb.org/3/discover/tv?api_key=f3f8ed9199080cc5ed38d8a087af4f01&sort_by=popularity.desc&vote_average.gte=6&with_genres="+this.state.genre_id);
    let data = await response.json();
    this.setState({movies : data.results});
  }

  handleMovie(event){
    this.setState({selected: event.currentTarget.value})
    this.props.history.push('/movie?'+event.currentTarget.value); 
  }
}

export default Recomendation;
