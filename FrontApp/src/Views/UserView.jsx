import { Component } from 'inferno';
import { Eye, EyeOff } from 'lucide-react';
class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            username: '',
            password: '',
            showPassword: false,
            email: '',
            role: '',
            area: '',
            roles: [],
            areas: [],
            emailError: '',
            loading: true,
        };
    }
    

    handleFullNameChange = (e) => {
        const fullName = e.target.value;
        let username = '';
        const words = fullName.trim().toLowerCase().split(/\s+/);

        if (words.length >= 2) {
            const firstName = words[0].slice(0, 3);
            const lastName = words[1].slice(0, 3);
            username = `${firstName}${lastName}`;
        } else if (words[0]) {
            username = words[0].slice(0, 6);
        }   

        this.setState({ fullName, username });
    }

    componentDidMount() {
        const {
            isEditMode,
            areas,
            roles,
            initialFullName,
            initialUsername,
            initialEmail,
            initialRole,
            initialArea
        } = this.props;

        if (isEditMode) {
            
            this.setState({
                fullName: initialFullName || '',
                username: initialUsername || '',
                email: initialEmail || '',
                role: initialRole || '',
                area: initialArea || '',
                areas: areas || [],
                roles: roles || [],
                loading: false
            });
        } else {
            
            Promise.all([
                fetch("http://localhost:5084/area/all"),
                fetch("http://localhost:5084/role/all")
            ])
            .then(([areasRes, rolesRes]) => {
                if (!areasRes.ok || !rolesRes.ok) throw new Error("Error cargando datos");
                return Promise.all([areasRes.json(), rolesRes.json()]);
            })
            .then(([areasData, rolesData]) => {
                this.setState({
                    areas: areasData.map(a => ({ id: String(a.id), name: a.name })),
                    roles: rolesData.map(r => ({ id: String(r.id), name: r.role })),
                    loading: false
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false, error: "Error al cargar áreas o roles" });
            });
        }
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    
    toggleShowPassword = (e) => {
        this.setState((prev) => ({ showPassword: !prev.showPassword, passwordIcon: prev.showPassword ? 'Eye' : 'Eye-off' }));
    }

    handleEmailChange = (e) => {
        const email = e.target.value;
        const emailRegex = /^[a-zA-Z0-9.]+@hyperion-auto\.com$/;
        const emailError = email && !emailRegex.test(email)
            ? 'El correo debe ser con el dominio de la empresa: @hyperion-auto.com'
            : '';
        this.setState({ email, emailError });
    }

    handleRoleChange = (e) => {
        this.setState({ role: e.target.value });
    }

    handleAreaChange = (e) => {
        this.setState({ area: e.target.value });
    }

    handleAddUser = (e) => {
        e.preventDefault();
        const { fullName, username, password, email, role, area } = this.state;
        if (!fullName || !username || !password || !email || !role || !area) {
            console.log('Por favor, completa todos los campos correctamente.');
            return;
        }
        const data = {
            fullName: fullName,
            username: username,
            password: password,
            email: email,
            role: Number(role),
            area: Number(area)
        };

        fetch('http://localhost:5084/user/save', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        })
        .then((res) => {
            if (!res.ok) throw new Error("Error: " + res.status);
            return res.json();
        })
        .then((response) => console.log("Success:", response))
        .catch((error) => console.error("Error:", error));

        console.log('Usuario agregado:', this.state);
        this.setState({
            fullName: '',
            username: '',
            password: '',
            showPassword: false,
            email: '',
            role: '',
            area: '',
            emailError: '',
        });
    }
    handleSaveChanges = (e) => {
        e.preventDefault();

        const { fullName, username, email, role, area, password } = this.state;
        const { isEditMode, userId } = this.props; 

        if (!fullName || !username || !email || !role || !area) {
            alert('Por favor completa todos los campos');
            return;
        }

        const data = {
            id: isEditMode ? userId : undefined,
            fullName,
            userName: username,
            email,
            role: Number(role),    
            area: Number(area),    
            ...(!isEditMode && password ? { password } : {})
        };

        const url = isEditMode
            ? `http://localhost:5084/user/update` 
            : 'http://localhost:5084/user/save';

        fetch(url, {
            method: isEditMode ? 'PUT' : 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(text || res.status) });
            }
            return res.json();
        })
        .then(() => {
            alert(isEditMode ? "Usuario actualizado" : "Usuario creado");
         
            window.location.href = "/user/list";
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Error al guardar: " + err.message);
        });
    };

    render() {
        return (
            <div className="p-4 max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Registrar Usuarios</h1>
                <form onSubmit={this.handleSaveChanges}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" for="CompleteName">Nombre completo</label>
                        <input
                            value={this.state.fullName}
                            onInput={this.props.isEditMode ? null : this.handleFullNameChange}
                            readOnly={this.props.isEditMode}
                            className={`input input-bordered w-full ${this.props.isEditMode ? 'bg-gray-100' : ''}`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" for="NameUser">Usuario</label>
                        <input
                            id="NameUser"
                            type="text"
                            className={`input input-bordered w-full ${this.props.isEditMode ? 'bg-gray-100' : ''}`}
                            value={this.state.username}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="Password">Contraseña</label>
                        <div className="relative">
                            <input
                                id="Password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                placeholder={this.props.isEditMode ? '' : 'Contraseña'}
                                className={`input input-bordered w-full pr-10 ${this.props.isEditMode ? 'bg-gray-100' : ''}`}
                                value={this.props.isEditMode ? '••••••••••••' : this.state.password}
                                onInput={this.props.isEditMode ? null : this.handlePasswordChange}
                                readOnly={this.props.isEditMode}
                                required={!this.props.isEditMode}  
                            />
                            <button
                                type="button"
                                onClick={this.toggleShowPassword}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={this.state.showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {this.state.showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" for="correo">Correo electrónico</label>
                        <input
                            id="correo"
                            type="email"
                            placeholder="usuario@hyperion-auto.com"
                            className={`input input-bordered w-full ${this.state.emailError ? 'border-red-500' : ''}`}
                            value={this.state.email}
                            onInput={this.handleEmailChange}
                            required
                        />
                        {this.state.emailError && (
                            <p className="text-red-500 text-sm mt-1">{this.state.emailError}</p>
                        )}
                    </div>

                    <div className="flex space-x-4">
                        <div class="form-control w-full max-w-xs">
                            <label className="block text-sm font-medium mb-1 " for="selectRole">Rol</label>
                            <select
                            id="selectRole"
                                className="select select-bordered w-full"
                                value={this.state.role}
                                onChange={this.handleRoleChange}
                                required
                            >
                                <option value="" disabled>Selecciona un Rol</option>
                                {this.state.roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label className="block text-sm font-medium mb-1 " for="selectArea">Área</label>
                            <select
                            id="selectArea"
                                className="select select-bordered w-full"
                                value={this.state.area}
                                onChange={this.handleAreaChange}
                                required
                            >
                                <option value="" disabled>Selecciona un Área</option>
                                {this.state.areas.map((area) => (
                                    <option key={area.id} value={area.id}>{area.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="btn btn-primary w-full">
                            {this.props.isEditMode ? 'Guardar Cambios' : 'Agregar Usuario'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserView;
