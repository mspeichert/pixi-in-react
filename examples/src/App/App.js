import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import logo from '../logo.svg'
import './App.css'
import ExampleList from '../ExampleList'

import BunnyExample from '../BunnyExample'
import ContainerExample from '../ContainerExample'
import Stats from '../Stats'

const examples = [
  {
    name: 'Bunny',
    slug: 'bunny',
    component: BunnyExample,
  },
  {
    name: 'Container',
    slug: 'container',
    component: ContainerExample,
  },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stats />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">pixi-in-react Examples</h1>
        </header>
        <div className="App-intro">
          <Switch>
            <Route
              exact
              path="/"
              render={props => <ExampleList {...props} examples={examples} />}
            />
            {examples.map(example => (
              <Route
                key={example.slug}
                exact
                path={`/${example.slug}`}
                component={example.component}
              />
            ))}
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
