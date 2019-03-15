import React, {Component} from 'react';
import WorkoutForm from './workoutForm.component';

export default class Create extends Component {
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Erstelle neuen Trainingsplan</h3>
                <WorkoutForm back={(u) => this.props.back(u)}/>
            </div>
        )
    }
}