import React, {Component} from 'react';
import BusinessForm from './businessForm.component';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.match.params.id,
        };
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Edit Business</h3>
                <BusinessForm id={this.state._id}/>
            </div>
        )
    }
}