import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { UseUserStore } from '../store/useUserStore';

const Login = () => {
    const [error, setError] = useState("");
    const { setSession } = UseUserStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        setError("");

        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        try {
            const data = await api.loginUser(user);
            
            if (data && data.data) {
                setSession(data.data);
                navigate("/");
            } else {
                setError("Неизвестная ошибка ");
            }
        } catch (err) {
            
            const message = err.response?.data?.error || 'Ошибка соединения';
            console.error(err);
            setError(message);
        }
    };

    return (
        <div className="container">
           
            {error && <div className="alert alert-error active">{error}</div>}
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-icon">🔐</div>
                    <h1 className="auth-title">Вход</h1>
                    <p className="auth-subtitle">Войдите в свой аккаунт</p>
                </div>

               

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя пользователя</label>
                        <Input
                            type="text"
                            className="form-input"
                            name="username"
                            placeholder="Введите имя пользователя"
                            required
                            autocomplete="username"
                        />
                        <div className="form-error">Введите имя пользователя</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <Input
                            type="password"
                            className="form-input"
                            name="password"
                            placeholder="Введите пароль"
                            required
                            autocomplete="current-password"
                        />
                        <div className="form-error">Введите пароль</div>
                    </div>

                    <Button type="submit" className="btn-submit">
                        Войти
                    </Button>
                </form>

                <div className="auth-divider">или</div>

                <div className="auth-link">
                    Нет аккаунта?
                    <Link to={"/register"}>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;