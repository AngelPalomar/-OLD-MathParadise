import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import routes from './config/Routes'
import theme from './styles/MathThemes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

function RouteWithSubRoutes(route) {
  console.log(route)
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />} />
  )
}

export default App;
