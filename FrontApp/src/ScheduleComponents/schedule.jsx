import { Component as InfernoComponent } from "inferno";
import { TabulatorFull as Tabulator } from "tabulator-tables";

class Schedule extends InfernoComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("Schedule component mounted");

		this.table = new Tabulator(document.getElementById("scheduleTable"), {
			height: "100%",
			layout:"fitColumns", //fit columns to width of table (optional)
			data: this.props.taskList,
			columns:[ //Define Table Columns
				{ title:"# Tarea", field:"taskNumber", hozAlign: "center", width: 120 },
				{ title:"Área", field:"area", hozAlign:"center", width: 150 },
				{ title:"Actividad", field: "activity", hozAlign: "center", width: 400, frozen: true },
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
		const { className } = this.props;

		return (
			<div className={ `${className} w-full @container overflow-x-scroll` }>
				<div id="scheduleTable" className="table table-pin-cols w-full h-full"></div>
			</div>
		);
	}
}

export default Schedule;