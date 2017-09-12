import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { Values } from 'redux-form-website-template';
import validate from '../middleware/validate';
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

const WizardFormPreview = props => {
    const {handleSubmit, pristine, previousPage, submitting} = props;
    return (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <div className="step-3">

                <Values form="wizard" />
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
