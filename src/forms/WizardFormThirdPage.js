import React from 'react';
import {Field, reduxForm} from 'redux-form';
import validate from '../middleware/validate';
import PropTypes from 'prop-types';
import axios,{ post } from 'axios';
import {BASE_URL} from '../middleware/api';

const WizardFormThirdPage = (props) => {
    const {handleSubmit, pristine, previousPage, submitting} = props;
    const onFormSubmit = (values) => {
        let humanID = localStorage.getItem('humanID');
        let token =localStorage.getItem('idToken');
        const AuthStr = 'Bearer '.concat(token);
        let myData = {
            'photo' : values.profile_pic[0],
            'humanId' : humanID
        }
        //formData.append('humanID', humanID);
        //formData.append('profile_pic', data.profile_pic[0]);
        const config = {
            headers: {'content-type': 'multipart/form-data', 'Authorization' : AuthStr}
        }
        const url = BASE_URL + 'human/upload';

        post(url, myData, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(myData);
                console.log(values);
                console.log(error.response);
            });
    };
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="form-horizontal">
            <div className="step-3">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Add Photo</label>
                    <div className="col-sm-10">
                        <Field name="profile_pic" component="input" type="file"/>
                    </div>
                </div>
                <div className="clearfix">
                    <button type="submit" className="next pull-right btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
};
export default reduxForm({
    form: 'uploadPhoto', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(WizardFormThirdPage);
