import { useNavigate } from 'react-router-dom';

interface UseNavigatePathProps {
  path: string;
  state: {
    state: string;
  };
}

export default function UseNavigatePath({ path, state }: UseNavigatePathProps) {
  const navigate = useNavigate();
  navigate(path, state);
}
