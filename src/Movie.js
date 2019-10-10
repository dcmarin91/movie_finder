import React, {Component} from 'react';
import './Movie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

class Movie extends Component {
  constructor(props){
    super(props);
    this.state = {
        movie : {},
        movie_id : this.props.location.search.replace("?",""),
        cast: [],
        video: {},
    }
  }
  render() {
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
          {Object.keys(this.state.movie).length > 0 &&
            <Grid container>
              <Grid item sm={5} key={this.state.movie.id} value={this.state.movie.id}>
                <Paper>
                  <h3>{this.state.movie.original_title}</h3>
                  <img src ={`https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`} alt = ""/>
                </Paper>
              </Grid>
              <Grid item sm={7}>
                <Paper>
                  <Grid container>
                    <p>{this.state.movie.overview}</p>
                    <Grid container>
                      <Grid item sm={2}>
                        <List
                        subheader={
                          <ListSubheader>
                            Rating
                          </ListSubheader>
                        }>
                          <ListItemText>
                            {this.state.movie.vote_average}/10
                          </ListItemText>
                        </List>
                      </Grid>
                      <Grid item sm={4}>
                        <List
                        subheader={
                          <ListSubheader component="div" id="nested-list-subheader">
                            Genres
                          </ListSubheader>
                        }>
                          {this.state.movie.genres.map(genre =>
                            <li value= {genre.id} key={genre.id} onClick={this.handleRecomendations.bind(this)} className = "genre">{genre.name}</li>
                          )}
                        </List>
                      </Grid>
                      <Grid item sm={4}>
                        <List
                        subheader={
                          <ListSubheader>
                            Cast
                          </ListSubheader>
                        }>
                          {this.state.cast.map(actor =>
                            <li>{actor.name}</li>
                          )}
                        </List>
                      </Grid>
                    </Grid>
                    <iframe width="820" height="315"
                      src={`https://www.youtube.com/embed/${this.state.video}`}>
                    </iframe>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          }
        </div>
      </div>
    );
  }
  async componentDidMount(){
    let [response, credits, trailers] = await Promise.all([
      fetch("https://api.themoviedb.org/3/tv/"+this.state.movie_id+"?api_key=f3f8ed9199080cc5ed38d8a087af4f01"),
      fetch("https://api.themoviedb.org/3/tv/"+this.state.movie_id+"/credits?api_key=f3f8ed9199080cc5ed38d8a087af4f01"),
      fetch("https://api.themoviedb.org/3/tv/"+this.state.movie_id+"/videos?api_key=f3f8ed9199080cc5ed38d8a087af4f01"),
    ]);
    let data = await response.json();
    let credit = await credits.json();
    let trailer = await trailers.json();
    this.setState({movie : data});
    this.setState({cast: credit.cast.slice(0,6)});
    this.setState({video: trailer.results[0].key});
  } 

  goHome(){
    this.props.history.push('/');
  }
  handleRecomendations(event){
    this.props.history.push('/recomendation?'+event.currentTarget.value); 
  }
}

export default Movie;
