import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/usuarios");
      const users = await response.json();

      const user = users.find((u) => u.email === email && u.senha === senha);

      if (user) {
        login(user);
        navigate("/");
      } else {
        setError("Credenciais inválidas");
      }
    } catch (error) {
      setError("Erro ao fazer login" + error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email:</label>
          <input
            type="email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Senha:</label>
          <input
            type="password"
            className={styles.formInput}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.loginError}>{error}</p>}
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </form>
      <p className={styles.loginLink}>
        Não tem conta? <a href="/signup">Cadastre-se</a>
      </p>
    </div>
  );
}

export default Login;
