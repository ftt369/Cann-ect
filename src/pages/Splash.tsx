import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Cannect</h1>
        <p className="text-xl text-white">Connecting you to cannabis culture</p>
      </div>
    </div>
  );
}