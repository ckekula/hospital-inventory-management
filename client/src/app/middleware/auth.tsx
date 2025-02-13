import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../redux';

const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);
  const isLoginPage = window.location.pathname === '/login';

  useEffect(() => {
    if (!token && !isLoginPage) {
      router.push('/login');
    } else if (token && isLoginPage) {
      router.push('/');
    }
  }, [token, isLoginPage, router]);

  // Show nothing while checking authentication
  if (!token && !isLoginPage) {
    return null;
  }

  // Show nothing on login page if already authenticated
  if (token && isLoginPage) {
    return null;
  }

  return <>{children}</>;
};

export default AuthMiddleware;