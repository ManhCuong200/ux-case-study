export const API_BASE_URL = "http://localhost:3000";

export const HOTSPOT_TYPES = {
    CRITICAL: "CRITICAL",
    WARNING: "WARNING",
    INFO: "INFO",
    SUCCESS: "SUCCESS"
} as const;

export type HotspotType = keyof typeof HOTSPOT_TYPES;

export const HOTSPOT_STYLE = {
    [HOTSPOT_TYPES.CRITICAL]: {
        color: "#ef4444", // Red
        label: "Critical Issue",
        bg: "bg-red-500",
        border: "border-red-600"
    },
    [HOTSPOT_TYPES.WARNING]: {
        color: "#f59e0b", // Amber
        label: "UX Warning",
        bg: "bg-amber-500",
        border: "border-amber-600"
    },
    [HOTSPOT_TYPES.INFO]: {
        color: "#3b82f6", // Blue
        label: "Observation",
        bg: "bg-blue-500",
        border: "border-blue-600"
    },
    [HOTSPOT_TYPES.SUCCESS]: {
        color: "#10b981", // Emerald
        label: "Good UX",
        bg: "bg-emerald-500",
        border: "border-emerald-600"
    }
} as const;

export const SESSION_STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER: "user"
} as const;
