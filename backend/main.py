from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict, deque
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs, "*" allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)
class PipelineData(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    def is_dag(nodes, edges):
        adj_list = defaultdict(list)
        in_degree = defaultdict(int)
        
        for edge in edges:
            u = edge['source']
            v = edge['target']
            adj_list[u].append(v)
            in_degree[v] += 1
            if u not in in_degree:
                in_degree[u] = 0
        
        queue = deque([node['id'] for node in nodes if in_degree[node['id']] == 0])
        count = 0
        
        while queue:
            node = queue.popleft()
            count += 1
            for neighbor in adj_list[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        return count == len(nodes)
    
    is_dag_result = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
