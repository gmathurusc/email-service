import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router'

//Props
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields =  _.map(formFields, ({label, name}) => {
        return (
            <div key={name} style={{ marginBottom: '20px'}}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });
    return (
        <div>
            <h3>Please review the form</h3>
            <div>
                {reviewFields}
            </div>
            <button className="yellow white-text darken-3 btn-flat" onClick={onCancel}>BACK
                <i className="material-icons left">chevron_left</i>
            </button>

            {/*Arrow function so as to delay onclick only when it is clicked and not as soon as page loads*/}
            <button className="green white-text right btn-flat"
                    onClick={ () => submitSurvey(formValues, history) }>SEND SURVEY
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values }
}

// You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component.
// withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));