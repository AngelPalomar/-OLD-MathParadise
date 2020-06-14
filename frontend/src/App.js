import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './styles/MathThemes'

import Login from './views/Login';
import Home from './views/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
