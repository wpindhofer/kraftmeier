import axios from "axios";

export default class WorkoutDayDataComm {

    static getWorkoutDayData(workoutId, updateData) {
        axios.get('http://localhost:4000/workoutDay/' + workoutId)
            .then(response => {
                console.log('Workout Day data loaded for workout:' + workoutId + ' from BE');
                updateData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    static getSingleWorkoutDayDataPopulated(id, updateData) {
        axios.get('http://localhost:4000/workoutDay/getPopulated/' + id)
            .then(response => {
                console.log('Workout Day single data plus exercises queried from BE');
                response.data ? updateData(response.data) : console.log('Not 1 element returned');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    static getSingleWorkoutDayData(id, updateData) {
        axios.get('http://localhost:4000/workoutDay/edit/' + id)
            .then(response => {
                console.log('Workout Day single data updated from BE');
                response.data ? updateData(response.data) : console.log('Not 1 element returned');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    static insertWorkoutDay(workoutDay, updateData) {
        axios.post('http://localhost:4000/workoutDay/add', workoutDay)
            .then(response => {
                updateData(response.data)
            });
    }


    static updateWorkoutDay(workoutDayId, workoutDay, updateData) {
        axios.post('http://localhost:4000/workoutDay/update/' + workoutDayId, workoutDay)
            .then(response => {
                updateData(response.data)
            });
    }

    static deleteWorkoutDay(workoutDayId, updateData) {
        axios.get('http://localhost:4000/workoutDay/delete/' + workoutDayId)
            .then(response => updateData());
    }

    static addExerciseToWorkoutDay(workoutDayId, exerciseId, updateData) {
        axios.post('http://localhost:4000/workoutDay/addExercise/' + workoutDayId, {exerciseId: exerciseId})
            .then(response => {updateData()});
        return;
    }

    static removeExerciseToWorkoutDay(workoutDayId, exerciseId, updateData) {
        axios.post('http://localhost:4000/workoutDay/removeExercise/' + workoutDayId, {exerciseId: exerciseId})
            .then(response => {updateData()});
        return;
    }
}

