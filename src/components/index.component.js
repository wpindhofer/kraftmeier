import React, {Component} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import BusinessData from "./BusinessData";

function RenderBusinesses(props) {
    const renderMe = props.business.map((b) =>
        <div key={b._id}>
            Person: {b.person_name}<br/>
            Business: {b.business_name}<br/>
            Number: {b.business_gst_number}<br/>
            <Link to={"/edit/" + b._id} className="btn btn-primary">Edit business</Link><br/>
            <button className="btn btn-danger" key={b._id + 'remove'} onClick={() => props.deleteItem(b._id)}>Remove
                business
            </button>
            <p/>
        </div>
    );
    return renderMe;
}

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business: [],
        };
    }

    getBusinessData() {
        axios.get('http://localhost:4000/business/')
            .then(response => {
                this.setState({
                    business: response.data,
                });
                console.log('Data updated from BE');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        BusinessData.getBusinessData('', (b) => this.setState({business: b}));
    }

    updateByRemovingItemFromState(item) {
        let itemToBeRemoved = item;
        let businessNew = this.state.business;
        let pos = businessNew.map(function (e) {
            return e._id;
        }).indexOf(itemToBeRemoved._id);
        businessNew.splice(pos, 1);
        this.setState({
            business: businessNew,
        })
    }

    deleteItem(id) {
        axios.get('http://localhost:4000/business/delete/' + id)
            .then(res => {
                // Update by removing one item
                // this.updateByRemovingItemFromState(res.data);

                //Update by quering again
                this.getBusinessData();
            });
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>My Business</h3>
                <RenderBusinesses business={this.state.business} deleteItem={(id) => this.deleteItem(id)}/>
            </div>
        )
    }
}