export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    parent: string | null;
    level: number;
    ancestors:  Ancestors[] | null;
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Ancestors {
    _id: string;
    name: string;
    slug: string;
}