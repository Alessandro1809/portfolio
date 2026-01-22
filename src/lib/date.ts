export const normalizeDate = (value: unknown): Date | undefined => {
    if (value === null || value === undefined || value === "") return undefined;

    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? undefined : value;
    }

    if (typeof value === "number") {
        if (!Number.isFinite(value) || value === 0) return undefined;
        const millis = value < 1e12 ? value * 1000 : value;
        const date = new Date(millis);
        return Number.isNaN(date.getTime()) ? undefined : date;
    }

    if (typeof value === "string") {
        const trimmed = value.trim();
        if (!trimmed) return undefined;

        const numeric = Number(trimmed);
        if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
            if (numeric === 0) return undefined;
            const millis = numeric < 1e12 ? numeric * 1000 : numeric;
            const date = new Date(millis);
            return Number.isNaN(date.getTime()) ? undefined : date;
        }

        const date = new Date(trimmed);
        return Number.isNaN(date.getTime()) ? undefined : date;
    }

    return undefined;
};

export const formatDate = (
    value: unknown,
    locale: string,
    options: Intl.DateTimeFormatOptions,
): string | undefined => {
    const date = normalizeDate(value);
    return date ? date.toLocaleDateString(locale, options) : undefined;
};

export const toIsoString = (value: unknown): string | undefined => {
    const date = normalizeDate(value);
    return date ? date.toISOString() : undefined;
};
