import { Category } from './category.model';

export interface Product {
    id: String;
    name: String;
    price: Number;
    size: String;
    amount: Number;
    gender: String;
    image: String[];
    category: Category;
}