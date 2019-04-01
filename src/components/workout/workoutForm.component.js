import React, {Component} from 'react';
import WorkoutDataComm from "./backendComm/WorkoutDataComm";
import DateFormatHelper from "../js-helper-classes/DateFormatHelper";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from '../js-helper-classes/StyledHelper';


const MyButton = styled(Button)({
    marginRight: '20px',
});

export default class WorkoutForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            _id: props.id,
            edit: props.id ? true : false,
            workoutObj: {
                workout_name: '',
                workout_created_date: null,
                workout_created_date_Formatted: '',
            },
        }
    }

    onChangeWorkoutName(e) {
        let newWorkoutObj = this.state.workoutObj;
        newWorkoutObj.workout_name = e.target.value;
        this.setState({workoutObj: newWorkoutObj});
    }

    componentDidMount() {
        if (this.state._id) {
            WorkoutDataComm.getSingleWorkoutData(this.state._id,
                (w) => {
                    let newWorkoutObj = this.state.workoutObj;
                    newWorkoutObj.workout_name = w.workout_name;
                    newWorkoutObj.workout_created_date = w.workout_created_date;
                    newWorkoutObj.workout_created_date_Formatted = DateFormatHelper.getFormattedData(w.workout_created_date);
                    this.setState({workoutObj: newWorkoutObj});
                });

        } else {
            let newWorkoutObj = this.state.workoutObj;
            newWorkoutObj.workout_created_date = new Date();
            newWorkoutObj.workout_created_date_Formatted = DateFormatHelper.getFormattedData(newWorkoutObj.workout_created_date);
            this.setState({workoutObj: newWorkoutObj});
        }
    }

    submitMethod(workout) {
        if (this.state.edit) {
            WorkoutDataComm.updateWorkout(this.state._id, workout,
                (res) => {
                    console.log(res.data);
                    this.props.back(true);
                });
        } else {
            WorkoutDataComm.insertWorkout(workout,
                (res) => {
                    console.log(res.data);
                    this.props.back(true);
                });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.submitMethod(this.state.workoutObj);
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <TextField
                            id="workout_name"
                            label="Trainingsplan Name"
                            // className={classes.textField}
                            value={this.state.workoutObj.workout_name}
                            onChange={this.onChangeWorkoutName}
                            margin="normal"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            id="created_date"
                            label="Erstellt am"
                            // className={classes.textField}
                            value={this.state.workoutObj.workout_created_date_Formatted}
                            disabled
                            margin="normal"
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