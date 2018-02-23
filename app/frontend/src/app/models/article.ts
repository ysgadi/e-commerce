import {Cart} from './cart';

export interface Article {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ArticleCategory;
  quantity: number;
  ownerId: number;
  Cart: Cart;
}

export enum ArticleCategory {
  MULTIMEDIA = 'Multimedia',
  INFORMATIQUE = 'Informatique',
  VEHICULE = 'Vehicule',
  SERVICE = 'Service',
  EXTERIEUR = 'Exterieur',
  INTERIEUR = 'Interieur',
  AUTRE = 'Autre'
}
