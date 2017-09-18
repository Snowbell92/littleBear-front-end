import React from 'react';
import {Field, reduxForm, values, getFormValues } from 'redux-form';
import {connect} from "react-redux";
import validate from '../middleware/validate';

const FetchValues = connect(state => ({
    values: getFormValues('wizard')(state),
}))(({ values }) =>

    <div>
        <p>Check if everything is alright.</p>


            <div className="row">
                <div className="col-xs-12">
                    <h6>Your Name</h6>
                </div>
                <div className="col-xs-12">
                    <p>{values.name}</p>
                </div>
            </div>

        <div className="row">
            <div className="col-xs-12">
                <h6>Are you part of a family?</h6>
            </div>
            <div className="col-xs-12">
                <p>{values.familyFlag}</p>
            </div>
        </div>

        <div className="row">
            <div className="col-xs-12">
                <h6>Friendly name of your family</h6>
            </div>
            <div className="col-xs-12">
                <p>{values.family}</p>
            </div>
        </div>

        <div className="row">
            <div className="col-xs-12">
                <h6>Friendly name of your family</h6>
            </div>
            <div className="col-xs-12">
                <p>{values.family}</p>
            </div>
        </div>



    </div>)


let WizardFormPreview = (props) => {

    const {handleSubmit, pristine, previousPage, submitting} = props;

    return (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <div className="step-3">
                <FetchValues/>
                <div>
                    <button type="button" className="previous" onClick={previousPage}>
                        Previous
                    </button>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                </div>
            </div>
        </form>
    );
};




export default reduxForm({
    form: 'wizard', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(WizardFormPreview);

