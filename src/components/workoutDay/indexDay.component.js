import React, {Component} from 'react';
import axios from 'axios';
import WorkoutDayDataRetriever from './backendComm/WorkoutDayDataRetriever';
import WorkoutDataRetriever from '../workout/backendComm/WorkoutDataRetriever';
import Edit from './editDay.component';
import Create from './createDay.component';
import Modal from '../generic/modal.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import styled from '../js-helper-classes/StyledHelper';

const MyTableCell = styled(TableCell) ({
    cursor: 'pointer',
});

// const headerItem = (
//     <h2>Workout {this.state.workoutName} - Trainingstage</h2>
// );

const deleteText1 = 'Wollen Sie den Trainingstag "';
const deleteText2 = '" wirklich löschen?';

function RenderWorkoutDays(props) {
    const renderMe = props.workoutDay.map((b) =>
        <TableRow key={b._id} hover>
            <MyTableCell onClick={() => props.editItem(b._id)}>{b.workoutDay_name}</MyTableCell>
            <TableCell>
                <Button variant="contained" color="primary"
                        key={b._id + 'edit'}
                        onClick={() => props.editItem(b._id)}>Edit
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="secondary"
                        onClick={() => props.createDeleteModal(b._id, b.workoutDay_name)}
                        key={b._id + 'remove'}>
                    Remove
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
            workoutId: this.props.location.state.id,
            workoutName: '',
            workoutDay: [],
            pageMode: 'index',
            selectedId: null,
            modalIsOpen: false,
            idMarkedForDelete: null,
            modalText: '',
        };
    }

    createDeleteModal(id, name) {
        let myModalText = deleteText1 + name + deleteText2;

        this.setState({
            idMarkedForDelete: id,
            modalIsOpen: true,
            modalText: myModalText,
        });
    }


    tearDownDeleteModal(a) {
        if (a)
            this.deleteItem(this.state.idMarkedForDelete);

        this.setState({
            idMarkedForDelete: null,
            modalIsOpen: !this.state.modalIsOpen,
        });


    }

    getWorkoutDayData() {
        WorkoutDayDataRetriever.getWorkoutDayData(this.state.workoutId, (w) => this.setState({workoutDay: w}));
        this.getWorkoutNameData();
    }

    getWorkoutNameData() {
        WorkoutDataRetriever.getSingleWorkoutData(this.state.workoutId,
            (w) => {
                this.setState({workoutName: w.workout_name});
            });
    }

    componentDidMount() {
        this.getWorkoutDayData();
    }

    deleteItem(id) {
        axios.get('http://localhost:4000/workoutDay/delete/' + id)
            .then(res => this.getWorkoutDayData());
    }

    editItem(id) {
        this.setState({
            pageMode: 'edit',
            selectedId: id,
        });
    }

    createItem() {
        this.setState({
            pageMode: 'create',
        });
    }

    backToIndex(shouldUpdate) {
        this.setState({
            pageMode: 'index',
            selectedId: null,
        })
        if (shouldUpdate)
            this.getWorkoutDayData();
    }

    renderIndex() {
        return (
            <div style={{marginTop: 10}}>
                <h2>{this.state.workoutName} - Trainingstage</h2>
                <p>
                    <Button variant="contained" color="primary"
                            key={'createWorkoutDayButton'}
                            onClick={() => this.createItem()}>Neuen Trainingstag erstellen
                    </Button>
                </p>
                <br/>
                <Table className="{classes.table}">
                    <TableHead>
                        <TableRow>
                            <TableCell>Trainingstag</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <RenderWorkoutDays
                            workoutDay={this.state.workoutDay}
                            toggleModal={() => this.toggleModal()}
                            createDeleteModal={(id, name) => this.createDeleteModal(id, name)}
                            editItem={(id) => this.editItem(id)}
                        />
                    </TableBody>
                    <Modal show={this.state.modalIsOpen}
                           onClose={(a) => this.tearDownDeleteModal(a)}
                           dialogTitle={'Trainingstag löschen?'}
                           dialogText={this.state.modalText}
                           buttonOk={'Ok'}
                           buttonNotOk={'Abbrechen'}>
                    </Modal>
                </Table>
            </div>
        )
    }

    renderEdit() {
        return (
            <div style={{marginTop: 10}}>
                <h2>{this.state.workoutName} - Trainingstage</h2>
                <Edit id={this.state.selectedId} back={(u) => this.backToIndex(u)}/>
            </div>
        )
    }

    renderCreate() {
        return (
            <div style={{marginTop: 10}}>
                <h2>{this.state.workoutName} - Trainingstage</h2>
                <Create workoutId={this.state.workoutId} back={(u) => this.backToIndex(u)}/>
            </div>
        )
    }

    render() {
        switch (this.state.pageMode) {
            case 'index':
                return this.renderIndex();
            case 'create':
                return this.renderCreate();
            case 'edit':
                return this.renderEdit();
            default:
                return;
        }
    }
}