import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormThirdPage from './WizardFormThirdPage';
import WizardFormPreview from './WizardFormPreview';
import {saveData} from '../actions';

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  onSubmit(values, dispatch) {
        const message = "yes! it happened!";
        return dispatch(saveData(values,message));
        // Call the action creator which is responsible for saving data here.
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 &&
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}
        {/*{page === 3 &&
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}*/}
          {page === 3 &&
          <WizardFormPreview
              previousPage={this.previousPage}
              onSubmit={this.onSubmit}
          />}
      </div>
    );
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

WizardForm = reduxForm ({
  form: 'wizard',
  initialValues: {
    location: {
      latitude: "0.0",
      longitude: "0.0"
    }
  }
})(WizardForm)


export default WizardForm;
