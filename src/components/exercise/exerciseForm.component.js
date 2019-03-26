import React, {Component} from 'react';
import axios from "axios";
import ExerciseDataRetriever from './backendComm/ExerciseDataRetriever';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from '../js-helper-classes/StyledHelper';


const MyButton = styled(Button)({
    marginRight: '20px',
});

export default class ExerciseForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeExerciseName = this.onChangeExerciseName.bind(this);
        this.onChangeExerciseDesc = this.onChangeExerciseDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            _id: props.id,
            edit: props.id ? true : false,
            exerciseObj: {
                exercise_name: '',
                exercise_desc: '',
            },
        }
    }

    onChangeExerciseName(e) {
        let newExerciseObj = this.state.exerciseObj;
        newExerciseObj.exercise_name = e.target.value;
        this.setState({exerciseObj: newExerciseObj});
    }

    onChangeExerciseDesc(e) {
        let newExerciseObj = this.state.exerciseObj;
        newExerciseObj.exercise_desc = e.target.value;
        this.setState({exerciseObj: newExerciseObj});
    }

    componentDidMount() {
        if (this.state._id) {
            ExerciseDataRetriever.getSingleExerciseData(this.state._id,
                (w) => {
                    let newExerciseObj = this.state.exerciseObj;
                    newExerciseObj.exercise_name = w.exercise_name;
                    newExerciseObj.exercise_desc = w.exercise_desc;
                    this.setState({exerciseObj: newExerciseObj});
                });
        } else {
            // No init necessary
        }
    }

    submitMethod(w) {
        if (this.state.edit) {
            axios.post('http://localhost:4000/exercise/update/' + this.state._id, w)
                .then(res => {
                    console.log(res.data);
                    this.props.back(true);
                });
        } else {
            axios.post('http://localhost:4000/exercise/add', w)
                .then(res => {
                    console.log(res.data);
                    this.props.back(true);
                });
        }
    }


    onSubmit(e) {
        e.preventDefault();
        this.submitMethod(this.state.exerciseObj);
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <TextField
                            id="exercise_name"
                            label="Übungsname"
                            value={this.state.exerciseObj.exercise_name}
                            onChange={this.onChangeExerciseName}
                            margin="normal"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            id="exercise_desc"
                            label="Übungsbeschreibung"
                            value={this.state.exerciseObj.exercise_desc}
                            onChange={this.onChangeExerciseDesc}
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