import React from "react";
import { Field, reduxForm, FormSection } from "redux-form";
import validate from "./validate";
import { Address } from "./renderField";
import { Camp } from "./renderField";

const renderError = ({ meta: { touched, error } }) =>
  touched && error
    ? <span>
        {error}
      </span>
    : false;

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <div className="panel">
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="address">
            Location
          </label>
          <div className="col-sm-10">
            <p className="help-block lead">Write the address below</p>
            <p className="help-block">You can add more than one. Add as many as you can.</p>

            <div className="row">
              <div className="col-sm-12">
                  <p className="label-lead">Own Address</p>
                     <FormSection name="ownAddress" component={Address}>
                        <Address />
                    </FormSection>

                    <p className="label-lead">Host Address</p>
                     <FormSection name="hostAddress" component={Address}>
                        <Address />
                    </FormSection>

                    <p className="label-lead">Camp</p>
                     <FormSection name="camp" component={Camp}>
                       <Camp />
                    </FormSection>
              </div>
            </div>
          </div>              
      </div>

      <div className="form-group">
        <label className="control-label col-sm-2">Household</label>
        <div className="col-sm-10">
          <p className="help-block lead">Who are you in your household?</p>
          <p className="help-block">It can be a husband, wife, children or grandparent. Select the appropriate one. </p>
          <Field name="houseHold" component="select" className="form-control">
              <option />
            <option value="1">None</option>
            <option value="2">Husband</option>
            <option value="3">Spouse</option>
            <option value="4">Child-1</option>
            <option value="5">Child-2</option>
            </Field>
        </div>

      </div>

      <div>
          <button type="button" className="previous" onClick={previousPage}>
            Previous
          </button>
          <button type="submit" className="next">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "wizard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormSecondPage);
