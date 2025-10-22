import { Component as InfernoComponent, createRef } from "inferno";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import TaskForm from "./taskForm";
import ModalComponent from "../Generic/ModalComponent";

class Schedule extends InfernoComponent {
	constructor(props) {
		super(props);

		this.taskFormRef = createRef();

		this.state = {
			table: null,
			minimumDate: props.minimumDate,
			maximumDate: props.maximumDate,
			editingRow: false,
			clickedRow: null,
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
				{ title:"Área", field:"area", hozAlign:"center", resizable: false, headerSort: false, headerHozAlign: "center" },
				{ title:"Actividad", field: "activity", hozAlign: "center", frozen: true, headerSort: false, headerHozAlign: "center" },
				{ title:"Responsable", field:"user", hozAlign:"center", resizable: false, headerSort: false, headerHozAlign: "center" },
				{ title: "Fecha de inicio", field: "initDate", hozAlign: "center", resizable: false, headerSort: false, headerHozAlign: "center" },
				{ title: "Fecha de fin", field: "endDate", hozAlign: "center", resizable: false, headerSort: false, headerHozAlign: "center" },
			],
			
		});
		
		//trigger an alert message when the row is clicked
		this.table.on("rowClick", function(e, row) {
			const { areaId, userId, activity, initDate, endDate } = row.getData();
			instance.setState({
				clickedRow: row,
				editingRow: true,
				selectedArea: areaId,
				selectedUser: userId,
				activity: activity,
				startDate: initDate,
				endDate: endDate
			});
		});

		this.setState({table: this.table });

		this.updateRowInfo = this.updateRowInfo.bind(this);
	}

	closeEditingModal = () => {
		this.setState({editingRow: false});
	}

	componentWillReceiveProps(nextProps, context) {
		if (this.state.minimumDate !== nextProps.minimumDate || this.state.maximumDate !== nextProps.maximumDate) {
			this.setState({ minimumDate: nextProps.minimumDate, maximumDate: nextProps.maximumDate });
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.taskList !== prevProps.taskList)
			this.table.setData(this.props.taskList);
	}

	updateRowInfo() {
		let badInputsCount = 0;

		const areaSelect = document.getElementsByName("areaSelect")[1];
		//this.taskFormRef.current?.querySelector('[data-input="areaSelect"]');
		const selAreaIndex = areaSelect.selectedIndex;
		if (selAreaIndex == '0') {
			areaSelect.classList.add('input-error');
			areaSelect.focus();
			badInputsCount++;
		}
		else {
			areaSelect.classList.remove('input-error');
		}

		const userSelect = document.getElementsByName('userSelect')[1];
		//this.taskFormRef.current?.querySelector('[data-input="userSelect"]');
		const selUserIndex = userSelect.selectedIndex;
		if (selUserIndex == '0') {
			userSelect.classList.add('input-error');
			userSelect.focus();
			badInputsCount++;
		}
		else {
			userSelect.classList.remove('input-error');
		}
		
		const activityInput = document.getElementsByName('activity')[1];
		//this.taskFormRef.current?.querySelector('[data-input="activity"]');
		const activityVal = activityInput.value;
		if (!activityVal) {
			activityInput.classList.add('input-error');
			activityInput.focus();
			badInputsCount++;
		}
		else {
			activityInput.classList.remove('input-error');
		}
		
		const startDateInput = document.getElementsByName('initDate')[1];
		//this.taskFormRef.current?.querySelector('[data-input="startDate"]');
		const startDateVal = startDateInput.value;
		if (!startDateVal) {
			startDateInput.classList.add('input-error');
			startDateInput.focus();
			badInputsCount++;
		}
		else {
			startDateInput.classList.remove('input-error');
		}
		
		const endDateInput = document.getElementsByName('endDate')[1];
		//this.taskFormRef.current?.querySelector('[data-input="endDate"]');
		const endDateVal = endDateInput.value;
		if (!endDateVal) {
			endDateInput.classList.add('input-error');
			endDateInput.focus();
			badInputsCount++;
		}
		else {
			endDateInput.classList.remove('input-error');
		}

		if (badInputsCount == 0) {
			this.state.clickedRow.update({
				'area': areaSelect.options[selAreaIndex].text,
				'activity': activityVal,
				'user': userSelect.options[selUserIndex].text,
				'initDate': startDateVal,
				'endDate': endDateVal
			});
			this.closeEditingModal();
		}
		else {
			alert("Error: algunos campos contienen información incorrecta o están vacíos");
		}
	}

	render() {
		const { className } = this.props;
		let { editingRow, selectedArea, selectedUser, activity, startDate, endDate } = this.state;
		return (
			<div className={ `${className} w-full @container overflow-x-scroll` }>
				<div id="scheduleTable" className="table table-pin-cols w-full h-full"></div>
				<ModalComponent isOpen={editingRow} onClose={this.closeEditingModal}>
					<TaskForm
						ref={this.taskFormRef}
						minimumDate={this.state.minimumDate}
						maximumDate={this.state.maximumDate}
						className=''
						editingRow={editingRow}
						componentsEnabled={true}
						selectedArea={selectedArea}
						selectedUser={selectedUser}
						activity={activity}
						startDate={startDate}
						endDate={endDate} 
						onButtonPressed={this.updateRowInfo}
						buttonText='Modificar información'/>
				</ModalComponent>
			</div>
		);
	}
}

export default Schedule;