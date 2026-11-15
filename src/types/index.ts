export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  usageType?: 'culinary' | 'massage' | 'hair-skin' | 'all';
  dosha?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  hoverImage?: string;
  description: string;
  volume: string;
  coldPressTemp: string;
  oleicAcid: string;
  acidity: string;
  polyphenols: string;
  inStock: boolean;
  featured?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface StoryPhase {
  id: number;
  stepNumber: string;
  title: string;
  heading: string;
  description: string;
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  startProgress: number;
  endProgress: number;
}
