import { toast } from 'react-toastify';
import { css } from 'glamor';

export default function(message, type) {
  if (type === 'error') {
    return toast.error(message, {
      className: css({
        background: '#fff !important',
        color: 'rgb(221, 90, 70) !important',
      }),
      bodyClassName: css({
        fontSize: '16px',
        fontWeight: 'bold',
      }),
      progressClassName: css({
        background: 'rgb(221, 90, 70) !important',
      }),
    });
  }
  return toast.success(message, {
    className: css({
      background: '#fff !important',
      color: '#EE4D64 !important',
    }),
    bodyClassName: css({
      fontSize: '16px',
      fontWeight: 'bold',
    }),
    progressClassName: css({
      background: '#EE4D64 !important',
    }),
  });
}
