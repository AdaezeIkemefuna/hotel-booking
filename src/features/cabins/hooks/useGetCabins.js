import { useQuery } from '@tanstack/react-query';
import { getAllCabins } from '../../../services/apiCabins';

export default function useGetCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getAllCabins,
  });
  return { isLoading, cabins };
}
