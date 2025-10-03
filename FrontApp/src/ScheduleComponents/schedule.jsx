import { Component as InfernoComponent } from "inferno";
import { TabulatorFull as Tabulator } from "tabulator-tables";

class Schedule extends InfernoComponent {
	constructor(props) {
		super(props);
		this.state = {
			tableData: this.props.taskList
		}
	}

	componentDidMount() {
		console.log("Schedule component mounted");
		let table = new Tabulator(document.getElementById("scheduleTable"), {
			height: "h-full", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
			data: this.state.tableData, //assign data to table
			layout:"fitColumns", //fit columns to width of table (optional)
			columns:[ //Define Table Columns
				{ title:"# Tarea", field:"taskNumber", hozAlign: "center", width: 120 },
				{ title:"Área", field:"area", hozAlign:"center", width: 150 },
				{ title:"Actividad", field: "activity", hozAlign: "center", width: 400 },
				{ title:"Responsable", field:"user", hozAlign:"center", width: 200 },
			],
		});

		//trigger an alert message when the row is clicked
		table.on("rowClick", function(e, row){ 
			alert("Row " + row.getData().id + " Clicked!!!!");
		});
	}

	render() {
		return (
			<div class="container h-full">
				<div id="scheduleTable" class="table overflow-x-auto h-full"></div>
			</div>
		);
	}
}

export default Schedule;