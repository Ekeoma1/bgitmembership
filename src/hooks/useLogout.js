import { useDispatch } from 'react-redux';
import { logout } from '../Features/auth/auth_slice';

const useLogout = () => {
  const dispatch = useDispatch();
  dispatch(logout());
};
export default useLogout;
