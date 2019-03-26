import React, {Component} from 'react';
import ExerciseForm from './exerciseForm.component';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: props.id,
        };
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Bearbeite Übung</h3>
                <ExerciseForm id={this.state._id} back={(u) => this.props.back(u)}/>
            </div>
        )
    }
}