import { Component as InfernoComponent, linkEvent } from "inferno";
import Select from '../Generic/SelectComponent';

class TaskForm extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
            controlsDisabled: !props.componentsEnabled,
            userSelectDisabled: true,
            areaId: 0,
            areaName: "",
            activity: "",
            userId: 0,
            userName: "",
            initDate: "",
            endDate: "",
            areas: [],
            users: [],
            filteredUsers: [],
            selectedArea: props.selectedArea,
            selectedUser: props.selectedUser,
            activity: props.activity,
            startDate: props.startDate,
            endDate: props.endDate
        };

        this.onRegisterAdd = this.onRegisterAdd.bind(this);
    }

    componentDidMount() {
        console.log("taskFormMounted");

        const { selectedArea, selectedUser, activity, startDate, endDate } = this.props;

        this.setState({
            selectedArea: selectedArea || 0,
            selectedUser: selectedUser || 0,
            activity: activity || '',
            startDate: startDate || '',
            endDate: endDate || ''
        });

        const instance = this;

        fetch("http://localhost:5084/user/all")
        .then(res => {
            if (!res.ok) throw new Error("Error: " + res.status);
            return res.json()
        })
        .then(data => {
            let usersData = [];
            data.forEach(e => {
                usersData.push({id: e.id, name: e.fullName, area: e.area});
            });
            instance.setState({users: usersData, filteredUsers: usersData});
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

        const disable = selArea == '0';

        let users = this.state.users;

        if (selArea != '0') {
            users = users.filter(u => u.area == selArea);
        }
        
        this.setState({
            userSelectDisabled: disable,
            filteredUsers: users,
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

    onRegisterAdd() {
        let badInputNum = 0;

        const areaSelect = document.getElementsByName("areaSelect")[0];
        if (!areaSelect.selectedIndex) {
            areaSelect.classList.add("input-error");
            areaSelect.focus();
            badInputNum += 1;
        }
        else {
            areaSelect.classList.remove("input-error");
        }

        const userSelect = document.getElementsByName("userSelect")[0];
        if (!userSelect.selectedIndex) {
            userSelect.classList.add("input-error");
            userSelect.focus();
            badInputNum += 1;
        }
        else {
            userSelect.classList.remove("input-error");
        }
        
        const activityInput = document.getElementsByName("activity")[0];
        const activity = activityInput.value;
        if (!activity) {
            activityInput.classList.add("input-error");
            activityInput.focus();
            badInputNum += 1;
        }
        else {
            activityInput.classList.remove("input-error");
        }
        
        const initDateInput = document.getElementsByName("initDate")[0];
        const initDate = initDateInput.value;
        if (!initDate) {
            initDateInput.classList.add("input-error");
            initDateInput.focus();
            badInputNum += 1;
        }
        else {
            initDateInput.classList.remove("input-error");
        }
        
        const endDateInput = document.getElementsByName("endDate")[0];
        const endDate = document.getElementsByName("endDate")[0].value;
        if (!endDate) {
            endDateInput.classList.add("input-error");
            endDateInput.focus();
            badInputNum += 1;
        }
        else if (endDate < initDate) {
            alert("La fecha de fin no debe ser menor a la fecha de inicio");
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
        const { className, minimumDate, maximumDate } = this.props;
        const { selectedArea, selectedUser, activity, startDate, endDate } = this.state;
        const controlsDisabled = !this.props.componentsEnabled;

        return (
            <div className={ `${className} flex flex-row content-center justify-center w-screen` }>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Área</legend>
                    <Select name="areaSelect" className="w-30" disabled={controlsDisabled} selected={selectedArea} defaultValue="Selecciona el área" options={this.state.areas} onChange={ this.onAreaSelected }/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Usuario</legend>
                    <Select name="userSelect" className="w-30" disabled={this.state.userSelectDisabled} selected={selectedUser} defaultValue="Selecciona el usuario" options={this.state.filteredUsers} onChange={ this.onUserSelected }/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Actividad</legend>
                    <input name="activity" type="text" className="input w-72" disabled={controlsDisabled} value={activity}/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Inicio</legend>
                    <input name="initDate" type="date" className="input w-32" min={minimumDate} max={maximumDate} disabled={controlsDisabled} value={startDate}/>
                </fieldset>
                
                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Final</legend>
                    <input name="endDate" type="date" className="input w-32" min={minimumDate} max={maximumDate} disabled={controlsDisabled} value={endDate}/>
                </fieldset>
                

                <button type="button" className="btn btn-success ml-15 self-center" onClick={ this.onRegisterAdd } disabled={controlsDisabled}>Agregar actividad</button>
            </div>
        );
    }
}

export default TaskForm;