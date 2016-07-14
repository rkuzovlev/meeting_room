import React from 'react'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const removeButtonDialogStyle = {
	color: 'red'
};


export default React.createClass({
	getInitialState() {
		return {modalOpenned: false};
	},

	openModal() {
		this.setState({modalOpenned: true});
	},

	closeModal() {
		this.setState({modalOpenned: false});
	},

	deleteRoom() {
		this.closeModal()
	},

	render() {
		const actions = [
			<FlatButton
				label="delete room"
				onClick={this.deleteRoom}
				style={removeButtonDialogStyle}
			/>,
			<FlatButton
				label="Cancel"
				onClick={this.closeModal}
			/>
		];

		return (
			<section className="roomAddEdit">
				<h1>{this.props.route.name == "roomEdit" ? 'Room Edit' : 'Add room'}</h1>

				<Dialog
					title="Delete room"
					actions={actions}
					modal={false}
					open={this.state.modalOpenned}
					onRequestClose={this.closeModal}
				>
					Do you realy want to delete this room?
				</Dialog>


				<form action="">
					<TextField  fullWidth={true} 
								name="title" 
								floatingLabelText="Title of the room"
					/><br />
					
					<TextField  fullWidth={true} 
								name="image" 
								floatingLabelText="Image link"
					/><br />

					<TextField  name="description"
								floatingLabelText="Description" 
								multiLine={true} 
								rows={2}
								fullWidth={true}
					/><br />
					
					<div className="buttons">
						{this.props.route.name == "roomEdit" ? <FlatButton onClick={this.openModal} label="delete" /> : null}
						<FlatButton label="save" secondary={true} />
					</div>
				</form>
			</section>
		)
	}
})