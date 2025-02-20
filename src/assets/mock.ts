export type Product = {
id: string;
category: string;
completed: boolean;
name: string;
quantity: number;
}

export type Invitation = {
    id: string;
    
}

export type List  = {
    id: string;
    name: string;
    products: Product[];
    createdAt: number;
    createdBy: string;
    visibledBy: string[];
    completed: boolean;
    notes?: string;
}

export const mockLists: List[] = [
    {
        id: 'dsda',
        createdAt: 312312,
        createdBy: 'Pawel',
        name: 'Biedronka',
        visibledBy: [],
        completed: false,
        notes: 'notes',
        products: [
            {
                id: 'dsadff',
                category: 'vegetables',
                name: 'Gruszka',
                quantity: 3,
                completed: false,
            },
            {
                id: '9fds',
                category: 'drink',
                name: 'Sok pomarańczowy',
                quantity: 1,
                completed: true
            }
        ]
    },
    {
        id: 'dsda',
        createdAt: 312312,
        createdBy: 'Pawel',
        name: 'Biedronka2',
        visibledBy: [],
        completed: false,
        notes: 'notes',
        products: [
            {
                id: 'dsadff',
                category: 'vegetables',
                name: 'Gruszka',
                quantity: 3,
                completed: false,
            },
            {
                id: '9fds',
                category: 'drink',
                name: 'Sok pomarańczowy',
                quantity: 1,
                completed: true
            }
        ]
    },
]