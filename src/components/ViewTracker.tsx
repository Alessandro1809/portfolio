import { useEffect } from "react";

type Props = {
    slug: string;
    apiBaseUrl?: string;
};

export function ViewTracker({ slug, apiBaseUrl }: Props) {
    useEffect(() => {
        const baseUrl =
            apiBaseUrl ??
            import.meta.env.PUBLIC_BLOG_API_URL ??
            "http://localhost:51214/api/v1";

        void fetch(`${baseUrl}/posts/${slug}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        }).catch(() => {
            // Best-effort tracking: ignore failures.
        });
    }, [slug, apiBaseUrl]);

    return null;
}
