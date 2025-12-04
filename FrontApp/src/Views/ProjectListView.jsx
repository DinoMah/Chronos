import { Component } from 'inferno';
import { ChartBarBig } from 'lucide-react'; 

class ProjectListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:5084/project/all`)
        .then(result => {
            if (!result.ok) throw new Error("Error " + result.status);
            return result.json();
        })
        .then(data => {
            const projects = data.map(project => ({
                id: project.id,
                name: project.name,
                initDate: new Date(project.period.initDate).toLocaleDateString(),
                endDate: new Date(project.period.endDate).toLocaleDateString(),
                tasks: project.tasks,
                taskPeriods: project.taskPeriods
            }));
            this.setState({ projects });
        })
        .catch(error => alert(error));
    }

    goToProject = (id) => {
        window.location.href = `/project/${id}`;
    };

    render() {
        const { projects } = this.state;

        return (
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-base-200 text-base-content">
                                    <th className="text-center">Nombre</th>
                                    <th className="text-center">Fecha inicial</th>
                                    <th className="text-center">Fecha final</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-12 text-gray-500">
                                            No hay Proyectos registrados
                                        </td>
                                    </tr>
                                ) : (
                                    projects.map(project => (
                                        <tr key={project.id} className="hover">
                                            <td>{project.name}</td>
                                            <td className="text-center">{project.initDate}</td>
                                            <td className="text-center">{project.endDate}</td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => this.goToProject(project.id)}
                                                    className="btn btn-sm bg-green-500 nx-auto"
                                                >
                                                    <ChartBarBig size={18}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectListView;