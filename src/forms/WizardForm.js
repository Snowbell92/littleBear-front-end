import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormPreview from './WizardFormPreview';
import WizardFormPhoto from './WizardFormPhoto'
import {
    isSubmitting,
    hasSubmitSucceeded,
    hasSubmitFailed
} from 'redux-form'

class WizardForm extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.backToOne = this.backToOne.bind(this);
        this.state = {
            page: 1,
        };
    }

    nextPage() {
        this.setState({page: this.state.page + 1});
    }

    previousPage() {
        this.setState({page: this.state.page - 1});
    }

    backToOne() {
        this.setState({page: 1,})
    }



    render() {
        const {onSubmit} = this.props;
        const {page, submitSucceeded} = this.state;
        return (
            <div>
                {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}
                {page === 2 &&
                <WizardFormSecondPage
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                />}
                {page === 3 &&
                <WizardFormPreview
                    previousPage={this.previousPage}
                    onSubmit={values => {
                        onSubmit(values, () => {
                            this.setState({
                                submitSucceeded: true
                            });
                            this.nextPage()
                        });
                    }}
                />}
                {submitSucceeded && page === 4 &&
                <WizardFormPhoto onSubmit={data => {
                    console.log(data.message)
                    this.setState({ page: 1, });
                }}/>
                }
            </div>
        );
    }
}

WizardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};



WizardForm = reduxForm({
    form: 'wizard',
    initialValues: {
        location: {
            latitude: "0.0",
            longitude: "0.0"
        }
    }
})(WizardForm)

WizardForm = connect(
    state => ({
        submitting: isSubmitting('wizard')(state),
        submitSucceeded: hasSubmitSucceeded('wizard')(state),
        submitFailed: hasSubmitFailed('wizard')(state),
    })
)(WizardForm);

export default WizardForm;
