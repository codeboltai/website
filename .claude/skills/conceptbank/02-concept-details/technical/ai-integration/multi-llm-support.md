---
title: Multi-LLM Provider Support
category: Technical
subcategory: AI Integration
tags: [llm, providers, openai, anthropic, gemini, ollama]
---

## Executive Summary

CodeBolt supports multiple leading LLM providers through a unified abstraction layer, enabling developers to choose the best AI model for each task while maintaining consistent API interfaces across providers.

## What is Multi-LLM Support?

Multi-LLM support is the ability to interface with multiple AI language model providers (OpenAI, Anthropic, Google, etc.) through a single, standardized API. Each provider has unique strengths, model offerings, and pricing structures, and CodeBolt makes it easy to switch between them or use multiple providers simultaneously.

## Why It Matters

- **Model Selection**: Choose the right model for each task (speed, cost, capability)
- **Vendor Independence**: Avoid lock-in to a single AI provider
- **Resilience**: Fallback to alternative providers if one is unavailable
- **Cost Optimization**: Use cheaper models for simpler tasks
- **Access to Cutting-Edge**: Easy to adopt new models as they're released

## Supported Providers

### OpenAI
**Models**: GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
**Strengths**:
- Most widely adopted and tested
- Excellent for general-purpose tasks
- Strong reasoning and coding capabilities
- Large ecosystem and community

**Best For**:
- General chat and assistance
- Code generation and debugging
- Complex reasoning tasks
- Production applications

### Anthropic (Claude)
**Models**: Claude 3 Opus, Sonnet, Haiku
**Strengths**:
- Strong performance on complex reasoning
- Larger context windows (200K tokens)
- Good at following detailed instructions
- Emphasis on safety and helpfulness

**Best For**:
- Long-context analysis
- Document summarization
- Complex multi-step reasoning
- Tasks requiring careful instruction following

### Google Gemini
**Models**: Gemini Pro, Gemini Ultra
**Strengths**:
- Multimodal capabilities (text, images, video, audio)
- Strong performance on benchmarks
- Integrated with Google ecosystem
- Competitive pricing

**Best For**:
- Multimodal applications
- Image analysis and generation
- Video understanding
- Google Workspace integration

### Ollama (Local)
**Models**: Llama 2, Mistral, and other open-source models
**Strengths**:
- Complete privacy (runs locally)
- No API costs after initial download
- Customizable and extensible
- Works offline

**Best For**:
- Sensitive data processing
- Offline operation
- Cost-sensitive applications
- Custom model experimentation

### Additional Providers
- **Mistral AI**: High-performance open-source models
- **Groq**: Ultra-fast inference with specialized hardware
- **Custom/OpenAI-compatible**: Any provider following OpenAI's API format

## Provider Capabilities

### Chat Completions
All major providers support:
- Text generation and conversation
- System prompts for behavior control
- Temperature and sampling parameters
- Streaming responses
- Tool/function calling

### Embeddings
Supported by:
- **OpenAI**: text-embedding-ada-002, text-embedding-3-small/large
- **Local**: ONNX-based embedding models (e.g., all-MiniLM-L6-v2)
- **Others**: Via OpenAI-compatible APIs

### Function Calling
Supported by:
- **OpenAI**: Native function calling
- **Anthropic**: Tool use API
- **Google**: Function declarations
- **Others**: Various implementations

## Provider Selection Strategy

### Performance vs Cost
```
High Cost, High Performance    Low Cost, Lower Performance
├─────────────────────────────────────────────────────────┤
│ GPT-4, Claude Opus  │  GPT-3.5, Claude Haiku, Llama 2   │
│                     │                                   │
│ Best for:           │ Best for:                         │
│ - Complex tasks     │ - Simple queries                  │
│ - Production apps   │ - Prototyping                     │
│ - Critical work     │ - High-volume requests            │
└─────────────────────────────────────────────────────────┘
```

### Speed vs Quality
- **Fast Response**: GPT-3.5, Claude Haiku, small local models
- **High Quality**: GPT-4, Claude Opus, Gemini Ultra
- **Balanced**: GPT-4 Turbo, Claude Sonnet, Gemini Pro

### Privacy vs Convenience
- **Privacy**: Local models (Ollama, ONNX)
- **Convenience**: Cloud providers (managed, scalable)
- **Hybrid**: Use local for sensitive data, cloud for general tasks

## Configuration

### Adding a Provider

Providers are added through the Settings UI or API:

```typescript
// Provider configuration
{
  name: "OpenAI",
  key: "sk-...",
  apiUrl: "https://api.openai.com/v1"  // Optional custom endpoint
}

// Model selection
{
  provider: "OpenAI",
  model: "gpt-4-turbo-preview"
}
```

### Default Provider

Set a system-wide default provider:
- Used when no specific provider is requested
- Can be overridden per-project or per-request
- Includes both chat and embedding models

### LLM Roles

Assign different providers to different task types:
- **Coding**: GPT-4 for complex refactoring
- **Chat**: Claude Sonnet for conversation
- **Analysis**: Local model for quick searches
- **Embeddings**: Local model for privacy

## API Compatibility

### OpenAI-Compatible APIs

Many providers follow OpenAI's API format:
- Standardized endpoints
- Compatible request/response schemas
- Easy switching between providers

Providers using this format:
- OpenAI (obviously)
- Many self-hosted solutions
- Some proxy services
- Custom model deployments

### Provider-Specific Features

Each provider has unique features:
- **Anthropic**: Extended context, message-based API
- **Google**: Multimodal, native grounding
- **OpenAI**: Function calling, structured outputs
- **Local**: Privacy, customization

The abstraction layer handles these differences automatically.

## Pricing Considerations

### Token Pricing Models

Different providers price tokens differently:
- **Input tokens**: Prompt text (cheaper)
- **Output tokens**: Generated text (more expensive)
- **Context caching**: Some providers discount repeated context

### Cost Optimization Strategies

1. **Use Smaller Models**: For simple tasks
2. **Cache Results**: Avoid repeated calls
3. **Prompt Optimization**: Reduce input tokens
4. **Provider Selection**: Choose cost-effective options
5. **Local Models**: No per-token costs

### Cost Tracking

CodeBolt tracks:
- Token usage per request
- Estimated cost per request
- Total spending per session
- Cost breakdown by provider and model

## Reliability & Fallback

### Provider Health Monitoring

The system monitors:
- API response times
- Error rates
- Rate limiting status
- Service availability

### Automatic Fallback

Can configure fallback behavior:
- Primary provider unavailable → try secondary
- Rate limit hit → switch to another provider
- Cost threshold reached → use cheaper model

### Manual Provider Selection

Always can override:
- Choose specific provider per request
- Test different providers for comparison
- Switch providers based on results

## Future Providers

The architecture is designed to easily add new providers:
- Pluggable provider interface
- Standardized configuration
- Unified error handling
- Consistent API surface

Planned additions:
- More open-source models
- Specialized domain models
- Regional providers (data residency)
- Enterprise/private deployments

## Related Concepts

- [LLM Integration](./llm-integration.md) - Core integration architecture
- [Local Models](./local-models.md) - ONNX-based local inference
- [Embeddings](./embeddings.md) - Text embedding generation
- [Settings](../../features/additional-features/settings.md) - Provider configuration
