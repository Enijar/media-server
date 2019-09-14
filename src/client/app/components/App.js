import React, { Component, lazy, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { AppContextProvider } from "../context/AppContext";
import Loading from "../components/Loading";

const LandingScreen = lazy(() => import(/* webpackPrefetch: true */ "../screens/LandingScreen"));
const WatchScreen = lazy(() => import(/* webpackPrefetch: true */ "../screens/WatchScreen"));
const NotFoundScreen = lazy(() => import(/* webpackPrefetch: true */ "../screens/NotFoundScreen"));

const Screen = Component => props => <Component {...props}/>;

@withRouter
export default class App extends Component {
  state = {};

  #getContext = () => ({
    ...this.state,
  });

  render () {
    return (
      <AppContextProvider value={this.#getContext()}>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route exact path="/" component={Screen(LandingScreen)}/>
            <Route exact path="/watch/:id" component={Screen(WatchScreen)}/>
            <Route component={Screen(NotFoundScreen)}/>
          </Switch>
        </Suspense>
      </AppContextProvider>
    );
  }
}
