import React, {Component} from 'react';
import SelectExercise from '../exercise/selectExercise.component';
// import TableCell from '@material-ui/core/TableCell/index';
// import TableRow from '@material-ui/core/TableRow/index';
import Button from '@material-ui/core/Button/index';
// import styled from '../js-helper-classes/StyledHelper';

// const MyTableCell = styled(TableCell)({
//     cursor: 'pointer',
// });

// const headerItem = (
//     <h2>Workout {this.state.workoutName} - Trainingstage</h2>
// );

// const deleteText1 = 'Wollen Sie den Trainingstag "';
// const deleteText2 = '" wirklich löschen?';

// function RenderWorkoutDays(props) {
//     const renderMe = props.workoutDay.map((b) =>
//         <TableRow key={b._id} hover>
//             <MyTableCell onClick={() => props.editItem(b._id)}>{b.workoutDay_name}</MyTableCell>
//             <TableCell>
//                 <Button variant="contained" color="primary"
//                         key={b._id + 'edit'}
//                         onClick={() => props.editItem(b._id)}>Edit
//                 </Button>
//             </TableCell>
//             <TableCell>
//                 <Button variant="contained" color="secondary"
//                         onClick={() => props.createDeleteModal(b._id, b.workoutDay_name)}
//                         key={b._id + 'remove'}>
//                     Remove
//                 </Button>
//             </TableCell>
//         </TableRow>
//     );
//     return renderMe;
// }

export default class IndexDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workoutId: '',
            workoutDayId: '',
            pageMode: 'index',
            // modalIsOpen: false,
            // idMarkedForDelete: null,
            // modalText: '',
        };
    }

    createDeleteModal(id, name) {
        // let myModalText = deleteText1 + name + deleteText2;
        //
        // this.setState({
        //     idMarkedForDelete: id,
        //     modalIsOpen: true,
        //     modalText: myModalText,
        // });
    }


    tearDownDeleteModal(a) {
        // if (a)
        //     this.deleteItem(this.state.idMarkedForDelete);
        //
        // this.setState({
        //     idMarkedForDelete: null,
        //     modalIsOpen: !this.state.modalIsOpen,
        // });
    }

    getWorkoutDayData() {
        // WorkoutDayDataRetriever.getWorkoutDayData(this.state.workoutId, (w) => this.setState({workoutDay: w}));
        // this.getWorkoutNameData();
    }

    getWorkoutNameData() {
        // WorkoutDataRetriever.getSingleWorkoutData(this.state.workoutId,
        //     (w) => {
        //         this.setState({workoutName: w.workout_name});
        //     });
    }

    componentDidMount() {
        // this.getWorkoutDayData();
    }

    deleteItem(id) {
        // axios.get('http://localhost:4000/workoutDay/delete/' + id)
        //     .then(res => this.getWorkoutDayData());
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
        })
        // if (shouldUpdate)
        //     this.getWorkoutDayData();
    }

    renderIndex() {
        return (
            <div>
                <h3>Assigned exercises</h3>
                <Button variant="contained" color="primary"
                        key={'add'}
                        onClick={() => this.addItem()}>Add Exercise
                </Button>
            </div>
        )
    }

    renderAdd() {
        return (
            <div>
                <SelectExercise/>
                {/*<div style={{marginTop: 10}}>*/}
                {/*    <h2>{this.state.workoutName} - Trainingstage</h2>*/}
                {/*    <Create workoutId={this.state.workoutId} back={(u) => this.backToIndex(u)}/>*/}
                {/*</div>*/}
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