import React, {Component} from 'react';
import BusinessData from "./BusinessData";
import axios from "axios";

export default class BusinessForm extends Component {
    constructor(props) {
        super(props);
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            _id: props.id,
            edit: props.id ? true : false,
            person_name: '',
            business_name: '',
            business_gst_number: '',
            pageStatus: '',
        }
    }

    onChangePersonName(e) {
        this.setState({
            person_name: e.target.value
        });
    }

    onChangeBusinessName(e) {
        this.setState({
            business_name: e.target.value
        })
    }

    onChangeGstNumber(e) {
        this.setState({
            business_gst_number: e.target.value
        })
    }

    componentDidMount() {
        if (this.state._id) {
            BusinessData.getSingleBusinessData(this.state._id,
                (b) => this.setState({
                    person_name: b.person_name,
                    business_name: b.business_name,
                    business_gst_number: b.business_gst_number,
                }));
        }
    }

    submitMethod(b) {
        if (this.state.edit) {
            axios.post('http://localhost:4000/business/update/' + this.state._id, b)
                .then(res => console.log(res.data));
        } else {
            axios.post('http://localhost:4000/business/add', b)
                .then(res => console.log(res.data));
        }
    }


    onSubmit(e) {
        e.preventDefault();
        this.submitMethod(this.state)
        this.setState({pageStatus: 'Saved successfully'});
        if (!this.state.edit) {
            this.setState({
                person_name: '',
                business_name: '',
                business_gst_number: '',
            });
        }
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                {this.state.pageStatus ? <div>{this.state.pageStatus}</div> : ''}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Person Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.person_name}
                            onChange={this.onChangePersonName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Business Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.business_name}
                               onChange={this.onChangeBusinessName}
                        />
                    </div>
                    <div className="form-group">
                        <label>GST Number: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.business_gst_number}
                               onChange={this.onChangeGstNumber}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}