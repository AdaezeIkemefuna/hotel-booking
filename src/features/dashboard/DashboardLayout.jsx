import styled from 'styled-components';
import useRecentBookings from './hooks/useRecentBookings';
import Spinner from '../../ui/Spinner';

export default function DashboardLayout() {
  const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2rem;
  `;
  const { recentBookings, isLoading: isLoading1 } = useRecentBookings();
  if (isLoading1) return <Spinner />;
  console.log(recentBookings);
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today&apos;s activity</div>
      <div>Chart stay durations</div>
      <div>Chart Sales</div>
    </StyledDashboardLayout>
  );
}
