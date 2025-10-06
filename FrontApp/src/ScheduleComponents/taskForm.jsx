import { Component as InfernoComponent } from "inferno";
import Select from '../Generic/SelectComponent';

class TaskForm extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
            area: 0,
            activity: "",
            user: 0,
            initDate: "",
            endDate: "",
            areas: [
                {id: 1, name: "SISTEMAS"},
                {id: 1, name: "MECÁNICA"},
                {id: 1, name: "CONTROL"},
                {id: 1, name: "ADMINISTRACIÓN"},
                {id: 1, name: "INSTALACIONES"}
            ],
            users: [
                {id: 1, name: "Juan Carlos Herrera"},
                {id: 2, name: "Victor Paramo"},
                {id: 3, name: "Yune Ruvalcaba"},
                {id: 4, name: "Luis Herrera"},
                {id: 5, name: "Nestor Josue"}
            ]
        };
    }

    componentDidMount() {
        console.log("taskFormMounted");

        fetch("http://localhost:5084/user/all")
        .then(res => console.log(res.json()))
        .catch(err => console.log(err));
    }

    onAreaSelected(event) {
        const selectedVal = event.target.selected;
    }

    onUserSelected(event) {
        const selectedVal = event.target.selected;
    }

    onRegisterAdd() {
        const areaId = document.getElementById("areaSelect").selectedValue;
        const areaName = document.getElementById("areaSelect").text;
        const userId = document.getElementById("userSelect").selectedValue;
        const userName = document.getElementById("userSelect").selectedText;
        const activity = document.getElementById("activity").value;
        const initDate = document.getElementById("initDate").value;
        const endDate = document.getElementById("endDate").value;
        this.props.addItem({
            taskNumber: 0,
            areaId: areaId, area: areaName,
            userId: userId, user: userName,
            activity: activity,
            initDate: initDate,
            endDate: endDate
        });
    }

    render() {
        return (
            <div className="flex flex-row content-center justify-center w-screen h-20">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Área</legend>
                    <Select id="areaSelect" className="w-30" defaultValue="Selecciona el área" options={this.state.areas} onChange={this.onAreaSelected}/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Usuario</legend>
                    <Select id="userSelect" className="w-30" defaultValue="Selecciona el usuario" options={this.state.users} onChange={this.onUserSelected}/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Actividad</legend>
                    <input id="activity" type="text" className="input w-72"/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Inicio</legend>
                    <input id="initDate" type="date" className="input"/>
                </fieldset>
                
                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Final</legend>
                    <input id="endDate" type="date" className="input"/>
                </fieldset>
                

                <button type="button" className="btn btn-success ml-15 self-center" onClick={this.onRegisterAdd}>Agregar actividad</button>
            </div>
        );
    }
}

export default TaskForm;