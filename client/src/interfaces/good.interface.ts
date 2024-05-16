export interface IGood {
  id?: number;
  firstName: string;
  lastName: string;
  hireDate: string | null;
  categoryId?: number | null;
  location?: {
    title?: string;
    lng?: number;
    lat?: number;
  };
  category?: {
    id?: number;
    title: string;
  };
}
