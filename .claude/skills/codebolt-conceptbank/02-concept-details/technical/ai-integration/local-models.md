---
title: Local ONNX Models
category: Technical
subcategory: AI Integration
tags: [local, onnx, embeddings, privacy, offline]
---

## Executive Summary

CodeBolt supports running AI models locally on your machine using ONNX Runtime, enabling privacy-preserving, offline-capable AI features without external API calls or recurring costs.

## What Are Local Models?

Local models are AI models that run directly on your computer rather than on cloud servers. CodeBolt uses ONNX (Open Neural Network Exchange) Runtime, a cross-platform inference engine, to execute these models locally. This gives you full control over your data and computing resources.

## Why It Matters

- **Privacy**: Data never leaves your machine
- **Offline Operation**: Works without internet connection
- **Cost Savings**: No per-token API fees
- **Low Latency**: No network round-trip delays
- **Data Sovereignty**: Complete control over your information
- **Compliance**: Meet strict data residency requirements

## Key Concepts

### ONNX Runtime
- **Cross-Platform**: Runs on Windows, macOS, and Linux
- **Hardware Acceleration**: Utilizes CPU, GPU, and NPUs
- **Optimized**: Efficient inference for production use
- **Standard Format**: Models from PyTorch, TensorFlow, etc.

### Model Capabilities
- **Embeddings**: Text semantic similarity and search
- **Chat**: Text generation and conversation (planned)
- **Speech-to-Text**: Audio transcription (planned)
- **Text-to-Speech**: Audio generation (planned)

### Inference Library Abstraction
- **Unified Interface**: Single API for all local model types
- **Extensible**: Easy to add new inference libraries (llama.cpp, MLX, etc.)
- **Capability-Based**: Models declare what they can do
- **Lifecycle Management**: Load, unload, and manage model state

## Architecture

### Inference Library System

CodeBolt uses an extensible inference library architecture:

```
┌─────────────────────────────────────────┐
│     Application Layer                   │
│  (llmService, embeddingService)         │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│     Inference Registry                  │
│  - Manages all inference libraries      │
│  - Routes to appropriate library        │
│  - Tracks model capabilities            │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐      ┌────▼───┐
│ ONNX   │      │ llama  │  (Future)
│Runtime │      │ .cpp   │
└───┬────┘      └────────┘
    │
┌───▼────────┐
│ Local      │
│ Model      │
│ Files      │
└────────────┘
```

### Model Storage

Models are stored in:
- **Location**: `~/.codebolt/models/<model-id>/`
- **Contents**: Model weights, tokenizer, configuration
- **Metadata**: Download timestamp, version info

Example structure:
```
~/.codebolt/models/
└── all-MiniLM-L6-v2/
    ├── model.onnx           # Model weights
    ├── tokenizer.json       # Tokenizer vocabulary
    ├── tokenizer_config.json
    ├── config.json          # Model configuration
    ├── special_tokens_map.json
    └── metadata.json        # Download info
```

## Supported Models

### all-MiniLM-L6-v2 (Embeddings)
- **Size**: ~90MB
- **Dimensions**: 384
- **Max Sequence**: 256 tokens
- **Use Case**: Fast semantic similarity, document search
- **Source**: HuggingFace (Xenova/all-MiniLM-L6-v2)

### Planned Models
- **Chat Models**: Llama-based models for conversation
- **Larger Embeddings**: Higher dimensional embeddings for accuracy
- **Multilingual**: Models supporting multiple languages
- **Domain-Specific**: Models fine-tuned for code, medical, legal

## How It Works

### 1. Model Discovery
The system discovers available models through:
- Pre-configured model registry
- Model capability declarations
- Inference library assignments

### 2. Model Download
When you select a local model:
1. System checks if model is already downloaded
2. If not, downloads from HuggingFace or other source
3. Shows download progress in UI
4. Validates model files after download
5. Stores metadata for future reference

### 3. Model Loading
When using a local model:
1. System checks if model is loaded in memory
2. If not, loads model using appropriate inference library
3. Prepares tokenizer and configuration
4. Model is ready for inference

### 4. Inference
Running inference locally:
1. Input text is tokenized
2. Tensors are created for model input
3. Model runs forward pass (on CPU/GPU)
4. Output tensors are converted to results
5. Results are post-processed (e.g., mean pooling for embeddings)

### 5. Model Management
- **Unload**: Free memory when done
- **Delete**: Remove downloaded model
- **Update**: Download new versions
- **Status**: Check if model is ready

## Configuration

### Model Selection

Choose local models in Settings:
```typescript
{
  provider: "local",
  model: "all-MiniLM-L6-v2"
}
```

### Provider Registry

Local provider is registered alongside cloud providers:
```typescript
{
  id: "local",
  name: "Local",
  category: "local",
  requiresKey: false,
  capabilities: ["embedding"],
  description: "Run AI models locally on your machine"
}
```

### Model Capability Declaration

Each model declares its capabilities:
```typescript
{
  id: "all-MiniLM-L6-v2",
  name: "all-MiniLM-L6-v2",
  capabilities: ["embedding"],
  inferenceLibrary: "onnxruntime",
  size: "~90MB",
  embeddingDimension: 384
}
```

## Performance Characteristics

### Latency
- **Embeddings**: ~50-200ms per text (CPU)
- **Chat**: Varies by model size (planned feature)
- **No Network**: Eliminates network latency

### Memory Usage
- **all-MiniLM-L6-v2**: ~200MB RAM when loaded
- **Larger models**: Proportionally more memory
- **Unload**: Free memory when not in use

### Hardware Acceleration
- **CPU**: Works on any modern CPU
- **GPU**: Automatic GPU acceleration if available
- **NPU**: Future support for neural processing units

## Use Cases

### Privacy-Sensitive Applications
- **Code Analysis**: Scan proprietary code
- **Document Search**: Search internal documents
- **Customer Data**: Process customer information
- **Healthcare**: Handle medical records

### Offline Operation
- **Travel**: Work without internet
- **Secure Environments**: Air-gapped systems
- **Remote Locations**: Limited connectivity
- **Development**: Local testing

### Cost Optimization
- **High Volume**: Process lots of text cheaply
- **Background Tasks**: Automated processing
- **Caching**: Pre-compute embeddings
- **Batch Jobs**: Process offline

## Trade-offs: Local vs Cloud

### Local Models Advantages
✓ Privacy and data control
✓ No ongoing costs
✓ Offline capability
✓ Low latency (no network)
✓ Customization potential

### Cloud Models Advantages
✓ More powerful models
✓ Larger context windows
✓ Better performance on complex tasks
✓ Automatic updates
✓ No local resource usage
✓ Specialized hardware (TPUs, etc.)

### When to Use Each

**Use Local When**:
- Privacy is critical
- Internet is unreliable
- Cost is a concern
- Tasks are simple enough
- Data volume is high

**Use Cloud When**:
- Need best performance
- Complex reasoning required
- Have reliable internet
- Cost is acceptable
- Want latest models

## Extensibility

### Adding New Inference Libraries
The architecture supports adding new inference libraries:
1. Implement `InferenceLibrary` interface
2. Register with `inferenceRegistry`
3. Assign models to the library
4. Use through unified API

Planned libraries:
- **llama.cpp**: Efficient LLaMA inference
- **MLX**: Apple Silicon optimization
- **Custom**: Domain-specific libraries

### Adding New Models
To add a new local model:
1. Define model metadata
2. Specify inference library
3. Declare capabilities
4. Add to model registry
5. Provide download URLs

## Future Enhancements

### Capabilities
- **Chat Models**: Local text generation
- **Speech**: Voice input/output
- **Vision**: Image understanding
- **Code**: Code-specific models

### Features
- **Model Quantization**: Smaller, faster models
- **Fine-tuning**: Custom models for your data
- **Model Caching**: Persistent model state
- **Batch Processing**: Multiple texts at once
- **Streaming**: Real-time results

### Infrastructure
- **GPU Support**: CUDA, Metal, WebGPU
- **Distributed**: Multiple machines
- **Model Hub**: Centralized model repository
- **Version Management**: Model updates and rollbacks

## Related Concepts

- [LLM Integration](./llm-integration.md) - Overall AI integration architecture
- [Multi-LLM Support](./multi-llm-support.md) - Cloud provider alternatives
- [Embeddings](./embeddings.md) - Local embedding generation
- [Agent Runtime](./agent-runtime.md) - Agent execution with local models
