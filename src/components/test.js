import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {saveData, SUBMIT_PHOTO_SUCCESS} from '../actions';
import WizardForm from '../forms/WizardForm';
import { Values } from "redux-form-website-template";

class TestComponent extends Component {
    render() {
        const {isAuthenticated, saveData, handleSubmitPhoto} = this.props;
        return (
            <div>
                {isAuthenticated &&
                <section id="new-entry">
                    <div className ="container">
                        <div className="row">
                            <div className="col-sm-8 center-block">
                                <WizardForm
                                    onSubmitUser={saveData}
                                    onSubmitPhoto={handleSubmitPhoto}
                                />
                                <Values form="wizard" />
                            </div>
                        </div>
                    </div></section>
                }
            </div>
        )
    }
}

TestComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({
    saveData,
    handleSubmitPhoto: () => dispatch({type: SUBMIT_PHOTO_SUCCESS})
}, dispatch)

export default connect(null, mapDispatchToProps)(TestComponent)
