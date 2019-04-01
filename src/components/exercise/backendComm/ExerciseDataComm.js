import axios from "axios";

export default class ExerciseDataComm {

    static getExerciseData(updateData) {
        axios.get('http://localhost:4000/exercise/')
            .then(response => {
                console.log('Exercise data loaded from BE');
                updateData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    static getSingleExerciseData(id, updateData) {
        axios.get('http://localhost:4000/exercise/edit/' + id)
            .then(response => {
                console.log('Exercise single data updated from BE');
                response.data ? updateData(response.data) : console.log('Not 1 element returned');
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    static insertExercise(exercise, updateData) {
        axios.post('http://localhost:4000/exercise/add', exercise)
            .then(response => {
                updateData(response.data)
            });
    }

    static updateExercise(exerciseId, exercise, updateData) {
        axios.post('http://localhost:4000/exercise/update/' + exerciseId, exercise)
            .then(response => {
                updateData(response.data)
            });
    }

    static deleteExercise(exerciseId, updateData) {
        axios.get('http://localhost:4000/exercise/delete/' + exerciseId)
            .then(response => updateData());
    }


}

