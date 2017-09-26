import React from "react";
import {
    Field,
    reduxForm,
    FormSection,
    formValueSelector,
    SubmissionError
} from "redux-form";
import {PropTypes} from "react";
import {connect} from "react-redux";
import validate from "../middleware/validate";
import {renderField, Label, Household} from "../components/renderField";
import Icon from '../helpers/svgImports';

const renderError = ({meta: {touched, error}}) =>
    touched && error
        ? <div className="alert alert-danger has-error alert-dismissible">
            <strong>{error}</strong>
            </div>
        : false;

let WizardFormFirstPage = props => {
    const {hasLocation ,hasDOB, handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <div className="step step-1">
                <div className="panel">
                    <div className="form-group">
                        <Label width="sm-2" name="Household" refClass="control-label" />
                        <div className="col-sm-10">
                            <p className="help-block lead">
                               Are you part of an existing family?
                            </p>
                            <p className="help-block">
                                select yes or no. if your family does not exist in our database, we will create a new entry for your family.
                            </p>

                            <div className="location">
                                <label className="radio-inline">
                                    <Field
                                        name="familyFlag"
                                        component="input"
                                        type="radio"
                                        value="1"
                                    />{" "}
                                    Yes{" "}
                                </label>

                                <label className="radio-inline">
                                    <Field
                                        name="familyFlag"
                                        component="input"
                                        type="radio"
                                        value="0"
                                    />{" "}
                                    No{" "}
                                </label>
                                <p>
                                    {" "}<Field name="familyFlag" component={renderError}/>
                                </p>


                                {hasLocation == 1 &&
                                <div className="age">
                                    <p className="help-block lead">
                                        That's great! Find and select your household from below.
                                    </p>
                                    <p className="help-block">
                                        start typing the friendly name of your household and you will be shown a list of choices. select the correct one.
                                    </p>
                                   <Household/>
                                </div>}

                                {hasLocation == 0 &&
                                <div className="age">
                                    <p className="help-block lead">
                                        No problem! Enter a friendly name for your family below.
                                    </p>
                                    <p className="help-block">
                                        Once you have put a friendly name in, continue with filling in the rest of the inputs.
                                    </p>
                                    <FormSection name="houseHold">
                                    <Field
                                        name="friendly_name"
                                        type="text"
                                        component="input"
                                        label="family"
                                        className="form-control"
                                        placeholder="type a friendly name for your family"
                                    />
                                    </FormSection>
                                </div>}
                            </div>
                        </div>
                    </div>
                    {hasLocation == 0 &&
                    <div className="form-group">
                    <FormSection name="houseHold">
                            <Label width="sm-2" name="vulnerable" refClass="control-label" />
                            <div className="col-sm-10">
                                <p className="help-block lead">
                                    Is your family vulnerable?
                                </p>
                                <p className="help-block">
                                    select yes or no.
                                </p>
                                <label className="radio-inline">
                                    <Field name="vulnerable" component="input" type="radio" value="1" />
                                    {' '}
                                    Yes
                                </label>
                                <label className="radio-inline">
                                    <Field name="vulnerable" component="input" type="radio" value="0" />
                                    {' '}
                                    No
                                </label>
                        </div>
                    </FormSection>
                    </div>}

                    <Field name="fullName" type="text" component={renderField} label="name"/>

                    <div className="form-group">
                        <Label width="sm-2" name="sex" refClass="control-label" />

                        <div className="col-sm-10">
                            <p className="genders">
                                <Field
                                    name="sex"
                                    component="input"
                                    type="radio"
                                    value="1"
                                    id="male"
                                />{" "}
                                <label className="icon-label" htmlFor="male">
                                    <Icon icon="male"/>
                                    Male
                                </label>
                            </p>

                            <p className="genders">
                                <Field
                                    name="sex"
                                    component="input"
                                    type="radio"
                                    value="2"
                                    id="female"
                                />{" "}
                                <label className="icon-label" htmlFor="female">
                                    <Icon icon="female"/>
                                    Female
                                </label>
                            </p>

                            <p className="genders">
                                <Field
                                    name="sex"
                                    component="input"
                                    type="radio"
                                    value="3"
                                    id="thirdGender"
                                />{" "}
                                <label className="icon-label" htmlFor="thirdGender">
                                    <Icon icon="unisex"/>
                                    Third Gender
                                </label>
                            </p>
                            <p>
                                {" "}<Field name="sex" component={renderError}/>
                            </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <Label width="sm-2" name="Marital Status" refClass="control-label" />
                        <div className="col-sm-10">
                            <Field
                                name="maritalStatus"
                                component="select"
                                className="form-control"
                            >
                                <option />
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="separated">Separated</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                            </Field>
                            <p>
                                {" "}<Field name="maritalStatus" component={renderError}/>
                            </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <Label width="sm-2" name="Date of Birth" refClass="control-label" />

                        <div className="col-sm-10">
                            <div className="findAge">
                                <p className="help-block lead">
                                    Do you know your date of birth?
                                </p>
                                <p className="help-block">
                                    If not, select no and we will calculate the year for you.
                                </p>

                                <label className="radio-inline">
                                    <Field
                                        name="ageFlag"
                                        component="input"
                                        type="radio"
                                        value="1"
                                    />{" "}
                                    Yes,I Do{" "}
                                </label>

                                <label className="radio-inline">
                                    <Field
                                        name="ageFlag"
                                        component="input"
                                        type="radio"
                                        value="0"
                                    />{" "}
                                    no, I don't{" "}
                                </label>
                                <p>
                                    {" "}<Field name="ageFlag" component={renderError}/>
                                </p>
                            </div>
                            {hasDOB == 0 &&
                            <div className="age">
                                <p className="help-block lead">
                                    No Problem! Type your age below.{" "}
                                </p>
                                <p className="help-block">
                                    We will calculate the year for you.
                                </p>
                                <Field
                                    name="age"
                                    type="text"
                                    component="input"
                                    label="age"
                                    className="form-control"
                                    placeholder="What is your age?"
                                />
                            </div>}


                            {hasDOB == 1 &&
                            <div className="dob clearfix">
                                <p className="help-block lead">
                                    Great! Put your date of birth in the inputs below.{" "}
                                </p>
                                <p className="help-block">it goes like this: DD/MM/YYYY</p>

                                <div className="input-group day">
                                    <Field
                                        name="day"
                                        type="text"
                                        label="day"
                                        component="input"
                                        className="form-control"
                                    />

                                    <span className="input-group-addon">Day</span>
                                </div>

                                <div className="input-group month">
                                    <Field
                                        name="month"
                                        type="text"
                                        component="input"
                                        label="month"
                                        className="form-control"
                                    />
                                    <span className="input-group-addon">Month</span>
                                </div>
                                <div className="input-group year">
                                    <Field
                                        name="year"
                                        type="text"
                                        component="input"
                                        label="year"
                                        className="form-control"
                                    />
                                    <span className="input-group-addon">Year</span>
                                </div>
                            </div>}


                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="next btn-primary btn pull-right">
                        Next
                    </button>
                </div>
            </div>
        </form>
    );


};

WizardFormFirstPage = reduxForm({
    form: "wizard", // a unique identifier for this form
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    asyncBlurFields: [],
    validate
})(WizardFormFirstPage);

const selector = formValueSelector("wizard"); // <-- same as form name

WizardFormFirstPage = connect(state => {
    // can select values individually
    const hasDOB = selector(state, "ageFlag");
    const hasLocation = selector(state, "familyFlag")
    return {
        hasLocation,
        hasDOB
    };
})(WizardFormFirstPage);

export default WizardFormFirstPage;