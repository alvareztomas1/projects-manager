import { useCookies } from 'react-cookie';
import COOKIE_NAMES from '../../constants/cookie';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/auth.slice';
import { IUseNavBarHook } from '../../interfaces/custom.hooks.interface';

function useNavBar(): IUseNavBarHook {
  const [cookies, setCookie, removeCookie] = useCookies([
    COOKIE_NAMES.ACCESS_TOKEN,
  ]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie(COOKIE_NAMES.ACCESS_TOKEN, cookies.accessToken);
    dispatch(logout());
    navigate('/login');
  };

  return { handleLogout };
}
export default useNavBar;
