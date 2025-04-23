export class NewProduct {
    constructor(
        public name: string,
        public description: string,
        public sku: string,
        public unitPrice: number,
        public imageUrl: string,
        public categoryId: number,
        public active: boolean,
        public unitsInStock: number,
        public dateCreated: Date,
        public lastUpdated: Date
    ){

    }
    
}
