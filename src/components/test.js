import React , {Component} from 'react';
import PropTypes from 'prop-types';
import onSubmit from '../forms/WizardForm';
import WizardForm from '../forms/WizardForm';
import { Values } from "redux-form-website-template";

export default class TestComponent extends Component {

    render() {
        const {isAuthenticated} = this.props;


        return (
            <div>
                    {isAuthenticated &&
                    <section id="new-entry">
                        <div className ="container">
                            <div className="row">
                                <div className="col-sm-8 center-block">
                                    <WizardForm onSubmit={onSubmit} />
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