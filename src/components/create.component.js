import React, {Component} from 'react';
import BusinessForm from './businessForm.component';

export default class Create extends Component {
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Business</h3>
                <BusinessForm />
            </div>
        )
    }
}