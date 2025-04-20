import TVShows from '../components/TVShows/TVShows'
import { tvShows } from '../Samples/tvShowsSample'

const TVShowsPage = () => {
  return (
    <TVShows shows={tvShows}/>
  )
}

export default TVShowsPage