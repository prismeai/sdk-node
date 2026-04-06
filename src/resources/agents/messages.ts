import { BaseResource } from '../../core/base-resource.js';
import type { HttpClient } from '../../core/http-client.js';
import { SSEStream } from '../../core/streaming.js';
import type {
  MessageSendParams,
  MessageResponse,
  StreamEvent,
} from '../../types/messages.js';

export class Messages extends BaseResource {
  private readonly workspaceId: string;

  constructor(httpClient: HttpClient, workspaceId: string) {
    super(httpClient);
    this.workspaceId = workspaceId;
  }

  private path(...segments: string[]): string {
    return this.buildPath(this.workspaceId, ...segments);
  }

  /** Send a message to an agent and get a complete response. */
  send(agentId: string, params: MessageSendParams): Promise<MessageResponse> {
    return this._post<MessageResponse>(this.path('agents', agentId, 'messages'), params);
  }

  /** Send a message and receive the response as an SSE stream. */
  async stream(agentId: string, params: MessageSendParams): Promise<SSEStream<StreamEvent>> {
    const controller = new AbortController();
    const response = await this.httpClient.requestRaw({
      method: 'POST',
      path: this.path('agents', agentId, 'messages', 'stream'),
      body: params,
      headers: {
        accept: 'text/event-stream',
      },
      signal: controller.signal,
    });

    return new SSEStream<StreamEvent>(response, controller);
  }
}
