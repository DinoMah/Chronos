import { Component } from 'Inferno';
import UserView from './UserView';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
            areas: [],
            roles: [],
            error: null,
            userId: null
        };
    }

    componentDidMount() {
        const id = this.props.match?.params?.id;
        if (!id) {
            this.setState({ loading: false, error: "ID no válido" });
            return;
        }
        this.setState({ userId: id });

        Promise.all([
            fetch("http://localhost:5084/area/all"),
            fetch("http://localhost:5084/role/all"),
            fetch(`http://localhost:5084/user/${id}`)
        ])
        .then(([areasRes, rolesRes, userRes]) => {
            if (!areasRes.ok || !rolesRes.ok || !userRes.ok) {
                throw new Error("Error al obtener datos del servidor");
            }
            return Promise.all([areasRes.json(), rolesRes.json(), userRes.json()]);
        })
        .then(([areasData, rolesData, user]) => {
            this.setState({
                user,
                userId: id,
                areas: areasData.map(a => ({ id: String(a.id), name: a.name })),
                roles: rolesData.map(r => ({ id: String(r.id), name: r.role })),
                loading: false
            });
        })
        .catch(err => {
            console.error("Error:", err);
            this.setState({ loading: false, error: "No se pudo cargar la información del usuario" });
        });
    }

    render() {
        const { loading, error, user, areas, roles, userId } = this.state;
        console.log("USER QUE LLEGA DEL BACKEND:", user);
        if (loading) {
            return <div className="p-8 text-center">Cargando usuario...</div>;
        }

        if (error) {
            return <div className="p-8 text-center text-red-500">{error}</div>;
        }

        if (!user) {
            return <div className="p-8 text-center text-red-500">Usuario no encontrado</div>;
        }

        return (
            <UserView
                initialFullName={user.fullName || user.FullName}
                initialUsername={user.userName || user.UserName}
                initialEmail={user.email || user.Email}
                initialRole={String(user.role || user.Role)}      
                initialArea={String(user.area || user.Area)}    
                areas={areas}
                roles={roles}
                isEditMode={true}
                userId={userId}
            />
        );
    }
}

export default EditUser;