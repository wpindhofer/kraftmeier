import React, {Component} from 'react';
import WorkoutDayDataRetriever from "./backendComm/WorkoutDayDataRetriever";
import DateFormatHelper from "../js-helper-classes/DateFormatHelper";
import axios from "axios";
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
                workout_name: '',
                workout_created_date: null,
                workout_created_date_Formatted: '',
            },
        }
    }

    onChangeWorkoutDayName(e) {
        let newWorkoutDayObj = this.state.workoutDayObj;
        newWorkoutDayObj.workout_name = e.target.value;
        this.setState({workoutDayObj: newWorkoutDayObj});
    }

    componentDidMount() {
        if (this.state._id) {
            WorkoutDayDataRetriever.getSingleWorkoutDayData(this.state._id,
                (w) => {
                    let newWorkoutDayObj = this.state.workoutDayObj;
                    newWorkoutDayObj.workout_name = w.workout_name;
                    newWorkoutDayObj.workout_created_date = w.workout_created_date;
                    newWorkoutDayObj.workout_created_date_Formatted = DateFormatHelper.getFormattedData(w.workout_created_date);
                    this.setState({workoutDayObj: newWorkoutDayObj});
                });

        } else {
            let newWorkoutDayObj = this.state.workoutDayObj;
            newWorkoutDayObj.workout_created_date = new Date();
            newWorkoutDayObj.workout_created_date_Formatted = DateFormatHelper.getFormattedData(newWorkoutDayObj.workout_created_date);
            this.setState({workoutDayObj: newWorkoutDayObj});
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
                            value={this.state.workoutDayObj.workout_name}
                            onChange={this.onChangeWorkoutDayName}
                            margin="normal"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            id="created_date"
                            label="Erstellt am"
                            value={this.state.workoutDayObj.workout_created_date_Formatted}
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