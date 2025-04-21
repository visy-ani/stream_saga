import PopularMovies from '../components/PopularMovies/PopularMovies'
import usePopularMovies from '../hooks/useFetchPopular'

const PopularPage = () => {
    const data = usePopularMovies();
    console.log(data);
  return (
      <PopularMovies movies={data.movies}/>
  )
}

export default PopularPage