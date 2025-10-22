import { Component as InfernoComponent } from 'inferno';
import Schedule from './schedule.jsx';
import TaskForm from './taskForm.jsx';

class ScheduleView extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            projectStartDate: "",
            projectEndDate: "",
            taskList: [
                /*{taskNumber: 1, area: "COMPRAS", activity: "Cotización de materiales", user: "Yune Ruvalcaba"},
                {taskNumber: 2, area: "CONTROL", activity: "Programación PLC", user: "Angel Vela"},
                {taskNumber: 3, area: "MECANICA", activity: "Diseño 3D pieza", user: "Victor Paramo"},
                {taskNumber: 4, area: "SISTEMAS", activity: "Programación aplicación web", user: "Carlos Herrera"},
                {taskNumber: 5, area: "HYPERION", activity: "Elaboración plan de actividades", user: "Fernando Ibarra"},*/
            ],
            enableTaskComponents: false
        };
        this.addItem = this.addItem.bind(this);
        this.onRegisterAdd = this.onRegisterAdd.bind(this);
    }

    addItem(item) {
        item.taskNumber = this.state.taskList.length + 1;
        const newTaskList = [...this.state.taskList, item];
        this.setState({ taskList: newTaskList });
    }

    onRegisterAdd() {
        let badInputNum = 0;

        const areaSelect = document.getElementsByName("areaSelect")[0];
        const selAreaId = areaSelect.value;
        const selAreaName = areaSelect.options[areaSelect.selectedIndex].text;
        if (!areaSelect.selectedIndex) {
            areaSelect.classList.add("input-error");
            areaSelect.focus();
            badInputNum += 1;
        }
        else {
            areaSelect.classList.remove("input-error");
        }

        const userSelect = document.getElementsByName("userSelect")[0];
        const selUserId = userSelect.value;
        const selUserName = userSelect.options[userSelect.selectedIndex].text
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
            this.addItem({
                taskNumber: 0,
                areaId: selAreaId,
                area: selAreaName,
                userId: selUserId,
                user: selUserName,
                activity: activity,
                initDate: initDate,
                endDate: endDate
            });
        }
        else {
            alert("No se puede agregar la tarea, tiene campos erroneos o incompletos");
        }
    }

    sendData = () => {
        const projectName = this.state.projectName;
        if (!projectName) {
            document.getElementById("projectName").classList.add("input-error");
            document.getElementById("projectName").focus();
            return;
        }
        else {
            document.getElementById("projectName").classList.remove("input-error");
        }

        const projectStartDate = this.state.projectStartDate;
        if (!projectStartDate) {
            document.getElementById("projectStart").classList.add("input-error");
            document.getElementById("projectStart").focus();
            return;
        }
        else {
            document.getElementById("projectStart").classList.remove("input-error");
        }

        const projectEndDate = this.state.projectEndDate;
        if (!projectEndDate) {
            document.getElementById("projectEnd").classList.add("input-error");
            document.getElementById("projectEnd").focus();
            return;
        }
        else {
            document.getElementById("projectEnd").classList.remove("input-error");
        }

        const tasks = this.state.taskList;
        if (tasks.length === 0) {
            alert("¡No se agregaron tareas al proyecto!");
            return;
        }

        // enviar los datos una vez todo esté correcto
    }

    onProjectNameChanged = (event) => {
        if (event.target.value) {
            event.target.classList.remove("input-error");
            this.setState({ projectName: event.target.value });
        }
        else
            event.target.classList.add("input-error");
        
        this.checkProjectFields();
    };

    onProjectStartDateChanged = (event) => {
        if (event.target.value)
        {
            event.target.classList.remove("input-error");
            this.setState({ projectStartDate: event.target.value });
        }
        else
            event.target.classList.add("input-error");

        this.checkProjectFields();
    };

    onProjectEndDateChanged = (event) => {
        if (event.target.value) {
            event.target.classList.remove("input-error");
            this.setState({ projectEndDate: event.target.value });
        }
        else
            event.target.classList.add("input-error");

        this.checkProjectFields();
    };

    checkProjectFields = () => {
        const projectNameInput = document.getElementById('projectName');
        const projectStartDateInput = document.getElementById('projectStart');
        const projectEndDateInput = document.getElementById('projectEnd');

        this.setState({
            enableTaskComponents:
                (projectNameInput.value && projectStartDateInput.value && projectEndDateInput.value ? true : false)
        });
    }

    render() {
        return (
            <div className='h-full'>
                <div className="flex flex-row w-full justify-center h-1/6">
                    <fieldset className="fieldset ml-3 w-1/4">
                        <legend className="fieldset-legend">Nombre del proyecto</legend>
                        <input id="projectName" type='text' className="input"  onChange={this.onProjectNameChanged} placeholder="Nombre del proyecto..."/>
                    </fieldset>
                    <fieldset className="fieldset ml-10">
                        <legend className="fieldset-legend">Fecha de inicio</legend>
                        <input id='projectStart' type='date' className="input" onChange={this.onProjectStartDateChanged}/>
                    </fieldset>
                    <fieldset className="fieldset ml-5">
                        <legend className="fieldset-legend">Fecha de fin</legend>
                        <input id='projectEnd' type='date' className="input" onChange={this.onProjectEndDateChanged}/>
                    </fieldset>
                </div>
                <TaskForm
                    className="h-1/6 w-screen"
                    taskList={this.state.taskList}
                    addItem={this.addItem}
                    onButtonPressed={this.onRegisterAdd}
                    buttonText='Agregar actividad'
                    componentsEnabled={this.state.enableTaskComponents}
                    minimumDate={this.state.projectStartDate}
                    maximumDate={this.state.projectEndDate} />
                <Schedule
                    className="h-3/6"
                    taskList={this.state.taskList}
                    minimumDate={this.state.projectStartDate}
                    maximumDate={this.state.projectEndDate} />
                <div className='h-1/6 flex justify-center'>
                    <input type='submit' className='btn btn-primary btn-lg self-center' value='Enviar' onClick={ this.sendData }/>
                </div>
            </div>
        );
    }
}

export default ScheduleView;