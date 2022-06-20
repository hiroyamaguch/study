export interface IRecipe {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}