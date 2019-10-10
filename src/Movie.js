import React, {Component} from 'react';
import './Movie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
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
        review: {},
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
            <Grid container sm={12}>
              <Grid item sm={5} key={this.state.movie.id} value={this.state.movie.id}>
                <Paper>
                  <h3>{this.state.movie.original_name}</h3>
                  <img src ={`https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`} alt = "" width='90%'/>
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
                    <Grid item sm={12}>
                      <iframe width='100%' height="315"
                        src={`https://www.youtube.com/embed/${this.state.video}`}>
                      </iframe>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          }
          {Object.keys(this.state.review).length > 0 &&
            <Grid container sm={12}>
              <h4>Reviews</h4>
              {this.state.review.results.map(review =>
                <div>
                  <p>{review.content}</p>
                  <a href = {review.url}>More info</a>
                  <hr />
                </div>
              )}
            </Grid>
          }
        </div>
      </div>
    );
  }
  async componentDidMount(){
    let [response, credits, trailers, reviews] = await Promise.all([
      fetch("https://api.themoviedb.org/3/tv/"+this.state.movie_id+"?api_key=f3f8ed9199080cc5ed38d8a087af4f01"),
      fetch("https://api.themoviedb.org/3/tv/"+this.state.movie_id+"/credits?api_key=f3f8ed9199080cc5ed38d8a087af4f01"),
      fetch("https://api.themoviedb.org/3/tv/"+this.state.movie_id+"/videos?api_key=f3f8ed9199080cc5ed38d8a087af4f01"),
      fetch("https://api.themoviedb.org/3/tv/"+this.state.movie_id+"/reviews?api_key=f3f8ed9199080cc5ed38d8a087af4f01"),
    ]);
    let data = await response.json();
    let credit = await credits.json();
    let trailer = await trailers.json();
    let review = await reviews.json();
    this.setState({movie : data});
    this.setState({review : review});
    this.setState({cast: credit.cast.slice(0,6)});
    if(trailer.results.length>0){
      this.setState({video: trailer.results[0].key});
    }
  } 

  goHome(){
    this.props.history.push('/');
  }
  handleRecomendations(event){
    this.props.history.push('/recomendation?'+event.currentTarget.value); 
  }
}

export default Movie;
