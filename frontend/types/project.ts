export interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    category_display: string;
    thumbnail: string; // This will be the URL to the image
    video_url?: string; // Optional field
    description: string;
    created_at: string;
}