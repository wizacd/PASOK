const RADIUS_MAKSIMAL_KM = 50;
const BOBOT = { jarak: 0.4, kategori: 0.35, volume: 0.25 };

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

export function hitungJarakKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function hitungSkorKategori(ditawarkan, daftarDibutuhkan) {
  const norm = (s) => s.toLowerCase().trim();
  const target = norm(ditawarkan);
  if (daftarDibutuhkan.some((k) => norm(k) === target)) return 1;
  return 0;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

export function hitungSkorMatching({
  lokasiProdusen, lokasiKoperasi, komoditasDitawarkan,
  komoditasDibutuhkan, volumeDitawarkan, volumeDibutuhkan = null,
}) {
  const jarakKm = hitungJarakKm(
    lokasiProdusen.lat, lokasiProdusen.lon,
    lokasiKoperasi.lat, lokasiKoperasi.lon
  );

  const skorJarak = Math.max(0, 1 - jarakKm / RADIUS_MAKSIMAL_KM);
  const skorKategori = hitungSkorKategori(komoditasDitawarkan, komoditasDibutuhkan);
  const skorVolume = volumeDibutuhkan
    ? Math.max(0, 1 - Math.abs(volumeDitawarkan - volumeDibutuhkan) / volumeDibutuhkan)
    : 1;

  const skorTotal = BOBOT.jarak * skorJarak + BOBOT.kategori * skorKategori + BOBOT.volume * skorVolume;

  return {
    skor_total: round2(skorTotal),
    jarak_km: round2(jarakKm),
    breakdown: {
      skor_jarak: round2(skorJarak),
      skor_kategori: round2(skorKategori),
      skor_volume: round2(skorVolume),
    },
    layak_ditampilkan: jarakKm <= RADIUS_MAKSIMAL_KM && skorKategori > 0,
  };
}