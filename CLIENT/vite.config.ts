import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            srcDir: "service-worker",
            filename: "push.js",
            workbox: {
                // options de caching si besoin
                importScripts: ["/service-worker/push.js"],
            },
            includeAssets: ["icon-192.png"],
            manifest: {
                name: "On fête nos 15 ans !",
                short_name: "15 ans 🩷",
                start_url: "/save-the-date",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#000000",
                icons: [
                    {
                        src: "icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
