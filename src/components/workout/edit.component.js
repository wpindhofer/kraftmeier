import React, {Component} from 'react';
import WorkoutForm from './workoutForm.component';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: props.id,
        };
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Bearbeite Trainingsplan</h3>
                <WorkoutForm id={this.state._id} back={(u) => this.props.back(u)}/>
            </div>
        )
    }
}