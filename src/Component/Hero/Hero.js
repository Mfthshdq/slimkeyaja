import { ArrowRight, Phone } from "lucide-react";
import style from "./Hero.module.css"

function Hero() {
    const stats = [
        { angka: "10+", nama: "Tahun" },
        { angka: "5K+", nama: "Pelanggan" },
        { angka: "24/7", nama: "Layanan" },
    ]

    return (
        <div className={style.container}>
            <img
                src="image/hero-keys.jpg"
                alt="bg"
                width={1920}
                height={1280}
                className={style.bgImg}
            />

            <div className={style.overlayGradient} />
            <div className={style.overlayDark} />

            <div className={style.parent}>
                <div className={style.content}>
                    <span className={style.badge}>
                        <span className={style.badgeDot}/>
                        Ahli Kunci Profesional
                    </span>
                    <h1 className={style.title}>
                        Slim<span className={style.dot}>Key</span>
                        <br />
                        <span className={style.italic}>Solusi Pembuatan</span>
                        <br />
                        Kunci Terpercaya
                    </h1>
                    <p className={style.subtitle}>
                        Layanan pembuatan & duplikasi kunci untuk rumah, motor, mobil, hingga smart key -
                        dikerjakan teknisi berpengalaman, cepat, dan presisi.
                    </p>
                    <div className={style.actions}>
                        <a href="#kontak" className={style.btnPrimary}>
                            <Phone style={{ width: "1rem", height: "1rem" }} />
                            Hubungi Sekarang
                            <ArrowRight className={style.arrow} style={{ width: "1rem", height: "1rem" }} />
                        </a>
                        <a href="#layanan" className={style.btnGhost}>
                            Lihat Layanan
                        </a>
                    </div>

                    <div className={style.stats}>
                        {
                            stats.map((stat) => (
                                <div key={stat.nama}>
                                    <div className={style.statNum}>{stat.angka}</div>
                                    <div className={style.statLabel}>{stat.nama}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;