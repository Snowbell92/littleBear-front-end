import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";


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
				<span>
					{error}
				</span>}
		</div>
	</div>;


const Label = (props) => (
	<label className={`col-${props.width} ${props.refClass}`}>{props.name}</label>

);
class Location extends Component {

    render()
    {

        return(
            <div>
                <button type="button" className="btn btn-primary">Get your location</button>
            </div>
            )
    }
}

export {
	renderField,
	Label,
	Location
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

const renderDropdownList = ({ input, data, valueField, textField }) =>
	<DropdownList
		{...input}
		data={data}
		valueField={valueField}
		textField={textField}
		onChange={input.onChange}
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
								name="village"
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
								name="upazilla"
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
								name="district"
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
								name="division"
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
						name="campName"
						label="Camp Name"
						component="input"
						type="text"
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Block</label>
					<Field
						name="block"
						component={renderDropdownList}
						data={blocks}
						valueField="block"
						textField="block"
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Ward</label>
					<Field
						name="district"
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

