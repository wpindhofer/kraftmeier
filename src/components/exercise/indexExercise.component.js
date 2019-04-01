import React, {Component} from 'react';
import ExerciseDataComm from './backendComm/ExerciseDataComm';
import Edit from './editExercise.component';
import Create from './createExercise.component';
import Modal from '../generic/modal.component';
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
    <h2>Übungskatalog</h2>
);

const deleteText1 = 'Wollen Sie die Übung "';
const deleteText2 = '" wirklich löschen?';

function RenderExercises(props) {
    const renderMe = props.exercise.map((b) =>
        <TableRow key={b._id} hover>
            <MyTableCell onClick={() => props.editItem(b._id)}>{b.exercise_name}</MyTableCell>
            <MyTableCell onClick={() => props.editItem(b._id)}>{b.exercise_desc}</MyTableCell>
            <TableCell>
                <Button variant="contained" color="primary"
                        key={b._id + 'edit'}
                        onClick={() => props.editItem(b._id)}>Edit
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="contained" color="secondary"
                        onClick={() => props.createDeleteModal(b._id, b.exercise_name)}
                        key={b._id + 'remove'}>
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    );
    return renderMe;
}

export default class IndexExercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercise: [],
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

        let modIsOpen = !this.state.modalIsOpen;
        this.setState({
            idMarkedForDelete: null,
            modalIsOpen: modIsOpen,
        });


    }

    getExerciseData() {
        ExerciseDataComm.getExerciseData((w) => this.setState({exercise: w}));
    }

    componentDidMount() {
        this.getExerciseData();
    }

    deleteItem(exerciseId) {
        ExerciseDataComm.deleteExercise(exerciseId, () => this.getWorkoutData());
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
            this.getExerciseData();
    }

    renderIndex() {
        return (
            <div style={{marginTop: 10}}>
                <div>
                    {headerItem}
                    <p>
                        <Button variant="contained" color="primary"
                                key={'createExerciseButton'}
                                onClick={() => this.createItem()}>Neue Übung erstellen
                        </Button>
                    </p>
                </div>
                <br/>
                <Table className="{classes.table}">
                    <TableHead>
                        <TableRow>
                            <TableCell>Übung</TableCell>
                            <TableCell>Übungbeschreibung</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <RenderExercises
                            exercise={this.state.exercise}
                            toggleModal={() => this.toggleModal()}
                            createDeleteModal={(id, name) => this.createDeleteModal(id, name)}
                            editItem={(id) => this.editItem(id)}
                        />
                    </TableBody>
                    <Modal show={this.state.modalIsOpen}
                           onClose={(a) => this.tearDownDeleteModal(a)}
                           dialogTitle={'Übung löschen?'}
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