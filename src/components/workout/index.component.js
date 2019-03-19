import React, {Component} from 'react';
import axios from "axios";
import WorkoutDataRetriever from "./backendComm/WorkoutDataRetriever";
import Edit from "./edit.component";
import Create from "./create.component";
import DateFormatHelper from "../js-helper-classes/DateFormatHelper";
import Modal from '../generic/modal.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const headerItem = (
    <p>
        <h2>Trainingspläne</h2>
    </p>
);

const deleteText1 = 'Wollen Sie den Trainingsplan "';
const deleteText2 = '" wirklich löschen?';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


function RenderWorkouts(props) {
    const renderMe = props.workout.map((b) =>
        <TableRow key={b._id}>
            <TableCell>{b.workout_name}</TableCell>
            <TableCell>{DateFormatHelper.getFormattedData(b.workout_created_date)}</TableCell>
            <TableCell>
                <Button variant="contained" color="primary" className={styles.button}
                        key={b._id + 'edit'}
                        onClick={() => props.editItem(b._id)}>Edit
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="secondary" className={styles.button}
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
        WorkoutDataRetriever.getWorkoutData('', (w) => this.setState({workout: w}));
    }

    componentDidMount() {
        this.getWorkoutData();
    }

    deleteItem(id) {
        axios.get('http://localhost:4000/workout/delete/' + id)
            .then(res => this.getWorkoutData());
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
            this.getWorkoutData();
    }

    renderIndex() {
        return (
            <div style={{marginTop: 10}}>
                {headerItem}
                <p>
                    <Button variant="contained" color="primary" className={styles.button}
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