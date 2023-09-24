import styled from 'styled-components';
import logoLight from '../assets/img/logo-light.png';
import logoDark from '../assets/img/logo-dark.png';

import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useDarkMode();
  const logo = darkMode ? logoDark : logoLight;
  return (
    <StyledLogo>
      <Img src={logo} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
