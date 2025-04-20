import PopularMovies from '../components/PopularMovies/PopularMovies'
// import usePopularMovies from '../hooks/useFetchPopular'
import { popularMovies } from '../Samples/popularMoviesSample';

const PopularPage = () => {
    // const data = usePopularMovies();
    // console.log(data);
    const data = popularMovies
  return (
    //   <PopularMovies movies={data.movies}/>
    <PopularMovies movies={data}/>  
  )
}

export default PopularPage