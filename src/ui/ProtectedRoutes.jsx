import { useEffect } from 'react';
import { useGetUser } from '../features/authentication/hooks/useGetUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Fullpage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  //1. Load authenticated user
  const { isLoading, isAuthenticated } = useGetUser();
  console.log(isAuthenticated);
  //2. If there is no user, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  //3. While loading, show spinner
  if (isLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  if (isAuthenticated) return children;
}
