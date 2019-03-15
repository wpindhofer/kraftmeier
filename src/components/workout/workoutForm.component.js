import React, {Component} from 'react';
import {Route} from 'react-router';
import WorkoutDataRetriever from "./backendComm/WorkoutDataRetriever";
import Index from "./index.component";
import axios from "axios";


export default class WorkoutForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
        this.onChangeWorkoutCreatedDate = this.onChangeWorkoutCreatedDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            _id: props.id,
            edit: props.id ? true : false,
            workout_name: '',
            workout_created_date: '',
            pageStatus: '',
            redirectToIndex: false,
        }
    }

    onChangeWorkoutName(e) {
        this.setState({
            workout_name: e.target.value
        });
    }

    onChangeWorkoutCreatedDate(e) {
        this.setState({
            workout_created_date: e.target.value
        })
    }

    componentDidMount() {
        if (this.state._id) {
            WorkoutDataRetriever.getSingleWorkoutData(this.state._id,
                (w) => this.setState({
                    workout_name: w.workout_name,
                    workout_created_date: w.workout_created_date,
                }));
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
        this.submitMethod(this.state)
        this.setState({pageStatus: 'Saved successfully'});
        if (!this.state.edit) {
            this.setState({
                workout_name: '',
                workout_created_date: '',
                redirectToIndex : true,
            });
        }
    }

    render() {
        if(this.state.redirectToIndex) {
            // return <Redirect push to="/index"/>;
            return <Route to="/index" component={Index} />
        }

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
                            value={this.state.workout_name}
                            onChange={this.onChangeWorkoutName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Erstellt am: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.workout_created_date}
                               onChange={this.onChangeWorkoutCreatedDate}
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