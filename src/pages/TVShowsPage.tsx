import TVShows from '../components/TVShows/TVShows'
import useTop250TVShows from '../hooks/useFetchTVShows'

const TVShowsPage = () => {
  return (
    <TVShows shows={useTop250TVShows().data ?? []} />
  )
}

export default TVShowsPage