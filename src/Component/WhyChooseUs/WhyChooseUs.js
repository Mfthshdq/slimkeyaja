import { Clock, Wallet, Wrench, Zap } from "lucide-react";
import style from "./WhyChooseUs.module.css"

function WhyChooseUs() {
    const items = [
        { icon: Zap, title: "Cepat & Responsif", desc: "Datang on-the-spot pengerjaan rata-rata kurang dari 30 menit." },
        { icon: Wrench, title: "Teknisi Kunci Berpengalaman", desc: "Lebih dari 10 tahun menangani ribuan kasus kunci." },
        { icon: Wallet, title: "Harga Terjangkau", desc: "Tarif transparan tanpa biaya tersembunyi, ramah di kantong." },
        { icon: Clock, title: "Layanan 24 Jam", desc: "Siap membantu kapan pun Anda butuh, termasuk hari libur." },
    ];

    return (
        <div className={style.container} id="keunggulan">
            <div className={style.glow} />
            <div className={style.parent}>
                <div className={style.head}>
                    <div>
                        <span className={style.eyebrow}>
                            Mengapa SlimKey
                        </span>
                        <h2 className={style.title}>
                            Dipercaya ribuan pelanggan{" "}
                            <span className={style.italic}>setiap tahunnya.</span>
                        </h2>
                    </div>
                    <p className={style.lead}>
                        Kami menggabungkan keahlian tradisional dengan teknologi modern untuk
                        memberikan solusi kunci yang aman, presisi, dan tahan lama.
                    </p>
                </div>
                <div className={style.grid}>
                    {
                        items.map((item) => (
                            <div
                                key={item.title}
                                className={style.call}
                                style={{ animationDelay: `${item * 100}ms` }}
                            >
                                <item.icon className={style.icon} />
                                <h3 className={style.callTitle}>{item.title}</h3>
                                <p className={style.callDesc}>{item.desc}</p>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs;