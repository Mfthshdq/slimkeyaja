import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { Key } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8000/login",
                { username, password }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("username", res.data.username);

            if (res.data.role === "admin") {
                navigate("/admin");
            } else if (res.data.role === "karyawan") {
                navigate("/karyawan");
            } else {
                alert("Role tidak dikenali");
            }
        }
        catch (error) {
            const message = error.response?.data?.message || "Login Gagal";
            alert(message);
        }
    };

    return (
        <div className={style.authShell}>
            <div className={style.left}>
                <Link to={"/"} className={style.brand} style={{ color: "white", textDecoration: "none" }}>
                    <span className={style.brandIcon}>
                        <Key style={{ width: "1.25rem", height: "1.25rem" }} />
                    </span>
                    <span className={style.brandText}>
                        Slim<span style={{ color: "#f16a00" }}>Key</span>
                    </span>
                </Link>

                <div className={style.authHeroContent}>
                    <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                        Dashboard Internal
                    </span>
                    <h1 className={style.authHeroTitle}>
                        Selamat Datang
                        <br />
                        Mari Mulai Bekerja<span style={{ color: "#f16a00" }}>.</span>
                    </h1>
                    <p className={style.authHeroText}>
                        Catat Penjualan, pantau performa, dan kelola tim Anda - semua dalam satu tempat
                        yang dirancang khusus untuk SlimKey
                    </p>
                </div>
            </div>

            <div className={style.right}>
                <div className={style.title}>
                    <p className={style.judul}>Lo<span style={{ color: "#f16a00" }}>gin</span></p>
                </div>

                <form className={style.parent} onSubmit={handleLogin}>
                    <div className={style.form}>
                        <label>Username</label>
                        <input
                            className={style.place}
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className={style.form}>
                        <label>Password</label>
                        <input
                            className={style.place}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={style.btn}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;