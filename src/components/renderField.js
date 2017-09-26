import React, { Component } from "react";
import {PropTypes} from "react";
import { Field, reduxForm } from "redux-form";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import axios from 'axios';
import {BASE_URL} from './../middleware/api'


const renderField = ({ input, label, type, meta: { touched, error } }) =>
	<div className="form-group">
		<label className="col-sm-2 control-label">
			{label}
		</label>
		<div className="col-sm-10">
			<input
				{...input}
				placeholder={label}
				type={type}
				className="form-control"
			/>
			{touched &&
				error &&
				<span className="has-error alert alert-danger">
					{error}
				</span>}
		</div>
	</div>;


const Label = (props) => (
	<label className={`col-${props.width} ${props.refClass}`}>{props.name}</label>

);


class Household extends Component {
	constructor(){
		super();
        this.state = {
            data: [],
			key:[],
        };

        this.getHouses = this.getHouses.bind(this);

	}

	componentDidMount() {
        this.getHouses()
	}
    getHouses = (e) =>  {
        let token = localStorage.getItem('id_token') || null;
        const AuthStr = 'Bearer '.concat(token);
        axios.get(BASE_URL + 'household/list', { headers: { Authorization: AuthStr } }).then((response) =>
            {
                let myData = response.data;

                let list = [];
                let key =[];
                for (let i = 0; i < myData._embedded.length; i++) {
                    let embedded = myData._embedded[i];
                    list.push(embedded.friendlyName);
                    key.push(embedded.id);
                }

                this.setState({data: list, key: key});

            })
            .catch((error) => {
                console.log('error' + error);
            });
    }



    render()
    {

        return(
            <div>
				<Field
					name="houseHold"
					type="text"
					component={renderDropdownList}
					data={this.state.key}
					label="family"
					className="form-control"
					placeholder="select your family"
					valueField="value"
					value={this.state.key}
				/>



            </div>
            )
    }
}

class HouselholdRole extends Component {
    constructor(){
        super();
        this.state = {
            data: []
        };

        this.getRole = this.getRole.bind(this);

    }

    componentDidMount() {
        this.getRole()
    }
    getRole = (e) =>  {
        let token = localStorage.getItem('id_token') || null;
        const AuthStr = 'Bearer '.concat(token);
        axios.get(BASE_URL + 'householdrole/list', { headers: { Authorization: AuthStr } }).then((response) =>
        {
			let myData = response.data;
            let list = []
            for (let i = 0; i < myData._embedded.length; i++) {
                let embedded = myData._embedded[i];
                list.push(embedded.friendlyName);
            }
            this.setState({data: list});

        })
            .catch((error) => {
                console.log('error' + error);
            });
    }

    render()
    {

        return(
			<div>
				<Field
					name="role"
					type="text"
					component={renderDropdownList}
					data={this.state.data}
					label="family"
					className="form-control"
					placeholder="select your family"
				/>
			</div>
        )
    }
}


export {
	renderField,
	Label,
	Household
};




const upazillas = [
	"red", "green","blue"
];

const districts = [
    "1","2","3","4","5","6"
];

const divisions = [
    "Dhaka", "Barisal","Khulna","Chittagong","Sylhet","Rajshahi"
];

const blocks = [
	"1","2","3","4","5","6"
];

const renderDropdownList = ({ input, data, valueField, textField, value }) =>
	<DropdownList
		{...input}
		data={data}
		valueField={valueField}
		textField={textField}
		onChange={input.onChange}
		value={value}
	/>;

export class Address extends Component {
	render() {
		return (
			<div className="address-group">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label className="control-label">Village</label>
							<Field
								name="address_village"
								label="{name}"
								component="input"
								type="text"
								className="form-control"
							/>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-4">
						<div className="form-group">
							<label className="control-label">Upazilla</label>
							<Field
								name="address_upazilla"
								component={renderDropdownList}
								data={upazillas}
								valueField="upazilla"
								textField="upazilla"
							/>
						</div>
					</div>

					<div className="col-sm-4">
						<div className="form-group">
							<label className="control-label">District</label>
							<Field
								name="address_district"
								component={renderDropdownList}
								data={districts}
								valueField="district"
								textField="district"
							/>
						</div>
					</div>

					<div className="col-sm-4">
						<div className="form-group">
							<label className="control-label">Division</label>
							<Field
								name="address_division"
								component={renderDropdownList}
								data={divisions}
								valueField="division"
								textField="division"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export class Host extends Component {
    render() {
        return (
			<div className="address-group">
				<div className="row">
					<div className="col-sm-12">
						<div className="form-group">
							<label className="control-label">Village</label>
							<Field
								name="host_address_village"
								label="{name}"
								component="input"
								type="text"
								className="form-control"
							/>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-4">
						<div className="form-group">
							<label className="control-label">Upazilla</label>
							<Field
								name="host_address_upazilla"
								component={renderDropdownList}
								data={upazillas}
								valueField="upazilla"
								textField="upazilla"
							/>
						</div>
					</div>

					<div className="col-sm-4">
						<div className="form-group">
							<label className="control-label">District</label>
							<Field
								name="host_address_district"
								component={renderDropdownList}
								data={districts}
								valueField="district"
								textField="district"
							/>
						</div>
					</div>

					<div className="col-sm-4">
						<div className="form-group">
							<label className="control-label">Division</label>
							<Field
								name="host_address_division"
								component={renderDropdownList}
								data={divisions}
								valueField="division"
								textField="division"
							/>
						</div>
					</div>
				</div>
			</div>
        );
    }
}


export class Camp extends Component {
	render() {
		return (
			<div className="address-group clearfix">
				<div className="form-group">
					<label className="control-label">Camp Name</label>
					<Field
						name="camp_name"
						label="Camp Name"
						component="input"
						type="text"
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Block</label>
					<Field
						name="camp_block"
						component={renderDropdownList}
						data={blocks}
						valueField="block"
						textField="block"
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Ward</label>
					<Field
						name="camp_ward"
						component={renderDropdownList}
						data={districts}
						valueField="district"
						textField="district"
					/>
				</div>
			</div>
		);
	}
}

export class GetLocation extends Component{
    constructor(){
        super();
        this.getMyLocation = this.getMyLocation.bind(this);
    }

    getMyLocation = () => {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition((position) => {
                this.props.onLocationChanged(position.coords);
            })
        }
    };

    render(){
        return(
			<div>
				<p>Your location is </p>
				<Field
					name="latitude"
					component="input"
					className="form-control"
				/>
				<Field
					name="longitude"
					component="input"
					className="form-control"
				/>
				<button type="button" className="btn btn-success" onClick={this.getMyLocation.bind(this)}>Get Geolocation</button>
			</div>

        );
    }
}



