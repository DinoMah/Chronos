import { Component as InfernoComponent, linkEvent } from "inferno";
import Select from '../Generic/SelectComponent';

class TaskForm extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
            controlsDisabled: !props.componentsEnabled,
            areaId: 0,
            areaName: "",
            activity: "",
            userId: 0,
            userName: "",
            initDate: "",
            endDate: "",
            areas: [],
            users: []
        };

        this.onRegisterAdd = this.onRegisterAdd.bind(this);
    }

    componentDidMount() {
        console.log("taskFormMounted");

        const instance = this;

        fetch("http://localhost:5084/user/all")
        .then(res => {
            if (!res.ok) throw new Error("Error: " + res.status);
            return res.json()
        })
        .then(data => {
            let usersData = [];
            data.forEach(e => {
                usersData.push({id: e.id, name: e.fullName});
            });
            instance.setState({users: usersData});
        })
        .catch(err => console.log(err));

        fetch("http://localhost:5084/area/all")
        .then(res => {
            if (!res.ok) throw new Error("Error: " + res.status);
            return res.json();
        })
        .then(data => {
            let areasData = [];
            data.forEach(e => {
                areasData.push({id: e.id, name: e.name });
            });
            instance.setState({areas: areasData});
        })
        .catch(err => console.log(err))
    }

    onAreaSelected = (event) => {
        const selArea = event.target.selectedIndex;
        this.setState({
            areaId: selArea, 
            areaName: event.target.options[selArea].text
        });
    }

    onUserSelected = (event) => {
        const selUser = event.target.selectedIndex;
        this.setState({
            userId: selUser,
            userName: event.target.options[selUser].text
        });
    }

    onRegisterAdd(instance) {
        let badInputNum = 0;

        const areaSelect = document.getElementById("areaSelect");
        if (!areaSelect.selectedIndex) {
            areaSelect.classList.add("input-error");
            areaSelect.focus();
            badInputNum += 1;
        }
        else {
            areaSelect.classList.remove("input-error");
        }

        const userSelect = document.getElementById("userSelect");
        if (!userSelect.selectedIndex) {
            userSelect.classList.add("input-error");
            userSelect.focus();
            badInputNum += 1;
        }
        else {
            userSelect.classList.remove("input-error");
        }
        
        const activityInput = document.getElementById("activity");
        const activity = activityInput.value;
        if (!activity) {
            activityInput.classList.add("input-error");
            activityInput.focus();
            badInputNum += 1;
        }
        else {
            activityInput.classList.remove("input-error");
        }
        
        const initDateInput = document.getElementById("initDate");
        const initDate = initDateInput.value;
        if (!initDate) {
            initDateInput.classList.add("input-error");
            initDateInput.focus();
            badInputNum += 1;
        }
        else {
            initDateInput.classList.remove("input-error");
        }
        
        const endDateInput = document.getElementById("endDate");
        const endDate = document.getElementById("endDate").value;
        if (!endDate) {
            endDateInput.classList.add("input-error");
            endDateInput.focus();
            badInputNum += 1;
        }
        else {
            endDateInput.classList.remove("input-error");
        }
        
        if (badInputNum === 0) {
            this.props.addItem({
                taskNumber: 0,
                areaId: this.state.areaId,
                area: this.state.areaName,
                userId: this.state.userId,
                user: this.state.userName,
                activity: activity,
                initDate: initDate,
                endDate: endDate
            });
        }
        else {
            alert("No se puede agregar la tarea, tiene campos erroneos o incompletos");
        }
    }

    render() {
        const { className, minimumDate } = this.props;

        return (
            <div className={ `${className} flex flex-row content-center justify-center w-screen` }>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Área</legend>
                    <Select id="areaSelect" className="w-30" disabled={this.state.controlsDisabled} defaultValue="Selecciona el área" options={this.state.areas} onChange={ this.onAreaSelected }/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Usuario</legend>
                    <Select id="userSelect" className="w-30" disabled={this.state.controlsDisabled} defaultValue="Selecciona el usuario" options={this.state.users} onChange={ this.onUserSelected }/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Actividad</legend>
                    <input id="activity" type="text" className="input w-72" disabled={this.state.controlsDisabled}/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Inicio</legend>
                    <input id="initDate" type="date" className="input" min={minimumDate} disabled={this.state.controlsDisabled}/>
                </fieldset>
                
                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Final</legend>
                    <input id="endDate" type="date" className="input" disabled={this.state.controlsDisabled}/>
                </fieldset>
                

                <button type="button" className="btn btn-success ml-15 self-center" onClick={ this.onRegisterAdd } disabled={this.state.controlsDisabled}>Agregar actividad</button>
            </div>
        );
    }
}

export default TaskForm;