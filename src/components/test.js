import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { Values } from 'redux-form-website-template';
import showResults from '../showResults';
import WizardForm from '../forms/WizardForm';
export default class TestComponent extends Component {

    render() {
        const {isAuthenticated} = this.props


        return (
            <div>
                    {isAuthenticated &&
                    <section id="new-entry">
                        <div className ="container">
                            <div className="row">
                                <div className="col-sm-8 center-block">
                                    <WizardForm onSubmit={showResults} />

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