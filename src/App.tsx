import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store, { persistor } from "./redux/store/store";
const App = () => {
  return (
    <>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <AppRoutes />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </BrowserRouter>
          </PersistGate>
      </Provider>
    </>
  );
};

export default App;
