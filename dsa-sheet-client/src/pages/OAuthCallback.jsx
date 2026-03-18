import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const OAuthCallback = () => {
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace('#', '?')).get('token');

    if (!token) {
      navigate('/login?error=oauth_failed', { replace: true });
      return;
    }

    window.history.replaceState(null, '', window.location.pathname);

    loginWithToken(token)
      .then(() => navigate('/dashboard', { replace: true }))
      .catch(() => navigate('/login?error=oauth_failed', { replace: true }));
  }, [loginWithToken, navigate]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-gray-950">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-sky-500" />
      <p className="text-sm text-gray-500">Signing you in…</p>
    </div>
  );
};

export default OAuthCallback;
