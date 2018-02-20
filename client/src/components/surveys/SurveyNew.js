//SurveyNew shows SurveyForm & SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';


// import { Link } from 'react-router-dom';

class SurveyNew extends Component {

    state = { showFormReview : false };

    renderContent()
    {
        if(this.state.showFormReview) {
            return <SurveyFormReview onCancel = {() => this.setState({ showFormReview: false })}/>
        }
        return <SurveyForm onSurveyFormSubmit = {() => this.setState({ showFormReview: true })}/>
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm',
    destroyOnUnmount: true //dump form : this is default but putting for clarification
})(SurveyNew);