import { Key } from "lucide-react";
import style from "./About.module.css"

function About() {
    return (
        <div className={style.container} id="tentang">
            <div className={style.parent}>
                <div className={style.visual}>
                    <div className={style.tile}>
                        <div className={style.tileIcon}>
                            <Key strokeWidth={1}/>
                        </div>
                        <div className={style.tileText}>
                            <div className={style.tileNum}>10+</div>
                            <div className={style.tileLabel}>Tahun Pengalaman</div>
                        </div>
                    </div>
                    <div className={style.badge}>
                        <div className={style.badgeNum}>
                            5.000+
                        </div>
                        <div className={style.badgeText}>
                            Pelanggan terlayani dengan kepuasan tinggi.
                        </div>
                    </div>
                </div>

                <div>
                    <span className={style.eyebrow}>Tentang Kami</span>
                    <h2 className={style.title}>
                        Mitra terpercaya untuk <span className={style.italic}>setiap kunci Anda.</span>
                    </h2>
                    <p className={style.p}>
                        <strong>SlimKey</strong> adalah jasa pembuatan dan duplikasi kunci profesional 
                        yang telah berdiri sejak satu dekade lalu. Berawal dari sebuah bengkel kecil, kini kami 
                        telah berkembang menjadi mitra terpercaya bagi ribuan rumah tangga, pemilik kendaraan, 
                        dan perusahaan di kota kami. 
                    </p>
                    <p className={style.p}>
                        Komitmen kami sederhana : presisi, kecepatan, dan harga yang adil di setiap pekerjaan.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;