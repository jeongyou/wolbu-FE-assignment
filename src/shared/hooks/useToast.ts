import { useEffect, useState } from 'react';

export const useToast = (duration = 2000) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [open, duration]);

  return { open, message, showToast };
};
