import { Component } from 'inferno';
import { UserPen, UserRoundX } from 'lucide-react';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            areas: [],
            loading: true,
            error: null
        };
    }
  
    componentDidMount() {
        Promise.all([
            fetch('http://localhost:5084/area/all'),
            fetch('http://localhost:5084/role/all'),
            fetch('http://localhost:5084/user/all')
        ])
        .then(([areasRes, rolesRes, usersRes]) => {
            if (!areasRes.ok || !rolesRes.ok || !usersRes.ok) {
                throw new Error('Error al cargar datos');
            }
            return Promise.all([areasRes.json(), rolesRes.json(), usersRes.json()]);
        })
        .then(([areasData, rolesData, usersData]) => {
            this.setState({
                areas: areasData,
                roles: rolesData,
                users: usersData,
                loading: false
            });
        })
        .catch(err => {
            console.error(err);
            this.setState({
                error: 'No se pudieron cargar los usuarios',
                loading: false
            });
        });
    }

    goToCreateUser = () => {
        window.location.href = '/user/new';
    };

    goToEditUser = (id) => {
        window.location.href = `/user/edit/${id}`;
    };

    deleteUser = (id) => {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

        fetch(`http://localhost:5084/user/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            this.setState(prev => ({
                users: prev.users.filter(u => u.id !== id)
            }));
        })
        .catch(() => {
            alert('Error de conexión, pero se quitó del listado');
            this.setState(prev => ({
                users: prev.users.filter(u => u.id !== id)
            }));
        });
    };

    getRoleName = (id) => {
        const role = this.state.roles.find(r => r.id === id || String(r.id) === String(id));
        return role ? role.name || role.role || '-' : 'Sin rol';
    };

    getAreaName = (id) => {
        const area = this.state.areas.find(a => a.id === id || String(a.id) === String(id));
        return area ? area.name : 'Sin área';
    };

    render() {
        const { users, loading, error } = this.state;

        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            );
        }
        if (error) {
            return (
                <div className="alert alert-error shadow-lg max-w-md mx-auto">
                    <span>{error}</span>
                </div>
            );
        }
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Usuarios</h1>
                    <button onClick={this.goToCreateUser} className="btn btn-primary">
                        Crear Usuario
                    </button>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr className="bg-base-200 text-base-content">
                                        <th className="text-left">Nombre completo</th>
                                        <th className="text-left">Rol</th>
                                        <th className="text-left">Área</th>
                                        <th className="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-12 text-gray-500">
                                                No hay usuarios registrados
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map(user => (
                                            <tr key={user.id} className="hover">
                                                <td className="font-medium">{user.fullName || 'Sin nombre'}</td>
                                                <td>{this.getRoleName(user.role)}</td>
                                                <td>{this.getAreaName(user.area)}</td>
                                                <td className="text-center">
                                                    <div className="flex justify-center gap-3">
                                                        <button
                                                            onClick={() => this.goToEditUser(user.id)}
                                                            className="btn btn-sm btn-warning tooltip"
                                                            data-tip="Editar"
                                                        >
                                                            <UserPen size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => this.deleteUser(user.id)}
                                                            className="btn btn-sm btn-error tooltip"
                                                            data-tip="Eliminar"
                                                        >
                                                            <UserRoundX size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersList;