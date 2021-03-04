import React from 'react';
import axios from "axios";
import Movie from "./Movie"
import "./App.css"

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getmovies = async () =>{
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading: false});
  };
/*
  getmovies = async () =>{
    const movies = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
    console.log(movies.data.data.movies);
  };
*/
  componentDidMount(){
    this.getmovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return <section class="container">
      {isLoading ? (
       <div clas="loader">
          <span class="loader__text">
            Loading...</span>
        </div>
        ) : (
          <div class="movies">
            {movies.map(movie =>(
              <Movie 
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image} 
              />
            ))}
          </div>

      )}
    </section>
  }
}

export default App;
