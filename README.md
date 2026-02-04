# Bioboon - PKM PM

> **Program Kreativitas Mahasiswa - Pengabdian Masyarakat (PKM-PM)**
> *Pemanfaatan Kotoran Ternak sebagai Biogas dan Bio-slurry Menggunakan Katalis EM4 Berbasis IoT di Jabungan, Semarang, Guna Mencapai Kemandirian Energi.*

![Bioboon Banner](/public/assets/bioboon-img.png)

## Overview
**Bioboon** is a Progressive Web Application (PWA) designed to monitor, visualize, and optimize biogas distribution systems in Jabungan, Semarang. It integrates real-time IoT telemetry with a high-fidelity "Organic Tech" interface to provide actionable insights for sustainable energy management.

## Key Features

### 📡 Real-Time Monitoring
-   **Live Telemetry**: Direct integration with **ThingSpeak API** to stream Methane (CH4) and Carbon Dioxide (CO2) levels.
-   **Status Alerts**: Automated visual indicators for "Optimal Flow", "Warning", or "Critical" gas concentrations.
-   **Visual Metrics**: Animated progress bars and holographic cards for instant data readability.

### 🗺️ Tactical Hologram Map
-   **Interactive Visualization**: A detailed map of the Jabungan deployment area using **Leaflet**.
-   **Unit Tracking**: Monitors 5 distinct biogas units (Rumah 1-5) with precise GPS coordinates.
-   **Cybernetic Aesthetic**: Custom "Night/Day" modes with holographic tilt effects, radar scans, and bioluminescent network paths.

### 📱 Mobile-First PWA
-   **Installable**: Works natively on iOS and Android devices via "Add to Home Screen".
-   **Bottom Dock Navigation**: Modern, thumb-friendly navigation dock for ease of use on mobile.
-   **Offline Capable**: Service workers ensure core functionality remains accessible even with spotty connections.

## Tech Stack
-   **Frontend**: React.js (Create React App)
-   **Styling**: Tailwind CSS (with Custom Animations & Glassmorphism)
-   **Mapping**: React Leaflet / Leaflet.js
-   **Icons**: Lucide React
-   **IoT Integration**: ThingSpeak API
-   **Architecture**: Context-based State Management & Theming
-   **Hardware**: ESP32

## Getting Started

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/galihaditya404/bioboon.git
    cd bioboon
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm start
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## Project Team
**Program Kreativitas Mahasiswa (PKM) 2024**
*   **Dr. Noer Abyor Handayani** (Dosen Pembimbing)
*   **Refah Hakam Muhammad** (Ketua Tim)
*   **St. Nur Rifqah Aliyah** (Anggota I)
*   **Alan Tajri Akbar** (Anggota II)
*   **Aufa Fadhil Islami** (Anggota III)
*   **Galih Aditya Fernanda** (Anggota IV)
