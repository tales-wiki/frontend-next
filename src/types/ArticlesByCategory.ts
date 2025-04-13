export interface ArticleByCategory {
  articleVersionId: number;
  title: string;
}

export interface CategoryArticles {
  initial: string;
  payload: ArticleByCategory[];
}

export type ArticlesByCategory = CategoryArticles[];
