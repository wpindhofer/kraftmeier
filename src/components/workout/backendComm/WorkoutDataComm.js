import axios from "axios";

export default class WorkoutDataComm {

    static getWorkoutData(id, updateData) {
        axios.get('http://localhost:4000/workout/')
            .then(response => {
                console.log('Workout data updated from BE');
                updateData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    static getSingleWorkoutData(id, updateData) {
        axios.get('http://localhost:4000/workout/edit/' + id)
            .then(response => {
                console.log('Workout single data updated from BE');
                response.data ? updateData(response.data) : console.log('Not 1 element returned');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    static insertWorkout(workout, updateData) {
        axios.post('http://localhost:4000/workout/add', workout)
            .then(response => {
                updateData(response.data)
            });
    }

    static updateWorkout(workoutId, workout, updateData) {
        axios.post('http://localhost:4000/workout/update/' + workoutId, workout)
            .then(response => {
                updateData(response.data)
            });
    }

    static deleteWorkout(workoutId, updateData) {
        axios.get('http://localhost:4000/workout/delete/' + workoutId)
            .then(response => updateData());
    }
}

