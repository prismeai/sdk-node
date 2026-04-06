import { BaseResource } from '../../core/base-resource.js';
import type { HttpClient } from '../../core/http-client.js';
import type { PageIterator } from '../../core/pagination.js';
import type { Tool, ToolCreateParams, ToolListParams } from '../../types/tools.js';

export class Tools extends BaseResource {
  private readonly workspaceId: string;

  constructor(httpClient: HttpClient, workspaceId: string) {
    super(httpClient);
    this.workspaceId = workspaceId;
  }

  private path(...segments: string[]): string {
    return this.buildPath(this.workspaceId, ...segments);
  }

  /** List tools available for agents. */
  list(params?: ToolListParams): PageIterator<Tool> {
    return this._paginate<Tool>(this.path('tools'), params);
  }

  /** Create a new tool. */
  create(params: ToolCreateParams): Promise<Tool> {
    return this._post<Tool>(this.path('tools'), params);
  }

  /** Get a tool by ID. */
  get(toolId: string): Promise<Tool> {
    return this.httpClient.get<Tool>(this.path('tools', toolId));
  }
}
