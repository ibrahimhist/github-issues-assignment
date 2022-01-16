export interface IIssueUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface IIssue {
  id: string;
  title: string;
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  user: IIssueUser;
  body: string;
}
