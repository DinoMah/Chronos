import { Component as InfernoComponent } from 'inferno';
import Schedule from './schedule.jsx';
import TaskForm from './taskForm.jsx';

class ScheduleView extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [
                {taskNumber: 1, area: "COMPRAS", activity: "Cotización de materiales", user: "Yune Ruvalcaba"},
                {taskNumber: 2, area: "CONTROL", activity: "Programación PLC", user: "Angel Vela"},
                {taskNumber: 3, area: "MECANICA", activity: "Diseño 3D pieza", user: "Victor Paramo"},
                {taskNumber: 4, area: "SISTEMAS", activity: "Programación aplicación web", user: "Carlos Herrera"},
                {taskNumber: 5, area: "HYPERION", activity: "Elaboración plan de actividades", user: "Fernando Ibarra"},
            ]
        };
    }

    addItem(item) {
        item.taskNumber = this.state.taskList.length + 1;
        this.state.taskList.push(item);
    }

    render() {
        return (
            <div className="container">
                <TaskForm taskList={this.state.taskList} addItem={this.addItem} />
                <Schedule taskList={this.state.taskList} />
            </div>
        );
    }
}

export default ScheduleView;