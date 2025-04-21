import PopularMovies from '../components/PopularMovies/PopularMovies'
import usePopularMovies from '../hooks/useFetchPopular'

const PopularPage = () => {
  const { movies } = usePopularMovies(); 
  return (
      <PopularMovies movies={movies}/>
  );
};


export default PopularPage