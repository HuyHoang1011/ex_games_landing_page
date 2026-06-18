export interface ICoreEntity<T> {
  id: T;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
