import { useNavigate } from 'react-router-dom';

export const useNavigateToMain = () => {
  const navigate = useNavigate();

  return () => navigate(`/main`, { replace: true });
};
