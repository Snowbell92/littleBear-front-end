import React from 'react';
import {Field, reduxForm} from 'redux-form';
import validate from '../middleware/validate';
import { post } from 'axios';
import {BASE_URL} from '../middleware/api';
import {connect} from "react-redux";
import WizardForm from './WizardForm';

let WizardFormPhoto = (props) => {
    const {handleSubmit, pristine, previousPage, submitting, reset, onSubmit} = props;
    const onFormSubmit = (data, callback) => {
        let humanID = localStorage.getItem('humanID');
        let token =localStorage.getItem('idToken');
        const AuthStr = 'Bearer '.concat(token);
        let formData = new FormData();
        formData.append('humanId', humanID);
        formData.append('photo', data.profile_pic[0]);
        const config = {
            headers: {'content-type': 'multipart/form-data', 'Authorization' : AuthStr}
        };
        const url = BASE_URL + 'human/upload';

        post(url, formData, config)
            .then(function (response) {
                alert(response.data.message);
                onSubmit(response.data);
            }).catch(function (error) {
                console.log(error);
            });
    };
    return (
        <form onSubmit={handleSubmit(onFormSubmit.bind(this))} className="form-horizontal">
            <div className="step-3">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Add Photo</label>
                    <div className="col-sm-10">
                        <Field name="profile_pic" component={FileInput} type="file"/>
                    </div>
                </div>
                <div className="clearfix">
                    <button type="submit" className="next pull-right btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
};


const adaptFileEventToValue = delegate => e => delegate(e.target.files);
const FileInput = ({
    input: {
        value: omitValue,
        onChange,
        onBlur,
        inputProps,
    },
    meta: omitMeta,
    props,
}) => (
    <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        {...inputProps}
        {...props}
    />
);

export default reduxForm({
    form: 'wizard', //                 <------ same form name
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(WizardFormPhoto);
