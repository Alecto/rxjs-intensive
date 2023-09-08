import { GithubItemInterface } from './github-item.interface';

export interface GithubResponseInterface {
  incomplete_results: boolean;
  items: GithubItemInterface[];
  total_count: number;
}
