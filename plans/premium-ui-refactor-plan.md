# 📋 Implementation Plan: Premium UI Refactoring

> Özellik uygulama planı şablonu.

---

## 🎯 Özellik: Premium UI & Profesyonel SaaS Dönüşümü

**Hazırlayan**: AI Asistan
**Tarih**: 2026-05-04
**Durum**: In Progress
**İlgili Issue**: #1

---

## Özet

Projenin standart Tailwind tasarımından çıkarılarak, premium bir SaaS görünümüne (Glassmorphism, gelişmiş tipografi, micro-animasyonlar, modern renk paletleri) dönüştürülmesi.

---

## Kapsam

### ✅ Kapsam İçi
- [ ] Tailwind konfigürasyonunun gelişmiş renk paleti ve tipografi ile güncellenmesi
- [ ] `clsx` ve `tailwind-merge` kurulumu ve `cn` utility yazılması
- [ ] `index.css` dosyasında ana CSS değişkenlerinin (CSS variables) oluşturulması
- [ ] Ana Layout (`AppShell`) ve `Home` sayfasının Premium formata güncellenmesi (Glassmorphism ve Framer Motion)
- [ ] Oyun ekranının ve diğer sayfaların yenilenmesi

### ❌ Kapsam Dışı
- Backend veya veritabanı entegrasyonu
- Oyun mantığının değiştirilmesi

---

## Görevler

### Faz 1: Altyapı (Tasarım Sistemi)
| # | Görev | Tahmini | Durum |
|---|-------|---------|-------|
| 1.1 | `clsx` ve `tailwind-merge` yükle | 10m | ⬜ |
| 1.2 | `src/utils/cn.ts` oluştur | 5m | ⬜ |
| 1.3 | `tailwind.config.js` gelişmiş temayla güncelle | 15m | ⬜ |
| 1.4 | `index.css` içine global CSS değişkenlerini ekle | 10m | ⬜ |
| 1.5 | `index.html`'e modern fontları (Outfit/Inter) ekle | 5m | ⬜ |

### Faz 2: Uygulama (UI Component Güncellemeleri)
| # | Görev | Tahmini | Durum |
|---|-------|---------|-------|
| 2.1 | `AppShell.tsx` ve `Navbar.tsx` premium hale getir (Glassmorphism, hover) | 30m | ⬜ |
| 2.2 | `Home.tsx` landing page mantığında yenile | 30m | ⬜ |
| 2.3 | `Game.tsx` oyun arayüzünü modernleştir | 45m | ⬜ |

### Faz 3: Test & Dokümantasyon
| # | Görev | Tahmini | Durum |
|---|-------|---------|-------|
| 3.1 | Çalışır durumda olduğunu test et | 15m | ⬜ |
| 3.2 | CHANGELOG'a ekle | 10m | ⬜ |

---

## Kabul Kriterleri

- [ ] Tüm UI bileşenlerinde profesyonel, modern bir his (shadow, blur, motion) olması
- [ ] Yeni fontların ve renklerin başarıyla uygulanması
- [ ] Sayfalar arası geçişlerde animasyon olması
