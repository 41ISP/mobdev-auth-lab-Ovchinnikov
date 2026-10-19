import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import { UseUserStore } from '../store/useUserStore'

const Register = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { setSession } = UseUserStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)








        const user = {
            username: e.target.username.value.trim(),
            email: e.target.email.value.trim(),
            password: e.target.password.value,
            password2: e.target.password2.value
        };



        try {
            const data = await api.registerUser(user)
            setSession(data)
            e.target.reset(); 
            navigate("/");
        } catch (err) {
            console.error(err);
            
            setError(err.response?.data?.error || 'Ошибка регистрации');
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-icon">👤</div>
                    <h1 className="auth-title">Регистрация</h1>
                    <p className="auth-subtitle">Создайте новый аккаунт</p>
                </div>

                {/* Динамический блок ошибки. Статичный блок удален по ТЗ */}
                {error.length > 0 && (
                    <div className="alert alert-error active" id="error-alert">
                        {error}
                    </div>
                )}

                <form id="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя пользователя</label>
                        <Input
                            type="text"
                            className="form-input"
                            name="username"
                            placeholder="Введите имя пользователя"
                            minLength="3"
                            required
                            autoComplete="username"
                        />
                        <div className="form-hint">Минимум 3 символа</div>
                        <div className="form-error">
                            Имя пользователя должно быть не менее 3 символов
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Email <span className="optional">(необязательно)</span>
                        </label>
                        <Input
                            type="email"
                            className="form-input"
                            name="email"
                            placeholder="example@email.com"
                            autoComplete="email"
                        />
                        <div className="form-error">Введите корректный email</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <Input
                            type="password"
                            className="form-input"
                            name="password"
                            placeholder="Введите пароль"
                            minLength="6"
                            required
                            autoComplete="new-password"
                        />
                        <div className="password-strength">
                            <div
                                className="password-strength-bar"
                                id="password-strength-bar"></div>
                        </div>
                        <div className="form-hint">Минимум 6 символов</div>
                        <div className="form-error">
                            Пароль должен быть не менее 6 символов
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Подтверждение пароля</label>
                        <Input
                            type="password"
                            className="form-input"
                            name="password2"
                            placeholder="Повторите пароль"
                            required
                            autoComplete="new-password"
                        />
                        <div className="form-error">Пароли не совпадают</div>
                    </div>

                    <Button
                        type="submit"
                        className="btn-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </Button>
                </form>

                <div className="auth-divider">или</div>

                <div className="auth-link">
                    <p>
                        <Link to={'/login'}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register