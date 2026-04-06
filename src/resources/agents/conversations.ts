import { BaseResource } from '../../core/base-resource.js';
import type { HttpClient } from '../../core/http-client.js';
import type { PageIterator } from '../../core/pagination.js';
import type {
  Conversation,
  ConversationCreateParams,
  ConversationUpdateParams,
  ConversationListParams,
  ConversationMessage,
  ConversationShareParams,
} from '../../types/conversations.js';

export class Conversations extends BaseResource {
  private readonly workspaceId: string;

  constructor(httpClient: HttpClient, workspaceId: string) {
    super(httpClient);
    this.workspaceId = workspaceId;
  }

  private path(...segments: string[]): string {
    return this.buildPath(this.workspaceId, ...segments);
  }

  /** List conversations. */
  list(params?: ConversationListParams): PageIterator<Conversation> {
    return this._paginate<Conversation>(this.path('conversations'), params);
  }

  /** Create a new conversation. */
  create(params?: ConversationCreateParams): Promise<Conversation> {
    return this._post<Conversation>(this.path('conversations'), params);
  }

  /** Get a conversation by ID. */
  get(conversationId: string): Promise<Conversation> {
    return this.httpClient.get<Conversation>(this.path('conversations', conversationId));
  }

  /** Update a conversation. */
  update(conversationId: string, params: ConversationUpdateParams): Promise<Conversation> {
    return this._patch<Conversation>(this.path('conversations', conversationId), params);
  }

  /** Delete a conversation. */
  delete(conversationId: string): Promise<void> {
    return this._del<void>(this.path('conversations', conversationId));
  }

  /** List messages in a conversation. */
  messages(conversationId: string, params?: { page?: number; limit?: number }): PageIterator<ConversationMessage> {
    return this._paginate<ConversationMessage>(
      this.path('conversations', conversationId, 'messages'),
      params,
    );
  }

  /** Share a conversation. */
  share(conversationId: string, params: ConversationShareParams): Promise<void> {
    return this._post<void>(this.path('conversations', conversationId, 'share'), params);
  }
}
