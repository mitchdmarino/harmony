export default function AuthForm({type}) {
    return (
        <div className="auth-container">
            {type==="login" ? (
                <div className="login-form">
                    <h3>Create your account</h3>
                    <form>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <input type="text" name="username"></input>
                        </div>
                        <div>
                            <label htmlFor='username'>Password</label>
                            <input type="text" name="username"></input>
                        </div>
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>): (
                <div className="signup-form">
                    <h3>Create your account</h3>
                    <form>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <input type="text" name="username"></input>
                        </div>
                        <div>
                            <label htmlFor='username'>Password</label>
                            <input type="text" name="username"></input>
                        </div>
                        <div>
                            <label htmlFor='username'>Confirm Password</label>
                            <input type="text" name="username"></input>
                        </div>
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>
                )
            }
        </div>
    )
}