import { useState, useEffect } from 'react';

export default function UseScrollChecker() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      //   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //   const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;

      //   setIsBottom(scrollTop + window.innerHeight + 298 >= offsetHeight);

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

      setIsBottom(scrollTop + clientHeight >= scrollHeight - 298);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isBottom;
}
