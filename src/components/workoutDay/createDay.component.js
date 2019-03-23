import React, {Component} from 'react';
import WorkoutDayForm from './workoutDayForm.component';

export default class CreateDay extends Component {
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Erstelle neuen Trainingstag</h3>
                <WorkoutDayForm workoutId={this.props.workoutId} back={(u) => this.props.back(u)}/>
            </div>
        )
    }
}