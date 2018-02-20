import _ from 'lodash';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return (
                <Field key={name} label={label} type="text" name={name} component= { SurveyField }/>
            )
        })
    }

    render() {
        return (
            <div style={{ marginTop: '35px'}}>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveyFormSubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="btn-flat white-text red">CANCEL</Link>
                    <button className="btn-flat right white-text green" type="submit">Next
                        <i className="material-icons right">chevron_right</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value for ' + name;
        }
    });

    return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false // don't dump form
})(SurveyForm);