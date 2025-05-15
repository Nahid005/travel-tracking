import { useSearchParams } from 'react-router'

export default function useUrlPosition() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return { lat, lng }
}
