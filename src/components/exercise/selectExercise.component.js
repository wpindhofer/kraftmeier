import React, {Component} from 'react';
import ExerciseDataComm from './backendComm/ExerciseDataComm';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from '../js-helper-classes/StyledHelper';

const MyTableCell = styled(TableCell)({
    cursor: 'pointer',
});

const headerItem = (
    <h3>Übung hinzufügen</h3>
);


function RenderExercises(props) {
    const renderMe = props.exercise.map((b) =>
        <TableRow key={b._id} hover>
            <MyTableCell onClick={() => props.selectItem(b._id)}>{b.exercise_name}</MyTableCell>
            <MyTableCell onClick={() => props.selectItem(b._id)}>{b.exercise_desc}</MyTableCell>
        </TableRow>
    );
    return renderMe;
}

export default class SelectExercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercise: [],
            selectedId: null,
        };
    }

    getExerciseData() {
        ExerciseDataComm.getExerciseData((w) => this.setState({exercise: w}));
    }

    componentDidMount() {
        this.getExerciseData();
    }

    selectItem(id) {
        this.props.addExercise(id);
    }

    renderIndex() {
        return (
            <div style={{marginTop: 10}}>
                <div>{headerItem}</div>
                <br/>
                <Table className="{classes.table}">
                    <TableHead>
                        <TableRow>
                            <TableCell>Übung</TableCell>
                            <TableCell>Übungbeschreibung</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <RenderExercises
                            exercise={this.state.exercise}
                            selectItem={(id) => this.selectItem(id)}
                        />
                    </TableBody>
                </Table>
            </div>
        )
    }

    render() {
        return this.renderIndex();
    }
}