import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment, Suspense } from "react";
import { IsLogin, privateRoutes, publicRoutes } from "./routes/Routes";
import Layout from "./components/layout";
import Loading from "./components/loading";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let LayoutTag;

            if (route.layout) {
              LayoutTag = Layout;
            } else {
              LayoutTag = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutTag>
                    <Page />
                  </LayoutTag>
                }
              />
            );
          })}
          <Route element={<IsLogin />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              let LayoutTag;

              if (route.layout) {
                LayoutTag = Layout;
              } else {
                LayoutTag = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutTag>
                      <Page />
                    </LayoutTag>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
