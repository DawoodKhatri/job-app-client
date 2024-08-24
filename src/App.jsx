import React from "react";
import AppRouter from "./router";
import ReduxProvider from "./providers/redux";
import { Toaster } from "./components/ui/toaster";
import AuthProvider from "./providers/auth";
import { BrowserRouter } from "react-router-dom";
import JobsProvider from "./providers/jobs";

const App = () => {
  return (
    <BrowserRouter>
      <ReduxProvider>
        <AuthProvider>
          <JobsProvider>
            <AppRouter />
            <Toaster />
          </JobsProvider>
        </AuthProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
};

export default App;
