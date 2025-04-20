import PopularMovies from '../components/PopularMovies/PopularMovies'
// import usePopularMovies from '../hooks/useFetchPopular'
import { popularMovies } from '../Samples/popularMoviesSample';

const PopularPage = () => {
    // const data = usePopularMovies();
    // console.log(data);
    const data = popularMovies.map(movie => ({
        ...movie,
        averageRating: movie.averageRating ?? 0,
        numVotes: movie.numVotes ?? 0,
        runtimeMinutes: movie.runtimeMinutes ?? 0,
        startYear: movie.startYear ?? 0,
        grossWorldwide: movie.grossWorldwide ?? 0,
        spokenLanguages: movie.spokenLanguages ?? [],
    }));
  return (
    //   <PopularMovies movies={data.movies}/>
    <PopularMovies movies={data}/>  
  )
}

export default PopularPage