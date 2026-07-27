export type ProducerCategory = "pertanian" | "kelautan";

export type ProducerPin = {
  id: string;
  nama: string;
  kategori: ProducerCategory;
  komoditas: string;
  lokasi: string;
  status: "Tersedia" | "Segera Panen";
  telepon: string | null;
  jarak_km: number | null;
  lat: number;
  lng: number;
};

export type PenawaranPeta = {
  id: string;
  estimasi_volume: number;
  estimasi_tanggal_panen: string;
  jarak_km: number | null;
  anggota_koperasi: {
    nama: string;
    pekerjaan: string | null;
    telepon: string | null;
    anggota_lokasi: {
      lokasi_lat: number;
      lokasi_lng: number;
      alamat: string | null;
    } | null;
  } | null;
  referensi_komoditas_desa: { nama_komoditas: string } | null;
};

const PEKERJAAN_TO_KATEGORI: Record<string, ProducerCategory> = {
  Petani: "pertanian",
  Nelayan: "kelautan",
};

export function mapPenawaranToPin(p: PenawaranPeta): ProducerPin | null {
  const lokasi = p.anggota_koperasi?.anggota_lokasi;
  const kategori = p.anggota_koperasi?.pekerjaan
    ? PEKERJAAN_TO_KATEGORI[p.anggota_koperasi.pekerjaan]
    : undefined;

  if (!lokasi || !kategori) return null;

  const hariLagi = Math.round(
    (new Date(p.estimasi_tanggal_panen).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24),
  );

  return {
    id: p.id,
    nama: p.anggota_koperasi?.nama ?? "Produsen",
    kategori,
    komoditas: p.referensi_komoditas_desa?.nama_komoditas ?? "Tidak diketahui",
    lokasi: lokasi.alamat ?? `${lokasi.lokasi_lat}, ${lokasi.lokasi_lng}`,
    status: hariLagi <= 0 ? "Tersedia" : "Segera Panen",
    telepon: p.anggota_koperasi?.telepon ?? null,
    jarak_km: p.jarak_km,
    lat: lokasi.lokasi_lat,
    lng: lokasi.lokasi_lng,
  };
}
