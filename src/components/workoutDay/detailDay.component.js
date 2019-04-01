import React, {Component} from 'react';
import SelectExercise from '../exercise/selectExercise.component';
import TableCell from '@material-ui/core/TableCell/index';
import TableRow from '@material-ui/core/TableRow/index';
import Button from '@material-ui/core/Button/index';
import WorkoutDayDataComm from "./backendComm/WorkoutDayDataComm";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

function RenderExercises4Workday(props) {
    if(props.workoutDay === null)
        return null;

    const renderMe = props.workoutDay.exercises.map((exercise) =>
        <TableRow key={exercise._id} hover>
            <TableCell>{exercise.exercise_name}</TableCell>
            <TableCell>
                <Button variant="contained" color="secondary"
                        onClick={() => props.removeExercise(exercise._id)}
                        key={exercise._id + 'remove'}>
                    -
                </Button>
            </TableCell>
        </TableRow>
    );
    return renderMe;
}

export default class IndexDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workoutId: props.workoutId,
            workoutDayId: '',
            workoutDay: null,
            pageMode: 'index',
        };
    }

    getWorkoutDayData() {
        WorkoutDayDataComm.getSingleWorkoutDayDataPopulated(this.state.workoutId, (w) => this.setState({workoutDay: w}));
    }

    componentDidMount() {
        this.getWorkoutDayData();
    }

    removeExercise(exerciseId) {
        WorkoutDayDataComm.removeExerciseToWorkoutDay(this.state.workoutDay._id, exerciseId, () => this.getWorkoutDayData());
    }

    addExercise(exerciseId) {
        WorkoutDayDataComm.addExerciseToWorkoutDay(this.state.workoutDay._id, exerciseId, () => this.getWorkoutDayData());
        this.backToIndex(true);
    }

    addItem() {
        this.setState({
            pageMode: 'add',
            // selectedId: id,
        });
    }

    backToIndex(shouldUpdate) {
        this.setState({
            pageMode: 'index',
            selectedId: null,
        });

        if (shouldUpdate)
            this.getWorkoutDayData();
    }

    renderIndex() {
        return (
            <div>
                <h3>Assigned exercises</h3>
                <Button variant="contained" color="primary"
                        key={'add'}
                        onClick={() => this.addItem()}>Add Exercise
                </Button>
                <Table className="{classes.table}">
                    <TableHead>
                        <TableRow>
                            <TableCell>Zugeordnete Übungen</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <RenderExercises4Workday
                            workoutDay={this.state.workoutDay}
                            removeExercise={(id, name) => this.removeExercise(id, name)}
                        />
                    </TableBody>
                </Table>
            </div>
        )
    }

    renderAdd() {
        return (
            <div>
                <SelectExercise
                    addExercise={(exerciseId) => this.addExercise(exerciseId)}
                />
            </div>
        )
    }

    render() {
        switch (this.state.pageMode) {
            case 'index':
                return this.renderIndex();
            case 'add':
                return this.renderAdd();
            default:
                return;
        }
    }
}