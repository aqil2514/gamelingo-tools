declare module "api/fe" {
  /** Konfigurasi function Notif */
  export interface NotifConfig {
    /**
     * Warna yang akan digunakan untuk menampilkan pesan. Gunakan warna yang valid ada di Tailwaind
     */
    color: string;
    /**
     * Elemen referensi tempat munculnya pesan. Gunakan attribute id pada elemen yang menjadi acuan
     */
    refElement: string;
    /**
     * Lokasi munculnya di setelah atau di sebelum referensi element
     */
    location: "before" | "after";
    /**
     * Lama waktu munculnya pesan.
     *
     * Default: 3000 (3 Detik)
     */
    time?: number;
  }
  /**
   * Menampilkan pesan
   * @param msg - Pesan yang akan ditampilkan
   * @param config - Konfigurasi penampilan pesan
   */
  export declare function notif(msg: string, config: NotifConfig): void;
}
