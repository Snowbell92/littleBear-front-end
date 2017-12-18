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
                        <Label width="sm-2" name="Household" banglaName="পরিবার" refClass="control-label" />
                        <div className="col-sm-10">
                            <p className="help-block lead">
                               Are you part of an existing family?
                            </p>
                            <p className="help-block lead">
                                আপনার পরিবারের নাম কি আমাদের ডাটাবেজে অন্তর্ভুক্ত আছে?
                            </p><br/>
                            <p className="help-block">
                                select yes or no. if your family does not exist in our database, we will create a new entry for your family.
                            </p>
                            <p className="help-block">
                                হ্যাঁ বা না সিলেক্ট করুন। যদি আপনার পরিবারের নাম আমাদের ডাটাবেজে না থাকে, তবে আমরা আপনার পরিবারকে অন্তর্ভুক্ত করব।
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
                                <div>
                                    {" "}<Field name="familyFlag" component={renderError}/>
                                </div><br/>


                                {hasLocation == 1 &&
                                <div className="age">
                                    <p className="help-block lead">
                                        That's great! Find and select your household from below.
                                    </p>
                                    <p className="help-block lead">
                                       আপনার পরিবারের নামটি নিচে দেখানো হবে।
                                    </p><br/>
                                    <p className="help-block">
                                        start typing the friendly name of your household and you will be shown a list of choices. select the correct one.
                                    </p>
                                    <p className="help-block">
                                        সঠিক নামটি সিলেক্ট করুন।
                                    </p>
                                   <Household/>
                                </div>}

                                {hasLocation == 0 &&
                                <div className="age">
                                    <p className="help-block lead">
                                        No problem! Enter a friendly name for your family below.
                                    </p>
                                    <p className="help-block lead">
                                        আপনার পরিবারকে খুঁজে পাবার জন্য একটি সুন্দর নাম দিন।
                                    </p><br/>
                                    <p className="help-block">
                                        Once you have put a friendly name in, continue with filling in the rest of the inputs.
                                    </p>
                                    <p className="help-block">
                                        নাম দেবার পর আপনি বাকি ফর্ম পূর্ণ করতে পারবেন।
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
                            <Label width="sm-2" name="vulnerable" banglaName="ঝুঁকিপূর্ণ অবস্থান" refClass="control-label" />
                            <div className="col-sm-10">
                                <p className="help-block lead">
                                    Is your family vulnerable?
                                </p>
                                <p className="help-block lead">
                                    আপনার পরিবার কি বুঁকিপূর্ণ অবস্থানে আছে?
                                </p><br/>
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

                    <Field name="govRegisteredNumber" type="text" component={renderField} label="Govt registration number"/>

                    <div className="form-group">
                        <Label width="sm-2" name="sex" banglaName="লিঙ্গ" refClass="control-label" />

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
                                    Male (পুরুষ)
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
                                    Female (মহিলা)
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
                                    Third Gender (তৃতীয় লিঙ্গ)
                                </label>
                            </p>
                            <div>
                                {" "}<Field name="sex" component={renderError}/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <Label width="sm-2" name="Marital Status" banglaName="বৈবাহিক অবস্থা" refClass="control-label" />
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
                        <Label width="sm-2" name="Date of Birth" banglaName="জন্মতারিখ" refClass="control-label" />

                        <div className="col-sm-10">
                            <div className="findAge">
                                <p className="help-block lead">
                                    Do you know your date of birth?
                                </p>
                                <p className="help-block lead">
                                    আপনি কি আপনার জন্ম তারিখ জানেন?
                                </p><br/>

                                <p className="help-block">
                                If not, select no and we will calculate the year for you.
                            </p>
                                <p className="help-block">
                                    জন্ম তারিখ না জানলে, আপনার আনুমানিক বয়স আমাদের জানান।
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
                                <div>
                                    {" "}<Field name="ageFlag" component={renderError}/>
                                </div>
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
                                <p className="help-block lead">
                                    আপনার জন্মতারিখ টি নিচে লিখুন।
                                </p><br/>
                                <p className="help-block">it goes like this: DD-MM-YYYY</p>
                                <p className="help-block">তারিখ, মাস, বছর - এভাবে লিখুন।</p>

                                {/*<div className="input-group day">*/}
                                    <Field
                                        name="dob"
                                        type="text"
                                        label="day"
                                        component="input"
                                        placeholder="DD-MM-YYYY"
                                        className="form-control"
                                    />

                                   {" "}<Field name="dob" component={renderError}/>


                                {/*</div>*/}
{/*
                                <div className="input-group month">
                                    <Field
                                        name="month"
                                        type="text"
                                        component="input"
                                        label="month"
                                        className="form-control"
                                    />
                                    <span className="input-group-addon">Month</span>
                                </div>*/}
                                {/*<div className="input-group year">
                                    <Field
                                        name="year"
                                        type="text"
                                        component="input"
                                        label="year"
                                        className="form-control"
                                    />
                                    <span className="input-group-addon">Year</span>
                                </div>*/}
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