import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Values } from 'redux-form-website-template';
import store from './store';
import showResults from './showResults';
import WizardForm from './WizardForm';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <section id="new-entry">
    
    <div className = "container">
    	<div className="row">
    	<div className="col-sm-8 center-block">
    	 <WizardForm onSubmit={showResults} />
      <Values form="wizard" />
    	</div>
    </div>     
    </div></section>
  </Provider>,
  rootEl,
);