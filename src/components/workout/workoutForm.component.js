import React, {Component} from 'react';
import WorkoutDataRetriever from "./backendComm/WorkoutDataRetriever";
import DateFormatHelper from "../helper/DateFormatHelper";
import axios from "axios";


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
            pageStatus: '',
        }
    }

    onChangeWorkoutName(e) {
        let newWorkoutObj = this.state.workoutObj;
        newWorkoutObj.workout_name = e.target.value;
        this.setState({workoutObj: newWorkoutObj});
    }

    componentDidMount() {
        if (this.state._id) {
            WorkoutDataRetriever.getSingleWorkoutData(this.state._id,
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

    submitMethod(w) {
        if (this.state.edit) {
            axios.post('http://localhost:4000/workout/update/' + this.state._id, w)
                .then(res => {
                    console.log(res.data);
                    this.props.back(true);
                });
        } else {
            axios.post('http://localhost:4000/workout/add', w)
                .then(res => {
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
                <button className="btn btn-secondary" key={'back'}
                        onClick={() => this.props.back(false)}>Zurück
                </button>
                {this.state.pageStatus ? <div>{this.state.pageStatus}</div> : ''}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Trainingsplan Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.workoutObj.workout_name}
                            onChange={this.onChangeWorkoutName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Erstellt am: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.workoutObj.workout_created_date_Formatted}
                               disabled
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}