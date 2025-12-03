import { Component } from "inferno";
import Gantt from "frappe-gantt";

class Cronogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      gantt: null,
      noteTaskId: null,
      noteText: ""
    };
  }

  componentDidMount() {
    

      /*this.state.tasks = [
          {
              id: "1",
              name: "Redes",
              start: "2025-10-01",
              end: "2025-10-30",
              color: ""
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
          },
          {
              id: 8,
              name: "Maquetación modelo",
              start: "2025-11-16",
              end: "2025-11-30",
              color: "#0070c0"
          },
          {
              id: 9,
              name: "Maquetación modelo",
              start: "2025-12-15",
              end: "2025-12-20",
              color: "#0070c0"
          },
          {
              id: 10,
              name: "Maquetación modelo",
              start: "2025-12-25",
              end: "2025-12-30",
              color: "#0070c0"
          },

          {
              id: 11,
              name: "Maquetación modelo",
              start: "2026-01-15",
              end: "2026-01-20",
              color: "#0070c0"
          }
      ];*/

  }

  componentWillReceiveProps(nextProps, context) {
    if (this.state.gantt === null)
    {
      const { tasks, taskPeriods, onAddNote } = nextProps;

      const barColor = "#0070c0";
      let taskList = [];

      tasks.forEach(task => {
        const taskPeriod = taskPeriods.find(p => p.id = task.programmedPeriod);

        taskList.push({
          id: task.id,
          name: task.description,
          start: taskPeriod.initDate,
          end: taskPeriod.endDate,
          color: barColor
        });
      });

      const chartConfiguration = {
        container_height: 500,
        //infinite_padding: false,
        today_button: false,
        view_mode: 'Day',
        lines: 'none',
        column_width: 30,
        readonly: true,
        popup: (ctx) => {
          ctx.set_title(ctx.task.name);
          ctx.set_details(`
            <div>
              <input id="noteInput" type="text"/>
            </div>
          `);
          ctx.add_action('Agregar nota', () => {
            const noteText = document.getElementById('noteInput').value;
            this.setState({ noteTaskId: ctx.task.id, noteText }, () => {
              this.saveNote();
            });
            alert("Se presiono el boton");
          });
        }
      };

      const ganttDiagram = new Gantt("#gantt", taskList, chartConfiguration);

      this.setState({tasks: taskList, gantt: ganttDiagram});
    }
    

    }

    saveNote = () => {
        const { noteTaskId, noteText } = this.state;

        fetch("http://localhost:5084/task/addNote", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ taskNumber: noteTaskId, note: noteText })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al guardar la nota');
                }
                return response.json();
            })
            .then(data => {
                alert('Nota guardada exitosamente');
            })
            .catch(error => {
                alert(error.message);
            });
    }

  render() {
    return (
      <svg id="gantt" />
    );
  }
}

export default Cronogram;