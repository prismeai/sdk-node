export interface MessageSendParams {
  text?: string;
  parts?: MessagePart[];
  conversationId?: string;
  context?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface MessagePart {
  type: 'text' | 'image' | 'file' | 'audio';
  text?: string;
  url?: string;
  mimeType?: string;
  data?: string; // base64
}

export interface MessageResponse {
  output?: string;
  conversationId?: string;
  taskId?: string;
  [key: string]: unknown;
}

/**
 * SSE stream event types emitted during message streaming.
 */
export type StreamEvent =
  | StreamEventDelta
  | StreamEventTaskStatus
  | StreamEventTaskCompleted
  | StreamEventToolCall
  | StreamEventToolResult
  | StreamEventError;

export interface StreamEventDelta {
  type: 'delta';
  text?: string;
  [key: string]: unknown;
}

export interface StreamEventTaskStatus {
  type: 'task.status';
  taskId: string;
  status: string;
  [key: string]: unknown;
}

export interface StreamEventTaskCompleted {
  type: 'task.completed';
  taskId: string;
  output?: string;
  conversationId?: string;
  [key: string]: unknown;
}

export interface StreamEventToolCall {
  type: 'tool.call';
  toolName: string;
  toolId?: string;
  arguments?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface StreamEventToolResult {
  type: 'tool.result';
  toolId?: string;
  result?: unknown;
  [key: string]: unknown;
}

export interface StreamEventError {
  type: 'error';
  error: string;
  code?: string;
  [key: string]: unknown;
}
