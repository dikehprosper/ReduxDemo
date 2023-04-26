import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      // send state as sending request
      dispatch(uiActions.showNotifiation({
        open: true,
        message: 'sending request',
        type: 'warning'
      }))
      const res = await fetch("https://redux-http-3e82c-default-rtdb.firebaseio.com/cartitems.json", {
        method: "PUT",
        body: JSON.stringify(cart)
      });
      const data = await res.json();
      // send state as request is successful
      dispatch(uiActions.showNotifiation({
        open: true,
        message: 'Sent Request To Database Successfully',
        type: 'success'
      }))
    };
    sendRequest().catch(err => {
      // send state as error
      dispatch(uiActions.showNotifiation({
        open: true,
        message: 'Sending Request To Database Failed',
        type: 'error'
      }))
    })
  }, [cart, dispatch]);

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
