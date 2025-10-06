import table from "daisyui/components/table";
import { Component as InfernoComponent } from "inferno";
import { TabulatorFull as Tabulator } from "tabulator-tables";

class Schedule extends InfernoComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("Schedule component mounted");

		this.table = new Tabulator(document.getElementById("scheduleTable"), {
			height: "h-full", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
			layout:"fitColumns", //fit columns to width of table (optional)
			data: this.props.taskList,
			columns:[ //Define Table Columns
				{ title:"# Tarea", field:"taskNumber", hozAlign: "center", width: 120 },
				{ title:"Área", field:"area", hozAlign:"center", width: 150 },
				{ title:"Actividad", field: "activity", hozAlign: "center", width: 400 },
				{ title:"Responsable", field:"user", hozAlign:"center", width: 200 },
				{ title: "Fecha de inicio", field: "initDate", hozAlign: "center", width: 100},
				{ title: "Fecha de fin", field: "endDate", hozAlign: "center", width: 100},
			],
		});
		//trigger an alert message when the row is clicked
		this.table.on("rowClick", function(e, row){ 
			alert("Row " + row.getData().id + " Clicked!!!!");
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.taskList !== prevProps.taskList)
			this.table.setData(this.props.taskList);
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