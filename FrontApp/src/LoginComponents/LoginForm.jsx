import { Component as InfernoComponent } from "inferno";

class LoginForm extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleInput(event) {
        const usernameVal = document.getElementById("username");
        const passwordVal = document.getElementById("password");
        this.setState({username: usernameVal, password: passwordVal});
    }

    render() {
        return (
            <div className="card mx-auto bg-base-100 w-5/12 shadow-xl/30">
                <figure>
                    <img src="/hyperion_logo.png" className="m-10 w-sm"/>
                </figure>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} className="justify-items-center">
                        <fieldset className='fieldset justify-self-stretch mx-5'>
                            <legend className='fieldset-legend'>Usuario</legend>
                            <input id="username" type='text' className='w-full input-xl input' placeholder='Nombre de usuario...' value={this.state.username}></input>
                        </fieldset>
                        <fieldset className="fieldset justify-self-stretch mx-5">
                            <legend className='fieldset-legend'>Contraseña</legend>
                            <input id="password" type='password' className='w-full input input-xl' placeholder="********" value={this.state.password}></input>
                        </fieldset>
                        <input type='submit' className="btn btn-primary btn-lg mt-3 flex self-center" value="Iniciar Sesión"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;