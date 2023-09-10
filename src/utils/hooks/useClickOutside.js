import { useEffect, useRef } from 'react';

export default function useClickOutside(handler) {
  const modalRef = useRef();
  useEffect(
    function () {
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          handler();
        }
      };
      document.addEventListener('click', handleClickOutside, true); //capturing phase, not bubbling phase

      return () => removeEventListener('click', handleClickOutside, true);
    },
    [handler]
  );

  return modalRef;
}
