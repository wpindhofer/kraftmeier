import WorkoutDataComm from "./backendComm/WorkoutDataComm";
import Edit from "./edit.component";
import Create from "./create.component";
import DateFormatHelper from "../js-helper-classes/DateFormatHelper";
import Modal from '../generic/modal.component';
import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import styled from '../js-helper-classes/StyledHelper';


const MyTableCell = styled(TableCell)({
    cursor: 'pointer',
});

const headerItem = (
    <h2>Trainingspläne</h2>
);

const deleteText1 = 'Wollen Sie den Trainingsplan "';
const deleteText2 = '" wirklich löschen?';

function RenderWorkouts(props) {
    const renderMe = props.workout.map((b) =>
        <TableRow key={b._id} hover>
            <MyTableCell onClick={() => props.openWorkoutDays(b._id)}>{b.workout_name}</MyTableCell>
            <MyTableCell
                onClick={() => props.openWorkoutDays()}>{DateFormatHelper.getFormattedData(b.workout_created_date)}</MyTableCell>
            <TableCell>
                <Button variant="contained" color="primary"
                        key={b._id + 'edit'}
                        onClick={() => props.editItem(b._id)}>Edit
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="secondary"
                        onClick={() => props.createDeleteModal(b._id, b.workout_name)}
                        key={b._id + 'remove'}>
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    );
    return renderMe;
}

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workout: [],
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

    getWorkoutData() {
        WorkoutDataComm.getWorkoutData('', (w) => this.setState({workout: w}));
    }

    deleteItem(id) {
        WorkoutDataComm.deleteWorkout(id, () => this.getWorkoutData());
    }

    editItem(id) {
        this.setState({
            pageMode: 'edit',
            selectedId: id,
        });
    }

    openWorkoutDays(id) {
        this.props.history.push({
            pathname: '/workoutDays',
            // search: '?the=query',
            state: {id: id}
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
            this.getWorkoutData();
    }

    componentDidMount() {
        this.getWorkoutData();
    }

    renderIndex() {
        return (
            <div style={{marginTop: 10}}>
                {headerItem}
                <p>
                    <Button variant="contained" color="primary"
                            key={'createWorkoutButton'}
                            onClick={() => this.createItem()}>Neuen Plan erstellen
                    </Button>
                </p>
                <br/>
                <Table className="{classes.table}">
                    <TableHead>
                        <TableRow>
                            <TableCell>Plan</TableCell>
                            <TableCell>Datum erstellt</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <RenderWorkouts
                            workout={this.state.workout}
                            toggleModal={() => this.toggleModal()}
                            createDeleteModal={(id, name) => this.createDeleteModal(id, name)}
                            editItem={(id) => this.editItem(id)}
                            openWorkoutDays={(id) => this.openWorkoutDays(id)}
                        />
                    </TableBody>
                    <Modal show={this.state.modalIsOpen}
                           onClose={(a) => this.tearDownDeleteModal(a)}
                           dialogTitle={'Trainingsplan löschen?'}
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
                {headerItem}
                <Edit id={this.state.selectedId} back={(u) => this.backToIndex(u)}/>
            </div>
        )
    }

    renderCreate() {
        return (
            <div style={{marginTop: 10}}>
                {headerItem}
                <Create back={(u) => this.backToIndex(u)}/>
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