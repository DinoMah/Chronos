import { Component as InfernoComponent, linkEvent } from "inferno";
import Select from '../Generic/SelectComponent';

class TaskForm extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
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
        const activity = document.getElementById("activity").value;
        const initDate = document.getElementById("initDate").value;
        const endDate = document.getElementById("endDate").value;
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

    render() {
        const { className } = this.props;

        return (
            <div className={ `${className} flex flex-row content-center justify-center w-screen h-20` }>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Área</legend>
                    <Select id="areaSelect" className="w-30" defaultValue="Selecciona el área" options={this.state.areas} onChange={ this.onAreaSelected }/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Usuario</legend>
                    <Select id="userSelect" className="w-30" defaultValue="Selecciona el usuario" options={this.state.users} onChange={ this.onUserSelected }/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Actividad</legend>
                    <input id="activity" type="text" className="input w-72"/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Inicio</legend>
                    <input id="initDate" type="date" className="input" min=""/>
                </fieldset>
                
                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Final</legend>
                    <input id="endDate" type="date" className="input"/>
                </fieldset>
                

                <button type="button" className="btn btn-success ml-15 self-center" onClick={ this.onRegisterAdd }>Agregar actividad</button>
            </div>
        );
    }
}

export default TaskForm;