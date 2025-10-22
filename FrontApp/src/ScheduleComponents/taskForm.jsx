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
            userId: 0,
            userName: "",
            areas: [],
            users: [],
            filteredUsers: [],
            editingRow: props.editingRow,
            selectedArea: props.selectedArea,
            selectedUser: props.selectedUser,
            activity: props.activity || '',
            startDate: props.startDate || '',
            endDate: props.endDate || ''
        };

        //this.onRegisterAdd = this.onRegisterAdd.bind(this);
    }

    componentDidMount() {
        console.log("taskFormMounted");

        let { selectedArea, selectedUser, activity, startDate, endDate, editingRow } = this.props;
        
        if (editingRow)
        {
            this.setState({
                controlsDisabled: false,
                userSelectDisabled: false
            });
        }

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

        const selArea = event.target.value;

        const disable = selArea == '0';

        let users = this.state.users;

        if (selArea != '0') {
            users = users.filter(u => u.area == selArea);
        }
        
        this.setState({
            userSelectDisabled: disable,
            filteredUsers: users,
            areaId: parseInt(selArea), 
            areaName: event.target.options[selArea].text,
            selectedArea: parseInt(selArea)
        });
    }

    onUserSelected = (event) => {
        const selUser = event.target.value;
        const selIndex = event.target.selectedIndex;
        const selectedUserName = event.target.options[selIndex].text;

        this.setState({
            userId: parseInt(selUser),
            userName: selectedUserName,
            selectedUser: parseInt(selUser),
            //filteredUsers: this.state.filteredUsers
        });
    }

    onActivityInput(instance, event) {
        instance.setState({activity: event.target.value});
    }

    onStartDateInput(instance, event) {
        instance.setState({startDate: event.target.value});
    }

    onEndDateInput(instance, event) {
        instance.setState({endDate: event.target.value});
    }

    componentWillReceiveProps(nextProps, context) {
        this.setState({controlsDisabled: !nextProps.componentsEnabled});
    }

    render() {
        const { className, minimumDate, maximumDate } = this.props;
        const { selectedArea, selectedUser, activity, startDate, endDate, controlsDisabled } = this.state;
        return (
            <div className={ `${className} flex flex-row content-center justify-center` }>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Área</legend>
                    <Select
                        data-input="areaSelect"
                        name="areaSelect"
                        className="w-30"
                        disabled={controlsDisabled}
                        selected={selectedArea}
                        defaultValue="Selecciona el área"
                        options={this.state.areas}
                        onChange={ this.onAreaSelected }/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Usuario</legend>
                    <Select
                        data-input="userSelect"
                        name="userSelect"
                        className="w-30"
                        disabled={controlsDisabled || this.state.userSelectDisabled}
                        selected={selectedUser}
                        defaultValue="Selecciona el usuario"
                        options={this.state.filteredUsers}
                        onChange={ this.onUserSelected }/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Actividad</legend>
                    <input
                        data-input="activity"
                        name="activity"
                        type="text"
                        className="input w-72"
                        disabled={controlsDisabled}
                        value={activity}
                        onInput={linkEvent(this, this.onActivityInput)}/>
                </fieldset>

                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Inicio</legend>
                    <input
                        data-input="startDate"
                        name="initDate"
                        type="date"
                        className="input w-32"
                        min={minimumDate} max={maximumDate}
                        disabled={controlsDisabled} value={startDate}
                        onInput={linkEvent(this, this.onStartDateInput)}/>
                </fieldset>
                
                <fieldset className="fieldset ml-2">
                    <legend className="fieldset-legend">Fecha Final</legend>
                    <input
                        data-input="endDate"
                        name="endDate"
                        type="date"
                        className="input w-32"
                        min={minimumDate} max={maximumDate}
                        disabled={controlsDisabled} value={endDate}
                        onInput={linkEvent(this, this.onEndDateInput)}/>
                </fieldset>
                

                <button type="button" className="btn btn-success ml-15 self-center" onClick={ this.props.onButtonPressed } disabled={controlsDisabled}>{this.props.buttonText}</button>
            </div>
        );
    }
}

export default TaskForm;