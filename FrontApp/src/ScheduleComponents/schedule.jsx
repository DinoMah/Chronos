import { Component as InfernoComponent } from "inferno";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import TaskForm from "./taskForm";
import ModalComponent from "../Generic/ModalComponent";

class Schedule extends InfernoComponent {
	constructor(props) {
		super(props);

		this.state = {
			table: null,
			minimumDate: props.minimumDate,
			maximumDate: props.maximumDate,
			editingRow: false,
			selectedArea: 0,
			selectedUser: 0,
			activity: '',
			startDate: '',
			endDate: ''
		};
	}

	componentDidMount() {
		console.log("Schedule component mounted");

		this.recreateTable();
	}

	recreateTable = () => {
		const instance = this;

		this.table = new Tabulator(document.getElementById("scheduleTable"), {
			height: "100%",
			layout: "fitColumns", //fit columns to width of table (optional)
			data: this.props.taskList,
			columns:[ //Define Table Columns
				{ title:"# Tarea", field:"taskNumber", hozAlign: "center", width: "auto", resizable: false, headerSort: false, headerHozAlign: "center" },
				{ title:"Área", field:"area", hozAlign:"center", width: 150, resizable: false, headerSort: false, headerHozAlign: "center" },
				{ title:"Actividad", field: "activity", hozAlign: "center", width: 400, frozen: true, headerSort: false, headerHozAlign: "center" },
				{ title:"Responsable", field:"user", hozAlign:"center", width: 200, resizable: false, headerSort: false, headerHozAlign: "center" },
				{ title: "Fecha de inicio", field: "initDate", hozAlign: "center", width: 150, resizable: false, headerSort: false, headerHozAlign: "center" },
				{ title: "Fecha de fin", field: "endDate", hozAlign: "center", width: 150, resizable: false, headerSort: false, headerHozAlign: "center" },
			],
			
		});
		
		//trigger an alert message when the row is clicked
		this.table.on("rowClick", function(e, row) {
			const { areaId, userId, activity, initDate, endDate } = row.getData();
			instance.setState({
				editingRow: true,
				selectedArea: areaId,
				selectedUser: userId,
				activity: activity,
				startDate: initDate,
				endDate: endDate
			});
		});

		this.setState({table: this.table });
	}

	closeEditingModal = () => {
		this.setState({editingRow: false});
	}

	componentWillReceiveProps(nextProps, context) {
		if (this.state.minimumDate !== nextProps.minimumDate || this.state.maximumDate !== nextProps.maximumDate) {
			this.setState({ minimumDate: nextProps.minimumDate, maximumDate: nextProps.maximumDate });
			//this.recreateTable();
			return;
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.taskList !== prevProps.taskList)
			this.table.setData(this.props.taskList);
	}

	updateTableDates = () => {
		
	}

	render() {
		const { className } = this.props;
		const { editingRow, selectedArea, selectedUser, activity, startDate, endDate } = this.state;
		return (
			<div className={ `${className} w-full @container overflow-x-scroll` }>
				<div id="scheduleTable" className="table table-pin-cols w-full h-full"></div>
				<ModalComponent isOpen={editingRow} onClose={this.closeEditingModal}>
					<TaskForm
						componentsEnabled={true}
						selectedArea={selectedArea}
						selectedUser={selectedUser}
						activity={activity}
						startDate={startDate}
						endDate={endDate} />
				</ModalComponent>
			</div>
		);
	}
}

export default Schedule;