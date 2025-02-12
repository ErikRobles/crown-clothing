export interface Category {
  id: number;
  title: string;
  imageUrl: string;
}

export interface DirectoryProps {
  categories: Category[];
}
