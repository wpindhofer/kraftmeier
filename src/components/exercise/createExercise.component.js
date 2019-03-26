import React, {Component} from 'react';
import ExerciseForm from './exerciseForm.component';

export default class CreateExercise extends Component {
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Erstelle neue Übung</h3>
                <ExerciseForm back={(u) => this.props.back(u)}/>
            </div>
        )
    }
}