from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses topological sort approach (Kahn's algorithm).
    """
    # Build adjacency list and in-degree count
    adjacency = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize all nodes with in-degree 0
    node_ids = {node['id'] for node in nodes}
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph from edges
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            adjacency[source].append(target)
            in_degree[target] += 1
    
    # Find all nodes with in-degree 0
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    processed_count = 0
    
    # Process nodes
    while queue:
        node = queue.popleft()
        processed_count += 1
        
        # Reduce in-degree for neighbors
        for neighbor in adjacency[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes were processed, it's a DAG
    return processed_count == len(node_ids)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
