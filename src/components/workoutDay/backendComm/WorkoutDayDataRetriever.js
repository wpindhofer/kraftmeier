import axios from "axios";

export default class WorkoutDayDataRetriever {

    static getWorkoutDayData(workoutId, updateData) {
        axios.get('http://localhost:4000/workoutDay/'+workoutId)
            .then(response => {
                console.log('Workout Day data loaded for workout:'+workoutId+' from BE');
                updateData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    static getSingleWorkoutDayData(id, updateData) {
        axios.get('http://localhost:4000/workoutDay/edit/'+id)
            .then(response => {
                console.log('Workout Day single data updated from BE');
                response.data ? updateData(response.data) : console.log('Not 1 element returned');
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

