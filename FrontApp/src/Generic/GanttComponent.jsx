import { Component } from "inferno";
import Gantt from "frappe-gantt";

class Cronogram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            gantt: null
        };
    }

    componentDidMount() {
        this.state.tasks = [
            {
                id: "1",
                name: "Redes",
                start: "2025-10-01",
                end: "2025-10-30",
                color: "#0070c0"
            },
            {
                id: "2",
                name: "Diseño",
                start: "2025-10-30",
                end: "2025-11-05",
                dependecies: "1",
                color: "#0070c0"
            },
            ,
            {
                id: 3,
                name: "Maquetación modelo inicial",
                start: "2025-10-17",
                end: "2025-10-30",
                color: "#0070c0"
            },
            {
                id: 4,
                name: "Ejemplo 4",
                start: "2025-10-20",
                end: "2025-11-27",
                color: "#0070c0"
            },
            {
                id: 5,
                name: "ejemplo 5",
                start: "2025-10-20",
                end: "2025-10-29",
                color: "#0070c0"
            },
            {
                id: 6,
                name: "Despliegue máquina procesado",
                start: "2025-12-01",
                end: "2025-12-10",
                color: "#0070c0"
            },
            {
                id: 7,
                name: "Maquetación modelo",
                start: "2025-11-15",
                end: "2025-11-20",
                color: "#0070c0"
            }
        ];

        const chartConfiguration = {
            container_height: 600,
            infinite_padding: false,
            today_button: false,
            view_mode: 'Day',
            lines: 'none',
            column_width: 30,
            readonly: true,
            popup: (ctx) => {
                ctx.set_title(ctx.task.name);
                ctx.set_details(`
                    <div>
                        <input type="text"/>
                    </div>
                `);
                ctx.add_action('Agregar nota', () => {
                    alert("Se presiono el boton");
                });
            }
        };

        this.state.gantt = new Gantt("#gantt", this.state.tasks, chartConfiguration);
    }

    render() {
        return (<div id="gantt"/>);
    }
}

export default Cronogram;