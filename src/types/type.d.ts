export type Product = {
    category?: string;
    completed: boolean;
    name: string;
    quantity?: number;
    }

export type List  = {
    id: string;
    title: string;
    products: Product[];
    createdAt: number;
    createdBy: string;
    invited: string[];
}