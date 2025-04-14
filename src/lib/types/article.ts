export interface Version {
  articleVersionId: number;
  nickname: string;
  versionNumber: number;
  size: number;
  isHiding: boolean;
  createdAt: string;
}

export interface ArticleVersionResponse {
  title: string;
  payload: Version[];
}
