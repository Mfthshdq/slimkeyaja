import { Key } from "lucide-react";
import style from "./Footer.module.css"

function Footer() {
    return (
        <div className={style.container}>
            <div className={style.parent}>
                <div className={style.brand}>
                    <span className={style.brandIcon}>
                        <Key style={{ width: "1.25rem", height: "1.25rem" }} />
                    </span>
                    <span className={style.brandText}>
                        Slim<span className={style.highlight}>Key</span>
                    </span>
                </div>
                <p className={style.copy}>
                    © {new Date().getFullYear()} <strong>SlimKey.</strong> Semua hak dilindungi. 
                </p>
                <div className={style.tag}>Solusi Kunci Terpercaya 🔑</div>
            </div>
        </div>
    )
}

export default Footer;