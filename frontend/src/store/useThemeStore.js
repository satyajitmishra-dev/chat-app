import { create } from "zustand";


export const useThemeStore = create((set) =>({
    // read stored theme; fallback to 'light' when not set
    theme: localStorage.getItem("chat-theme") || "light",
    setTheme: (theme) =>{
        localStorage.setItem("chat-theme", theme)
        set({theme})
    }
}))