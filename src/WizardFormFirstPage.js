import React from "react";
import {Field, reduxForm, formValueSelector} from "redux-form";
import {connect} from "react-redux";
import validate from "./validate";
import renderField from "./renderField";
const renderError = ({meta: {touched, error}}) =>
    touched && error
        ? <span>
        {error}
      </span>
        : false;

let WizardFormFirstPage = props => {
    const {hasDOB, handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <div className="step step-1">
                <div className="panel">
                    <Field name="name" type="text" component={renderField} label="name"/>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Sex</label>

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
                                    <svg>
                                        <use xlinkHref="assets/images/icons.svg#male"/>
                                    </svg>
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
                                    <svg>
                                        <use xlinkHref="assets/images/icons.svg#female"/>
                                    </svg>
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
                                    <svg>
                                        <use xlinkHref="assets/images/icons.svg#unisex"/>
                                    </svg>
                                    Third Gender
                                </label>
                            </p>
                            <p><Field name="sex" component={renderError}/></p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Marital Status</label>
                        <div className="col-sm-6">
                            <Field name="maritalStatus" component="select" className="form-control">
                                <option />
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="separated">Separated</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                            </Field>
                            <p><Field name="maritalStatus" component={renderError}/></p>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-sm-2 control-label">Date of Birth</label>

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
                                        name="dobFlag"
                                        component="input"
                                        type="radio"
                                        value="0"
                                    />{" "}
                                    Yes,I Do{" "}
                                </label>

                                <label className="radio-inline">
                                    <Field
                                        name="dobFlag"
                                        component="input"
                                        type="radio"
                                        value="1"
                                    />{" "}
                                    no, I don't{" "}
                                </label>
                                <p><Field name="dobFlag" component={renderError}/></p>
                            </div>

                            {hasDOB == 0 &&
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
                            {hasDOB == 1 &&
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
                                    className="form-control" placeholder="What is your age?"
                                />
                            </div>}
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="next">
                        Next
                    </button>
                </div>
            </div>
        </form>
    );
};

WizardFormFirstPage = reduxForm({
    form: "wizard" // a unique identifier for this form
})(WizardFormFirstPage);

const selector = formValueSelector("wizard"); // <-- same as form name

WizardFormFirstPage = connect(state => {
    // can select values individually
    const hasDOB = selector(state, "dobFlag");
    return {
        hasDOB
    };
})(WizardFormFirstPage);

export default reduxForm({
    form: "wizard", //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(WizardFormFirstPage);
