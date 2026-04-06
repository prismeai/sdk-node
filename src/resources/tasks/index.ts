import { BaseResource } from '../../core/base-resource.js';
import type { HttpClient } from '../../core/http-client.js';
import type { PageIterator } from '../../core/pagination.js';
import type { Task, TaskListParams } from '../../types/tasks.js';

export class Tasks extends BaseResource {
  private readonly workspaceId: string;

  constructor(httpClient: HttpClient, workspaceId: string) {
    super(httpClient);
    this.workspaceId = workspaceId;
  }

  private path(...segments: string[]): string {
    return this.buildPath(this.workspaceId, ...segments);
  }

  /** List tasks. */
  list(params?: TaskListParams): PageIterator<Task> {
    return this._paginate<Task>(this.path('tasks'), params);
  }

  /** Get a task by ID. */
  get(taskId: string): Promise<Task> {
    return this.httpClient.get<Task>(this.path('tasks', taskId));
  }

  /** Cancel a running task. */
  cancel(taskId: string): Promise<Task> {
    return this._post<Task>(this.path('tasks', taskId, 'cancel'));
  }
}
