import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

export default function Stats({ bookings, confirmedStays, cabins, numDays }) {
  const numBookings = bookings.length;
  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedStays.length;

  const numNights = confirmedStays.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );
  const numNightsAvailable = cabins.length * numDays;
  const occupancyRate = numNights / numNightsAvailable;

  return (
    <>
      <Stat
        title={'Bookings'}
        color={'blue'}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={'Sales'}
        color={'green'}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />{' '}
      <Stat
        title={'Check-ins'}
        color={'indigo'}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />{' '}
      <Stat
        title={'Occupancy Rate'}
        color={'yellow'}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + '%'}
      />{' '}
    </>
  );
}
