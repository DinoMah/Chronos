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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <fieldset className='fieldset'>
                        <legend className='fieldset-legend'>Usuario</legend>
                        <input id="username" type='text' className='w-30' placeholder='Nombre de usuario...' value={this.state.username}></input>
                    </fieldset>
                    <fieldset>
                        <legend className='fieldset-legend'>Contraseña</legend>
                        <input id="password" type='password' className='w-30' value={this.state.password}></input>
                    </fieldset>
                    <input type='submit'></input>
                </form>
            </div>
        );
    }
}