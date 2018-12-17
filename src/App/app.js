import React, { Component } from 'react';
import { render } from 'react-dom';
import TransitionList from "./transition-list.js";
import './style.css'
import cards from "./data.json";
import {AppContainer} from 'react-hot-loader'

class App extends Component {

  render() {
    return (
      <div>
        <TransitionList cards={cards} />
      </div>
    );
  }
}

render(
<AppContainer>
  <App/>
</AppContainer>
, document.getElementById('react-root'));
