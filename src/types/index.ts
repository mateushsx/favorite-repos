export type TRepository = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string;
  url: string;
};

export interface TRepositoryIssue {
  id: number;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
}
