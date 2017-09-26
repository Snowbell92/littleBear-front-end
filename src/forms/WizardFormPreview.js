import React from 'react';
import {Field, reduxForm, values, getFormValues } from 'redux-form';
import {connect} from "react-redux";
import validate from '../middleware/validate';

const FetchValues = connect(state => ({
    values: getFormValues('wizard')(state),
}))(({ values }) =>

    <div>
        <p className="help-block lead">Check if everything is alright.</p>
            <div className="row">
                <div className="col-xs-12">
                    <h6>Your Name</h6>
                </div>
                <div className="col-xs-12">
                    <p>{values.fullName}</p>
                </div>
            </div>

        <div className="row">
            <div className="col-xs-12">
                <h6>Gender</h6>
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
                <h6>Your Marital Status</h6>
            </div>
            <div className="col-xs-12">
                <p>{values.maritalStatus}</p>
            </div>
        </div>

        <div className="row">
            <div className="col-xs-12">
                <h6>Are you part of a family?</h6>
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
                <h6>Friendly name of your family</h6>
            </div>
            <div className="col-xs-12">
                <p>{values.houseHold.friendly_name}</p>
            </div>
        </div>}

        <div className="row">
            <div className="col-xs-12">
                <h6>Do you know your date of birth?</h6>
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
                    <h6>Your approximate age</h6>
                </div>
                <div className="col-xs-12">
                 <p>{values.age}</p>
                </div>
            </div>}

            {values.ageFlag == 1 &&
            <div>
                <div className="col-xs-12">
                    <h6>Your date of birth</h6>
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
                <div>
                    <button type="button" className="previous pull-left btn btn-default" onClick={previousPage}>
                        Previous
                    </button>
                    <button type="submit" className="next pull-right btn btn-primary" disabled={pristine || submitting}>Submit</button>
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

