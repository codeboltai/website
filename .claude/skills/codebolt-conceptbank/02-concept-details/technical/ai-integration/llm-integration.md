---
id: "llm-integration"
title: LLM Integration Architecture
category: Technical
subcategory: AI Integration
tags: [llm, ai, architecture, multillm]
---

## Executive Summary

CodeBolt's LLM integration provides a unified abstraction layer for multiple Large Language Model providers through the `@arrowai/multillm` library, enabling seamless switching between cloud and local AI models while maintaining a consistent API interface for chat completions and embeddings.

## What is LLM Integration?

LLM Integration is the core AI subsystem that manages communication with various language model providers. It handles provider selection, authentication, request routing, response normalization, and error handling across different AI services while presenting a simple, consistent interface to the rest of the application.

## Why It Matters

- **Provider Flexibility**: Switch between different AI providers without changing application code
- **Cost Optimization**: Choose the most cost-effective model for each task
- **Privacy Control**: Route sensitive data through local models when needed
- **Resilience**: Fallback between providers if one is unavailable
- **Future-Proofing**: Easy to add new providers as they emerge

## Key Concepts

### Multi-LLM Support
- **Provider Registry**: Central registry of all supported LLM providers (OpenAI, Anthropic, Gemini, Ollama, etc.)
- **Unified Interface**: Single API (`Multillm` class) that works with all providers
- **Provider Configuration**: Each provider has its own configuration (API keys, endpoints, model lists)

### LLM Service Architecture
- **llmService**: Main service handling all LLM operations
  - `handleAskLLM()`: Process chat completion requests
  - `getEmbedding()`: Generate embeddings (routed to local or cloud)
  - `getModels()`: Fetch available models for a provider
- **Request Processing**: Normalizes messages, tools, and parameters across providers
- **Response Handling**: Standardizes different response formats into a common structure

### Configuration Management
- **Provider Settings**: Stored in user profile with API keys and custom endpoints
- **Default LLM**: System-wide default provider and model selection
- **LLM Roles**: Role-based provider assignment (e.g., "coding", "analysis", "chat")
- **Project Settings**: Per-project LLM configuration overrides

### Authentication & Security
- **API Key Storage**: Securely stored in user profile database
- **Key Validation**: Keys are validated when added by fetching available models
- **Custom Endpoints**: Support for custom API URLs (e.g., self-hosted models)
- **Key Rotation**: Easy to update keys without restarting the application

## How It Works

### 1. Provider Selection
When an AI request is made, the system:
1. Checks if an LLM role is specified for the request
2. Looks up the provider and model for that role
3. Falls back to the default LLM if no role is specified
4. Retrieves the provider's API key and configuration

### 2. Request Preparation
The system prepares the request by:
1. Normalizing message formats to match provider expectations
2. Converting tools/function calls to provider-specific formats
3. Adding provider-specific parameters (temperature, max_tokens, etc.)
4. Creating a `Multillm` instance with the provider configuration

### 3. API Communication
The `Multillm` library:
1. Instantiates the appropriate provider client (OpenAI, Anthropic, etc.)
2. Sends the request with authentication headers
3. Handles streaming responses if enabled
4. Manages retries and error handling

### 4. Response Processing
The system processes responses by:
1. Normalizing different response formats into a common structure
2. Extracting the generated text and metadata
3. Calculating token usage and costs
4. Updating debug logs and chat history
5. Sending notifications to the UI

### 5. Error Handling
Errors are handled by:
1. Catching network failures and timeouts
2. Detecting authentication failures
3. Handling rate limits and quota exceeded errors
4. Providing user-friendly error messages
5. Logging detailed error information for debugging

## Provider Categories

### Cloud Providers
- **OpenAI**: GPT-4, GPT-3.5, text-embedding-ada-002
- **Anthropic**: Claude 3 Opus, Sonnet, Haiku
- **Google**: Gemini Pro, Gemini Ultra
- **Mistral**: Mixtral, Mistral 7B
- **Groq**: Fast inference with various models
- **Custom**: Any OpenAI-compatible API

### Local Providers
- **Local**: ONNX-based models running on user's machine
  - Currently supports embeddings
  - Extensible to chat models in the future

## LLM Roles System

LLM roles allow assigning different providers/models to different types of tasks:

```typescript
// Example LLM roles configuration
{
  name: "coding",
  provider: "OpenAI",
  model: "gpt-4"
},
{
  name: "analysis",
  provider: "Anthropic",
  model: "claude-3-haiku-20240307"
}
```

Benefits:
- **Cost Optimization**: Use cheaper models for simple tasks
- **Performance**: Use faster models for quick responses
- **Specialization**: Leverage each model's strengths
- **Flexibility**: Easy to reconfigure without code changes

## Cost Tracking

The LLM integration includes:
- **Token Usage Tracking**: Counts input and output tokens for each request
- **Pricing Database**: Maintains current pricing for all models
- **Cost Calculation**: Real-time cost estimation as requests are made
- **Budget Monitoring**: Track spending across projects and sessions

## Configuration Schema

```typescript
interface LLMConfig {
  // Primary chat provider
  provider: string | { name: string, key: string, apiUrl: string }
  model: string

  // Embedding provider
  embeddingProvider: string | { name: string, key: string }
  embeddingModel: string

  // Advanced settings
  device_map?: string  // For local models
  config?: any  // Provider-specific config
}
```

## Related Concepts

- [Multi-LLM Support](./multi-llm-support.md) - Detailed provider information
- [Local Models](./local-models.md) - ONNX-based local inference
- [Embeddings](./embeddings.md) - Text embedding generation
- [Agent Runtime](./agent-runtime.md) - AI agent execution environment
- [Settings](../../features/additional-features/settings.md) - LLM configuration UI
