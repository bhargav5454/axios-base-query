import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store, { persistor } from "./redux/store/store";
const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default App;
