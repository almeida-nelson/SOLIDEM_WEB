'use client';
import { useEffect } from 'react';

export default function AOSInit() {
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.default.init({ offset: 300, duration: 1000, easing: 'ease' });
    });
  }, []);
  return null;
}
