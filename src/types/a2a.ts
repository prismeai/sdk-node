export interface A2ASendParams {
  message: string;
  taskId?: string;
  context?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface A2AResponse {
  taskId: string;
  output?: string;
  status?: string;
  [key: string]: unknown;
}

export interface A2ACard {
  name: string;
  description?: string;
  url?: string;
  capabilities?: string[];
  [key: string]: unknown;
}

export interface A2AExtendedCard extends A2ACard {
  tools?: Array<{ name: string; description?: string }>;
  subAgents?: Array<{ name: string; agentId: string }>;
  [key: string]: unknown;
}

export type A2AStreamEvent = {
  type: string;
  [key: string]: unknown;
};
