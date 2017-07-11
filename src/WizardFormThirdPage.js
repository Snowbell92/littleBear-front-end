import React from 'react';
import {Field, reduxForm} from 'redux-form';
import validate from './validate';
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

const renderColorSelector = ({input, meta: {touched, error}}) => (
    <div>
        <select {...input}>
            <option value="">Select a color...</option>
            {colors.map(val => <option value={val} key={val}>{val}</option>)}
        </select>
        {touched && error && <span>{error}</span>}
    </div>
);

const WizardFormThirdPage = props => {
    const {handleSubmit, pristine, previousPage, submitting} = props;
    return (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <div className="step-3">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Photograph</label>
                    <div className="col-sm-10">
                        <Field name="favoriteColor" component={renderColorSelector} className="form-control"/>
                    </div>
                </div>
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
})(WizardFormThirdPage);
