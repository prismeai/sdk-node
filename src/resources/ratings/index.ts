import { BaseResource } from '../../core/base-resource.js';
import type { HttpClient } from '../../core/http-client.js';

export interface RatingCreateParams {
  agentId: string;
  conversationId?: string;
  messageId?: string;
  rating: number;
  feedback?: string;
}

export interface Rating {
  id: string;
  rating: number;
  feedback?: string;
  [key: string]: unknown;
}

export class Ratings extends BaseResource {
  private readonly workspaceId: string;

  constructor(httpClient: HttpClient, workspaceId: string) {
    super(httpClient);
    this.workspaceId = workspaceId;
  }

  private path(...segments: string[]): string {
    return this.buildPath(this.workspaceId, ...segments);
  }

  /** Submit a rating for an agent response. */
  create(params: RatingCreateParams): Promise<Rating> {
    return this._post<Rating>(this.path('ratings'), params);
  }
}
