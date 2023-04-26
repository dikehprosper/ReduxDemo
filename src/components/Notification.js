import React from 'react';
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification)
  const handleClose = () => {
    dispatch(uiActions.showNotification({
      open: false
    }))
  }
  return (
    <div>
      {notification.open && <Alert onClose={handleClose} severity={type}>nnnnn</Alert>}
    </div>
  )
}

export default Notification;