import React, {Component} from 'react';
import axios from "axios";
import WorkoutDayDataRetriever from './backendComm/WorkoutDayDataRetriever';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from '../js-helper-classes/StyledHelper';


const MyButton = styled(Button)({
    marginRight: '20px',
});

export default class WorkoutDayForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeWorkoutDayName = this.onChangeWorkoutDayName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            _id: props.id,
            edit: props.id ? true : false,
            workoutDayObj: {
                workoutDay_name: '',
                workout: props.workoutId,
            },
        }
    }

    onChangeWorkoutDayName(e) {
        let newWorkoutDayObj = this.state.workoutDayObj;
        newWorkoutDayObj.workoutDay_name = e.target.value;
        this.setState({workoutDayObj: newWorkoutDayObj});
    }

    componentDidMount() {
        if (this.state._id) {
            WorkoutDayDataRetriever.getSingleWorkoutDayData(this.state._id,
                (w) => {
                    let newWorkoutDayObj = this.state.workoutDayObj;
                    newWorkoutDayObj.workoutDay_name = w.workoutDay_name;
                    newWorkoutDayObj.workout = w.workout;
                    this.setState({workoutDayObj: newWorkoutDayObj});
                });
        } else {
            // No init necessary
        }
    }

    submitMethod(w) {
        if (this.state.edit) {
            axios.post('http://localhost:4000/workoutDay/update/' + this.state._id, w)
                .then(res => {
                    console.log(res.data);
                    this.props.back(true);
                });
        } else {
            axios.post('http://localhost:4000/workoutDay/add', w)
                .then(res => {
                    console.log(res.data);
                    this.props.back(true);
                });
        }
    }


    onSubmit(e) {
        e.preventDefault();
        this.submitMethod(this.state.workoutDayObj);
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <TextField
                            id="workout_name"
                            label="Trainingstag Name"
                            value={this.state.workoutDayObj.workoutDay_name}
                            onChange={this.onChangeWorkoutDayName}
                            margin="normal"
                            autoFocus
                        />
                    </div>
                    <MyButton variant="contained" color="primary" type="submit">Speichern</MyButton>
                    <MyButton variant="contained" key={'back'} onClick={() => this.props.back(false)}>Zurück
                    </MyButton>
                </form>
            </div>
        )
    }
}