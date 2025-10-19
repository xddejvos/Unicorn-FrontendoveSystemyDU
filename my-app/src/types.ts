export type ListItem = { id: string; name: string; qty: number; done: boolean };

// ShoppingList now includes owner and members so we can enforce owner-only actions
export type ShoppingList = {
	id: string;
	name: string;
	owner: string; // user id of the owner
	members: string[]; // list of user ids who are members
	items: ListItem[];
};
