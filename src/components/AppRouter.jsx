import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../contexts/context';
import { privateRoutes, publicRoutes } from '../router/router';
import Loader from './UI/loader/Loader';

const AppRouter = () => {

  const { isAuth, isLoading } = useContext(AuthContext);
  console.log(isAuth)

  if (isLoading) {
    return <Loader/>
  }
  return (
    isAuth
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route exact={route.exact}
            path={route.path}
            element={route.element}
            key={route.path}/>
        )}

      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route exact={route.exact}
            path={route.path}
            element={route.element}
            key={route.path } />
        )}
        <Route to='/login' />
      </Routes>
  );


};

export default AppRouter;

