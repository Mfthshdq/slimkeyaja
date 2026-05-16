import { useEffect, useState, useCallback } from "react";
import style from "./Karyawan.module.css";
import { useNavigate } from "react-router-dom";

function Karyawan() {
    const [expenses, setExpenses] = useState([]);
    const [totalBulanIni, setTotalBulanIni] = useState(0);
    const [isEditing, setIsEditing] = useState(null);
    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });

    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // State untuk rekap Harian (kotak atas)
    const [filterDate, setFilterDate] = useState(todayString);

    // --- STATE BARU: Filter khusus untuk Tabel ---
    const [tableDateFilter, setTableDateFilter] = useState("");

    const [formData, setFormData] = useState({
        title: "", amount: "", date: ""
    });

    const fetchExpenses = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://backend.slimkey.my.id/api/expenses?month=${filter.month}&year=${filter.year}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                setExpenses(data);
                setTotalBulanIni(data?.total_dipilih || 0);
            } else {
                setExpenses([]);
                setTotalBulanIni(0);
            }
        } catch (err) { console.error("Gagal load pengeluaran", err); }
    }, [filter.month, filter.year]);

    useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

    const startEdit = (item) => {
        setIsEditing(item.id);
        const formattedDate = item.date ? new Date(item.date).toISOString().slice(0, 16) : "";
        setFormData({ title: item.title, amount: item.amount, date: formattedDate });
    };

    const cancelEdit = () => {
        setIsEditing(null);
        setFormData({ title: "", amount: "", date: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = isEditing
            ? `https://backend.slimkey.my.id/api/expenses/${isEditing}`
            : "https://backend.slimkey.my.id/api/expenses";
        const method = isEditing ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                cancelEdit();
                fetchExpenses();
                alert(isEditing ? "Data diperbarui!" : "Data disimpan!");
            }
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isSameDay = (dbDateStr, selectedDateStr) => {
        const dbDate = new Date(dbDateStr);
        const year = dbDate.getFullYear();
        const month = String(dbDate.getMonth() + 1).padStart(2, '0');
        const day = String(dbDate.getDate()).padStart(2, '0');
        const formattedDbDate = `${year}-${month}-${day}`;
        return formattedDbDate === selectedDateStr;
    };

    const pengeluaranHarian = expenses
        .filter(item => isSameDay(item.date, filterDate))
        .reduce((sum, item) => sum + Number(item.amount), 0);

    // --- LOGIKA FILTER TABEL ---
    const filteredExpenses = tableDateFilter
        ? expenses.filter(item => isSameDay(item.date, tableDateFilter))
        : expenses;

    return (
        <div className={style.container}>
            <header className={style.header}>
                <h1>Form Pengeluaran</h1>
            </header>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div className={style.rekapCard} style={{ flex: 1, minWidth: '250px' }}>
                    <h3>Pengeluaran Harian</h3>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        style={{ marginBottom: '10px', padding: '5px' }}
                    />
                    <p>Rp {Number(pengeluaranHarian).toLocaleString('id-ID')}</p>
                </div>
                <div className={style.rekapCard} style={{ flex: 1, minWidth: '250px' }}>
                    <h3>Total Bulan Ini</h3>
                    <p>Rp {Number(totalBulanIni).toLocaleString('id-ID')}</p>
                </div>
            </div>

            <div className={style.filterContainer}>
                <div className={style.filterGroup}>
                    <label>Pilih Bulan: </label>
                    <select value={filter.month} onChange={(e) => setFilter({ ...filter, month: e.target.value })}>
                        <option value="1">Januari</option>
                        <option value="2">Februari</option>
                        <option value="3">Maret</option>
                        <option value="4">April</option>
                        <option value="5">Mei</option>
                        <option value="6">Juni</option>
                        <option value="7">Juli</option>
                        <option value="8">Agustus</option>
                        <option value="9">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                    </select>
                </div>
                <div className={style.filterGroup}>
                    <label>Tahun: </label>
                    <select value={filter.year} onChange={(e) => setFilter({ ...filter, year: e.target.value })}>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                    </select>
                </div>
            </div>

            <section className={style.formCard}>
                <h2>{isEditing ? "Edit Catatan" : "Catat Pengeluaran Baru"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={style.inputGroup}>
                        <label>Keterangan</label>
                        <input
                            type="text"
                            placeholder="contoh : Makan Siang"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Nominal (Rp)</label>
                        <input
                            type="number"
                            placeholder="contoh : 50000"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Tanggal & Waktu</label>
                        <input
                            type="datetime-local"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className={style.btn}>
                        <button type="submit" className={style.btnSubmit}>{isEditing ? "Perbarui" : "Simpan"}</button>
                        {isEditing && <button type="button" onClick={cancelEdit} className={style.btnCancel}>Batal</button>}
                        <button onClick={handleLogout} className={style.btnLogout}>Logout</button>
                    </div>
                </form>
            </section>

            <section>
                {/* --- HEADER TABEL DENGAN FILTER --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '15px' }}>
                    <h3>Daftar Pengeluaran</h3>
                    <div>
                        <label style={{ marginRight: '10px' }}>Filter Tabel per Tanggal: </label>
                        <input
                            type="date"
                            value={tableDateFilter}
                            onChange={(e) => setTableDateFilter(e.target.value)}
                            style={{ padding: '5px' }}
                        />
                        <button
                            onClick={() => setTableDateFilter("")}
                            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Waktu & Tanggal</th>
                            <th>Keterangan</th>
                            <th>Jumlah</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ganti map ke filteredExpenses */}
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {new Date(item.date).toLocaleString('id-ID', {
                                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </td>
                                    <td>{item.title}</td>
                                    <td>Rp {Number(item.amount).toLocaleString('id-ID')}</td>
                                    <td>
                                        <button onClick={() => startEdit(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Tidak ada data pada tanggal tersebut.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Karyawan;