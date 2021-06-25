import {useSnackbar} from 'notistack';
import {Slide} from '@material-ui/core';

export const useNotifications = () => {
  const {enqueueSnackbar} = useSnackbar();
  const Success = (message) => {
    enqueueSnackbar(message, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      TransitionComponent: Slide,
    });
  };

  const Error = (message) => {
    enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      TransitionComponent: Slide,
    });
  };

  const Warning = (message) => {
    enqueueSnackbar(message, {
      variant: 'warning',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      TransitionComponent: Slide,
    });
  };

  return {Success, Error, Warning};
};
