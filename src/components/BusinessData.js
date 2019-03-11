import axios from "axios";

export default class BusinessData {

    static getBusinessData(id, updateData) {
        axios.get('http://localhost:4000/business/')
            .then(response => {
                console.log('Data updated from BE');
                updateData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    static getSingleBusinessData(id, updateData) {
        axios.get('http://localhost:4000/business/edit/'+id)
            .then(response => {
                console.log('Data updated from BE');
                response.data ? updateData(response.data) : console.log('Not 1 element returned');
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

