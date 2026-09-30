import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

    private products = [
        { id: 1, name: 'Laptop', price: 55000 },
        { id: 2, name: 'Mobile', price: 30000 },
        { id: 3, name: 'Tablet', price: 35000 },
        { id: 4, name: 'Earphones', price: 4000 },
        { id: 5, name: 'Watch', price: 6000 }
    ];

    findAll() {
        return this.products;
    }
}
