import React from 'react';
import {reduxForm, getFormValues} from 'redux-form';
import {connect} from "react-redux";
import validate from '../middleware/validate';

const FetchValues = connect(state => ({
    values: getFormValues('wizard')(state),
}))(({values}) =>

    <div className="preview-component">
        <h4 className="help-block lead">Check if everything is alright.</h4>
        <div className="row">
            <div className="col-xs-11 col-sm-10 center-block">
                <div className="panel panel-info">
                    <div className="panel-heading">All available information on {values.fullName}</div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6">
                                            <h5>Name</h5>
                                            <p>{values.fullName}</p>
                                        </div>
                                        {values.govRegisteredNumber !== null &&
                                        <div className="col-xs-12 col-sm-6">
                                            <h5>Government ID</h5>
                                            <p>{values.govRegisteredNumber}</p>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <h5>Do you know your age?</h5>
                                    {values.ageFlag == 0 &&
                                    <p>No</p>
                                    }
                                    {values.ageFlag == 1 &&
                                    <p>Yes</p>
                                    }
                                </div>
                            </div>
                        </div>


                        {values.ageFlag == 0 &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <h5>Your approximate age</h5>
                                    <p>{values.age}</p>
                                </div>
                            </div>
                        </div>}

                        {values.ageFlag == 1 &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <h5>Your date of birth</h5>
                                    <p>{values.dateOfBirth} </p>
                                </div>
                            </div>
                        </div>}


                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <h5>Gender</h5>
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
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <h5>Marital Status</h5>
                                    <p>{values.maritalStatus}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <h5>Are you part of a family?</h5>
                                    {values.familyFlag == 0 &&
                                    <p>No</p>
                                    }
                                    {values.familyFlag == 1 &&
                                    <p>Yes</p>
                                    }
                                </div>
                            </div>
                        </div>

                        {values.familyFlag == 0 &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h5>Friendly name of your family</h5>
                                            <p>{values.houseHold.friendly_name}</p>
                                        </div>
                                        <div className="col-xs-12">
                                            <h5>Are you vulnerable?</h5>
                                            {values.houseHold.vulnerable == 1 &&
                                            <p className="text-danger">Yes</p>
                                            }
                                            {values.houseHold.vulnerable == 0 &&
                                            <p>No</p>
                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>}

                        {values.familyFlag == 1 &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <h5>Your Family Name</h5>
                                    <p>{values.houseHold.id}</p>
                                </div>
                            </div>
                        </div>}

                        {values.houseHoldRole !== null &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="section">
                                    <h5>Your role in your family</h5>
                                    <p>
                                        {values.houseHoldRole == 1 &&
                                        <p>Head</p>
                                        }
                                        {values.houseHoldRole == 2 &&
                                        <p>Member</p>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        }

                        <div className="row">
                            <div className="col-xs-12">
                                <h5>Your Location and address</h5>

                                {values.location.address_village !== null && values.location.address_upazilla !== null && values.location.address_district !== null && values.location.address_division !== null &&
                                <div className="section">
                                    <div className="row">
                                        <div className="col-xs-12">Own Address</div>
                                        <div className="col-xs-12">
                                            <p><strong>Village</strong>: {values.location.address_village}, <br/>
                                                <strong>Upazilla</strong>: {values.location.address_upazilla}, <br/>
                                                {values.location.address_district}, {values.location.address_division}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                }

                                {values.location.host_address_village !== null && values.location.host_address_upazilla !== null && values.location.host_address_district !== null && values.location.host_address_division !== null &&
                                <div className="section">
                                    <div className="row">
                                        <div className="col-xs-12">Host Address</div>
                                        <div className="col-xs-12">
                                            <p><strong>Village</strong>: {values.location.host_address_village}, <br/>
                                                <strong>Upazilla</strong>: {values.location.host_address_upazilla},
                                                <br/>
                                                {values.location.host_address_district}, {values.location.host_address_division}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                }

                                {values.camp_name !== null && values.camp_block !== null && values.camp_ward !== null &&
                                <div className="section">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h5>Camp Address</h5>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="col-xs-12">
                                                <p><strong>Camp</strong>: {values.camp_name}, <br/>
                                                    <strong>Block</strong> {values.camp_block}, <br/>
                                                    <strong>Ward</strong> {values.camp_ward}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }

                                <div className="section">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Co-ordinates</h4>
                                        </div>
                                        <div className="col-xs-6">
                                            <h5>Latitude</h5>
                                            <p>{values.location.latitude}</p>
                                        </div>
                                        <div className="col-xs-6">
                                            <h5>Longitude</h5>
                                            <p>{values.location.longitude}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>);


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
                    <button type="submit" className="next pull-right btn btn-primary" disabled={pristine || submitting}>
                        Proceeed to Upload Picture
                    </button>
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

