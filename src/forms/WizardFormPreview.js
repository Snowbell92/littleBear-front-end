import React from 'react';
import {Field, reduxForm, getFormValues } from 'redux-form';
import {connect} from "react-redux";
import validate from '../middleware/validate';
import {reset} from 'redux-form';

const FetchValues = connect(state => ({
    values: getFormValues('wizard')(state),
}))(({ values }) =>

    <div>
        <h4 className="help-block lead">Check if everything is alright.</h4>
            <div className="row">
                <div className="col-xs-12">
                    <h5>Your Name</h5>
                </div>
                <div className="col-xs-12">
                    <p>{values.fullName}</p>
                </div>
            </div>

        <div className="row">
            <div className="col-xs-12">
                <h5>Gender</h5>
            </div>
            <div className="col-xs-12">
                {values.sex == 1 &&
                <p>Male</p>
                }
                {values.sex == 2 &&
                <p>Female</p>
                }
                {values.sex == 3 &&
                <p>3rd Gender</p>
                }
            </div>
        </div>

        <div className="row">
            <div className="col-xs-12">
                <h5>Your Marital Status</h5>
            </div>
            <div className="col-xs-12">
                <p>{values.maritalStatus}</p>
            </div>
        </div>

        <div className="row">
            <div className="col-xs-12">
                <h5>Are you part of a family?</h5>
            </div>
            <div className="col-xs-12">
                {values.familyFlag == 0 &&
                <p>No</p>
                }
                {values.familyFlag == 1 &&
                <p>Yes</p>
                }
            </div>
        </div>
        {values.familyFlag == 0 &&
        <div className="row">
            <div className="col-xs-12">
                <h5>Friendly name of your family</h5>
            </div>
            <div className="col-xs-12">
                <p>{values.houseHold.friendly_name}</p>
            </div>
        </div>}

        <div className="row">
            <div className="col-xs-12">
                <h5>Do you know your date of birth?</h5>
            </div>
            <div className="col-xs-12">
                {values.ageFlag == 0 &&
                <p>No</p>
                }
                {values.ageFlag == 1 &&
                <p>Yes</p>
                }
            </div>
        </div>

        <div className="row">
            {values.ageFlag == 0 &&
            <div>
                <div className="col-xs-12">
                    <h5>Your approximate age</h5>
                </div>
                <div className="col-xs-12">
                 <p>{values.age}</p>
                </div>
            </div>}

            {values.ageFlag == 1 &&
            <div>
                <div className="col-xs-12">
                    <h5>Your date of birth</h5>
                </div>
                <div className="col-xs-12">
                    <p>{values.day}/{values.month}/{values.year} </p>
                </div>
            </div>}
        </div>

        {values.location !== null &&
        <div className="row">
            <div className="col-sm-12">
                Your own address
            </div>
        </div>}



    </div>)


let WizardFormPreview = (props) => {

    const {handleSubmit, pristine, previousPage, submitting} = props;

    return (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <div className="step-3">
                <FetchValues/>
                <div className="clearfix">
                    <button type="button" className="previous pull-left btn btn-default" onClick={previousPage}>
                        Previous
                    </button>
                    <button type="submit" className="next pull-right btn btn-primary" disabled={pristine || submitting}>Proceeed to Upload Picture</button>
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

