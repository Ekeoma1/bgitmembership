
import { toast } from 'react-toastify';

export const renderToast = ({ status, message }) => {
  return toast[status](message, { toastId: 'toastID' });
};