import styled from 'styled-components';
import { useRecentBookings } from './hooks/useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './hooks/useRecentStays';
import Stats from './Stats';
import useGetCabins from '../cabins/hooks/useGetCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2rem;
`;
export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1, numDays } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2 } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useGetCabins();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        cabins={cabins}
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
