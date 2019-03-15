import axios from "axios";

export default class WorkoutDataRetriever {

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
        axios.get('http://localhost:4000/workout/edit/'+id)
            .then(response => {
                console.log('Workout single data updated from BE');
                response.data ? updateData(response.data) : console.log('Not 1 element returned');
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

