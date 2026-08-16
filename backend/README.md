# VectorShift Backend - Pipeline Validation API

FastAPI backend service for validating visual pipeline structures using Directed Acyclic Graph (DAG) detection.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [DAG Algorithm](#dag-algorithm)
- [Development Guide](#development-guide)

---

## 🎯 Overview

This backend service is part of the VectorShift technical assessment, providing pipeline validation capabilities for the visual pipeline builder frontend. The primary function is to determine whether a given pipeline forms a valid Directed Acyclic Graph (DAG), which ensures there are no circular dependencies that would prevent proper execution.

**Key Accomplishments:**
- ✅ RESTful API endpoint for pipeline analysis
- ✅ DAG detection using Kahn's topological sort algorithm
- ✅ CORS configuration for frontend integration
- ✅ Pydantic models for request/response validation
- ✅ Efficient graph processing with adjacency lists

---

## ✨ Features

### Pipeline Validation
- **DAG Detection**: Identifies circular dependencies in pipelines
- **Node Counting**: Returns total number of nodes
- **Edge Counting**: Returns total number of connections
- **Fast Processing**: O(V + E) time complexity

### API Features
- **CORS Enabled**: Allows requests from frontend (`http://localhost:3000`)
- **Type Safety**: Pydantic models validate all inputs/outputs
- **Error Handling**: Graceful handling of malformed requests
- **RESTful Design**: Standard HTTP methods and status codes

---

## 🛠 Tech Stack

- **FastAPI 0.104+**: Modern Python web framework
- **Pydantic**: Data validation and settings management
- **Uvicorn**: ASGI server for production
- **Python 3.8+**: Programming language

---

## 🚀 Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install fastapi uvicorn pydantic
   ```

### Running the Server

**Development mode:**
```bash
uvicorn main:app --reload
```

**Production mode:**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Access the API:**
- Server runs at: `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

---

## 📝 API Documentation

### Endpoint: Parse Pipeline

**URL:** `POST /pipelines/parse`

**Description:** Validates a pipeline structure and returns analysis results.

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "input-0",
      "type": "customInput",
      "position": { "x": 100, "y": 100 },
      "data": { ... }
    },
    {
      "id": "output-1",
      "type": "customOutput",
      "position": { "x": 400, "y": 100 },
      "data": { ... }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "input-0",
      "target": "output-1",
      "sourceHandle": "input-0-output",
      "targetHandle": "output-1-input"
    }
  ]
}
```

**Response (Success):**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

**Response Fields:**
- `num_nodes` (int): Total number of nodes in the pipeline
- `num_edges` (int): Total number of connections between nodes
- `is_dag` (bool): Whether the pipeline is a valid DAG (no cycles)

**Status Codes:**
- `200 OK`: Successful analysis
- `400 Bad Request`: Invalid request format
- `500 Internal Server Error`: Server error

---

## 🧮 DAG Algorithm

### What is a DAG?

A **Directed Acyclic Graph** is a graph with directed edges and no cycles. In the context of pipelines:
- **Directed**: Data flows in one direction (from source to target)
- **Acyclic**: No circular dependencies (A → B → C → A is invalid)

### Why DAG Validation Matters

Pipelines must be DAGs to ensure:
1. **Deterministic Execution**: Clear execution order
2. **No Infinite Loops**: Prevents circular processing
3. **Dependency Resolution**: Can determine which nodes to run first

### Kahn's Algorithm Implementation

The backend uses **Kahn's topological sorting algorithm** to detect cycles:

```python
def is_dag(nodes: list, edges: list) -> bool:
    # Step 1: Build adjacency list
    adjacency_list = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}
    
    for edge in edges:
        adjacency_list[edge['source']].append(edge['target'])
        in_degree[edge['target']] += 1
    
    # Step 2: Initialize queue with nodes having no incoming edges
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited_count = 0
    
    # Step 3: Process nodes with BFS
    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        for neighbor in adjacency_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # Step 4: If all nodes visited, it's a DAG
    return visited_count == len(nodes)
```

### Algorithm Steps

1. **Build Graph Structure**:
   - Create adjacency list from edges
   - Calculate in-degree (incoming edges) for each node

2. **Initialize Queue**:
   - Add all nodes with in-degree of 0 (no dependencies)

3. **Process Nodes**:
   - Remove node from queue
   - Decrement in-degree of all neighbors
   - Add neighbors with in-degree 0 to queue

4. **Validate Result**:
   - If all nodes were visited → DAG ✅
   - If some nodes remain → Cycle detected ❌

### Time Complexity

- **Time**: O(V + E) where V = nodes, E = edges
- **Space**: O(V + E) for adjacency list and in-degree map

### Example Scenarios

**Valid DAG:**
```
Input → Text → LLM → Output
             ↓
           Logger
```
Result: `is_dag = true`

**Invalid (Cycle):**
```
A → B → C
↑       ↓
←───────┘
```
Result: `is_dag = false`

---

## 👨‍💻 Development Guide

### Project Structure

```
backend/
├── main.py              # FastAPI application
├── venv/                # Virtual environment (gitignored)
├── __pycache__/         # Python cache (gitignored)
└── README.md            # This file
```

### Code Structure

**main.py** contains:
- FastAPI app initialization
- CORS middleware configuration
- Pydantic models (Node, Edge, Pipeline)
- DAG detection function
- POST endpoint handler

### Adding Features

**New endpoint:**
```python
@app.post("/pipelines/execute")
async def execute_pipeline(pipeline: Pipeline):
    # Your execution logic
    return {"status": "executed"}
```

**New validation:**
```python
def validate_node_types(nodes: list) -> bool:
    valid_types = ['customInput', 'customOutput', ...]
    return all(node['type'] in valid_types for node in nodes)
```

### Testing

**Manual testing with curl:**
```bash
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{"nodes": [...], "edges": [...]}'
```

**Interactive testing:**
Visit `http://localhost:8000/docs` for Swagger UI with built-in testing interface.

### CORS Configuration

The backend allows requests from the frontend:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Production considerations:**
- Replace `allow_origins` with specific domains
- Consider authentication/authorization
- Implement rate limiting

---

## 🐛 Troubleshooting

**Server won't start:**
- Check if port 8000 is already in use
- Verify Python version (3.8+)
- Ensure all dependencies are installed

**CORS errors:**
- Verify frontend is running on `http://localhost:3000`
- Check CORS middleware configuration
- Inspect browser console for specific errors

**Invalid DAG results:**
- Test with simple pipelines first
- Verify edge source/target IDs match node IDs
- Check for self-loops or duplicate edges

**Import errors:**
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

---

## 📄 Dependencies

Create a `requirements.txt` file:
```txt
fastapi>=0.104.0
uvicorn>=0.24.0
pydantic>=2.0.0
```

Install all at once:
```bash
pip install -r requirements.txt
```

---

## 📄 License

This project was created for the VectorShift technical assessment.

---

## 👤 Author

Developed as part of VectorShift Backend Engineer Technical Assessment

**Key Implementation:**
- Efficient DAG detection with Kahn's algorithm
- Clean RESTful API design
- Type-safe data validation with Pydantic
- Production-ready CORS configuration
