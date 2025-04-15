export interface ArticleVersion {
  articleVersionId: number;
  articleId: number;
  title: string;
  category: string;
  nickname: string;
  content: string;
  size: number;
  ip: string;
  isHiding: boolean;
  isNoEditing: boolean;
  createdAt: string;
}

export interface ArticleVersionResponse {
  content: ArticleVersion[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  isFirst: boolean;
  isLast: boolean;
}
