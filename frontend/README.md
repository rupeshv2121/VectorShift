# VectorShift Frontend - Visual Pipeline Builder

A modern, visual pipeline builder built with React and ReactFlow that enables users to create, validate, and manage data processing workflows through an intuitive drag-and-drop interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Architecture](#architecture)
- [Components Documentation](#components-documentation)
- [Node System](#node-system)
- [Styling System](#styling-system)
- [State Management](#state-management)
- [Development Guide](#development-guide)

---

## 🎯 Overview

This application was developed as part of the VectorShift technical assessment, implementing a complete visual pipeline builder with the following key accomplishments:

### ✅ Part 1: Node Abstraction
- Created a reusable `BaseNode` component that eliminates code duplication
- Refactored 4 existing nodes to use the abstraction
- Built 5 new demonstration nodes (Number, Delay, Logger, Condition, Merge)
- Reduced codebase by ~300+ lines through component reusability

### ✅ Part 2: Styling
- Implemented a unified, professional design system
- Created reusable UI components (`CustomDropdown`, `StyledInput`)
- Consistent color theming across all nodes
- Modern animations, hover effects, and visual feedback
- Zero external CSS dependencies (pure inline styles)

### ✅ Part 3: Text Node Logic
- Dynamic textarea that auto-resizes based on content
- Variable extraction using regex pattern matching (`{{ variableName }}`)
- Dynamic handle creation for detected variables
- Visual feedback showing all detected variables

### ✅ Part 4: Backend Integration
- Complete REST API integration with FastAPI backend
- Pipeline validation with DAG (Directed Acyclic Graph) detection
- Professional result modal with success/error states
- Real-time pipeline analysis (node count, edge count, DAG status)

---

## ✨ Features

### Visual Pipeline Builder
- **Drag & Drop Interface**: Intuitive node placement from palette
- **9 Node Types**: Input, Output, Text, LLM, Number, Delay, Logger, Condition, Merge
- **Visual Connections**: Click and drag to connect node handles
- **Real-time Validation**: Instant feedback on pipeline structure
- **MiniMap**: Bird's-eye view of complex pipelines
- **Grid Snapping**: Precise node alignment

### Node Capabilities
- **Input Node**: Pass data into workflows (Text/File types)
- **Output Node**: Extract results from workflows
- **Text Node**: Template with variable support (`{{ var }}`)
- **LLM Node**: Language model processing
- **Number Node**: Mathematical operations (Add, Subtract, Multiply, Divide)
- **Delay Node**: Time-based delays (ms, s, m)
- **Logger Node**: Debug output with log levels
- **Condition Node**: Conditional branching (true/false outputs)
- **Merge Node**: Combine multiple data streams

### User Experience
- **Professional Icons**: React-icons library integration
- **Smooth Animations**: CSS transitions and keyframe animations
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error messages
- **Keyboard Shortcuts**: Delete/Backspace to remove nodes
- **Responsive Design**: Works on various screen sizes

---

## 🛠 Tech Stack

### Core
- **React 18.2.0**: UI library
- **ReactFlow 11.8.3**: Flow diagram library
- **Zustand**: Lightweight state management
- **React Icons 5.5.0**: Professional icon library

### Development
- **Create React App**: Build tooling
- **Node.js**: Runtime environment
- **npm**: Package manager

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html              # HTML entry point
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # SEO crawling rules
├── src/
│   ├── components/
│   │   ├── CustomDropdown.jsx  # Reusable dropdown with styling
│   │   ├── ResultModal.js      # Pipeline validation results modal
│   │   └── StyledInput.jsx     # Reusable input component
│   ├── nodes/
│   │   ├── BaseNode.jsx        # ⭐ Base abstraction for all nodes
│   │   ├── inputNode.js        # Input data source node
│   │   ├── outputNode.js       # Output data sink node
│   │   ├── textNode.js         # Text template with variables
│   │   ├── llmNode.js          # LLM processing node
│   │   ├── numberNode.js       # Numeric operations
│   │   ├── delayNode.js        # Time-based delay
│   │   ├── loggerNode.js       # Debug logging
│   │   ├── conditionNode.js    # Conditional branching
│   │   └── mergeNode.js        # Data stream merging
│   ├── App.js                  # Main application component
│   ├── ui.js                   # ReactFlow canvas & pipeline UI
│   ├── toolbar.js              # Node palette toolbar
│   ├── submit.js               # Submit button & API integration
│   ├── draggableNode.js        # Draggable node palette items
│   ├── store.js                # Zustand state management
│   ├── index.js                # React entry point
│   └── index.css               # Global CSS styles
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 14+ and npm installed
- Backend server running on `http://localhost:8000`

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Application runs at: `http://localhost:3000`
   - Auto-reloads on file changes

### Production Build

```bash
npm run build
```
- Creates optimized production build in `build/` folder
- Minified and ready for deployment

---

## 🏗 Architecture

### Component Hierarchy

```
App
├── PipelineToolbar (Node Palette)
│   └── DraggableNode × 9
├── PipelineUI (ReactFlow Canvas)
│   ├── InputNode (using BaseNode)
│   ├── OutputNode (using BaseNode)
│   ├── TextNode (using BaseNode)
│   ├── LLMNode (using BaseNode)
│   ├── NumberNode (using BaseNode)
│   ├── DelayNode (using BaseNode)
│   ├── LoggerNode (using BaseNode)
│   ├── ConditionNode (using BaseNode)
│   ├── MergeNode (using BaseNode)
│   ├── Background
│   ├── Controls
│   └── MiniMap
└── SubmitButton
    └── ResultModal
```

### Data Flow

1. **Node Creation**: Drag from toolbar → Drop on canvas → `addNode` action
2. **Connection**: Click handle → Drag → Drop on target → `onConnect` action
3. **State Update**: Zustand store updates → React re-renders
4. **Submission**: Click Submit → Fetch API → Backend validates → Show results

---

## 📚 Components Documentation

### BaseNode Component

The cornerstone of the node system. Provides consistent layout, styling, and functionality.

**Location:** `src/nodes/BaseNode.jsx`

**Props:**
- `title` (string): Node header title
- `description` (string): Subtitle text
- `accent` (string): Color theme (blue, green, teal, purple, orange, pink, yellow, red, gray)
- `icon` (ReactNode): Icon component from react-icons
- `inputs` (array): Input handles `[{ id: string }]`
- `outputs` (array): Output handles `[{ id: string }]`
- `children` (ReactNode): Custom node content

**Example:**
```jsx
<BaseNode
  title="Custom Node"
  description="Does something cool"
  accent="purple"
  icon={<FaIcon />}
  inputs={[{ id: `${id}-input` }]}
  outputs={[{ id: `${id}-output` }]}
>
  <YourCustomContent />
</BaseNode>
```

**Features:**
- Automatic handle positioning (left for inputs, right for outputs)
- Consistent header styling with icon support
- Action buttons (expand, settings, close)
- Theme-based coloring system
- Responsive layout

### CustomDropdown Component

Styled dropdown with theme colors and professional animations.

**Location:** `src/components/CustomDropdown.jsx`

**Props:**
- `value` (string): Selected value
- `options` (array): Available options
- `onChange` (function): Change handler
- `accentColor` (string): Primary color
- `accentColorLight` (string): Light background
- `accentColorBorder` (string): Border color
- `label` (string): Field label

**Example:**
```jsx
<CustomDropdown
  value={selectedType}
  options={['Text', 'File']}
  onChange={(val) => setSelectedType(val)}
  accentColor="#10b981"
  accentColorLight="#f0fdf9"
  accentColorBorder="#86efac"
  label="Type"
/>
```

### StyledInput Component

Consistent input styling with focus states.

**Location:** `src/components/StyledInput.jsx`

**Props:**
- `type` (string): Input type (text, number, etc.)
- `value` (any): Input value
- `onChange` (function): Change handler
- `label` (string): Field label
- `placeholder` (string): Placeholder text
- `accentColor` (string): Focus color
- `required` (boolean): Required field indicator

**Example:**
```jsx
<StyledInput
  type="number"
  value={delay}
  onChange={(e) => setDelay(e.target.value)}
  label="Delay Duration"
  placeholder="Enter delay"
  accentColor="#ef4444"
/>
```

### ResultModal Component

Displays pipeline validation results with visual feedback.

**Location:** `src/components/ResultModal.js`

**Features:**
- Success/Error states with colored icons
- Displays: num_nodes, num_edges, is_dag
- Animated entrance
- Click outside to close
- Professional styling with glassmorphism

---

## 🎨 Node System

### Creating a New Node

1. **Create node file** in `src/nodes/`
2. **Import BaseNode** and any icons
3. **Define component** with id and data props
4. **Use BaseNode** with appropriate props
5. **Add custom content** inside BaseNode
6. **Register** in `ui.js` nodeTypes
7. **Add to toolbar** in `toolbar.js`
8. **Add colors** to `draggableNode.js`

**Template:**
```jsx
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { FaIcon } from 'react-icons/fa';

export const CustomNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      title="Custom"
      description="Your description"
      accent="blue"
      icon={<FaIcon />}
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
    </BaseNode>
  );
};
```

### Available Node Types

| Node | Purpose | Inputs | Outputs | Accent |
|------|---------|--------|---------|--------|
| Input | Data source | 0 | 1 | Green |
| Output | Data sink | 1 | 0 | Blue |
| Text | Template with variables | Dynamic | 1 | Teal |
| LLM | AI processing | 2 | 1 | Purple |
| Number | Math operations | 1 | 1 | Orange |
| Delay | Time delay | 1 | 1 | Red |
| Logger | Debug output | 1 | 1 | Gray |
| Condition | Conditional branching | 1 | 2 | Yellow |
| Merge | Combine streams | 3 | 1 | Pink |

### Node Implementation Details

#### Text Node
- Auto-resizing textarea
- Variable extraction: `{{ variableName }}`
- Regex pattern: `/\{\{(\w+)\}\}/g`
- Dynamic input handles created for each variable

#### Condition Node
- Boolean expression input
- Two outputs: true and false paths
- Use for branching logic in pipelines

#### Merge Node
- Combines up to 3 input streams
- Single output with merged data
- Useful for aggregating parallel processes

---

## 🎨 Styling System

### Design Principles
- **Consistency**: All components follow the same visual language
- **Accessibility**: Proper contrast ratios and focus states
- **Performance**: Inline styles with no CSS-in-JS overhead
- **Maintainability**: Reusable components reduce duplication

### Color Palette

```javascript
{
  blue: { border: '#3b82f6', header: '#3b82f6', bg: '#f8faff' },
  green: { border: '#10b981', header: '#10b981', bg: '#f0fdf9' },
  purple: { border: '#a855f7', header: '#a855f7', bg: '#faf5ff' },
  orange: { border: '#f97316', header: '#f97316', bg: '#fff7ed' },
  pink: { border: '#ec4899', header: '#ec4899', bg: '#fdf2f8' },
  teal: { border: '#14b8a6', header: '#14b8a6', bg: '#f0fdfa' },
  red: { border: '#ef4444', header: '#ef4444', bg: '#fef2f2' },
  yellow: { border: '#eab308', header: '#eab308', bg: '#fefce8' },
  gray: { border: '#6b7280', header: '#6b7280', bg: '#f9fafb' }
}
```

### Animation System
- **Fade In**: Modal entrance (`@keyframes fadeIn`)
- **Slide In**: Modal content (`@keyframes slideIn`)
- **Spin**: Loading indicators (`@keyframes spin`)
- **Hover Effects**: Scale and shadow transitions

---

## 🔄 State Management

### Zustand Store (`store.js`)

**State:**
- `nodes`: Array of all nodes in the pipeline
- `edges`: Array of all connections
- `nodeIDs`: Counter for generating unique IDs

**Actions:**
- `getNodeID(type)`: Generate unique node ID
- `addNode(node)`: Add new node to canvas
- `onNodesChange(changes)`: Handle node updates
- `onEdgesChange(changes)`: Handle edge updates
- `onConnect(connection)`: Create new connection

**Usage:**
```javascript
const { nodes, edges, addNode } = useStore(selector, shallow);
```

---

## 👨‍💻 Development Guide

### Available Scripts

#### `npm start`
Runs the app in development mode.
- Opens at: `http://localhost:3000`
- Hot reload enabled
- Lint errors shown in console

#### `npm test`
Launches test runner in interactive watch mode.

#### `npm run build`
Creates production build in `build/` folder.
- Minified and optimized
- Filenames include hashes
- Ready for deployment

#### `npm run eject`
⚠️ **One-way operation!**
Ejects from Create React App for full configuration control.

### Code Standards

- **Components**: Use functional components with hooks
- **Styling**: Inline styles for consistency
- **State**: Zustand for global, useState for local
- **Props**: Destructure and provide defaults
- **Icons**: Use react-icons library
- **File naming**: camelCase for components

### Adding Features

1. **Plan the component structure**
2. **Create reusable components if needed**
3. **Follow existing patterns** (BaseNode, CustomDropdown, etc.)
4. **Test thoroughly** with different node combinations
5. **Update documentation** if adding new concepts

### Common Tasks

**Add a new node:**
1. Create file in `src/nodes/`
2. Use BaseNode abstraction
3. Register in `ui.js` nodeTypes
4. Add to `toolbar.js`
5. Add colors to `draggableNode.js` and `ui.js` MiniMap

**Modify BaseNode:**
- Edit `src/nodes/BaseNode.jsx`
- Changes affect ALL nodes automatically

**Change color scheme:**
- Update `BaseNode.jsx` accentColors object
- Update `draggableNode.js` colorMap
- Update `ui.js` MiniMap colorMap

---

## 📝 API Integration

### Endpoint
```
POST http://localhost:8000/pipelines/parse
```

### Request Body
```json
{
  "nodes": [
    { "id": "input-0", "type": "customInput", ... },
    { "id": "output-1", "type": "customOutput", ... }
  ],
  "edges": [
    { "source": "input-0", "target": "output-1", ... }
  ]
}
```

### Response
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

### Error Handling
- Network errors caught and displayed in modal
- Backend validation errors shown to user
- Loading states prevent double submission

---

## 🐛 Troubleshooting

**Nodes not draggable:**
- Check `nodeTypes` registration in `ui.js`
- Verify `draggableNode.js` onDragStart function

**Connections not working:**
- Ensure handle IDs are unique
- Check `onConnect` in `store.js`
- Verify ReactFlow configuration

**Styling issues:**
- Check inline styles syntax
- Verify color values in accentColors
- Ensure no conflicting CSS

**Icons not showing:**
- Verify react-icons import statements
- Check icon component names
- Ensure library is installed: `npm install react-icons`

**Backend connection errors:**
- Verify backend is running on `http://localhost:8000`
- Check CORS configuration
- Inspect network tab for error details

---

## 📄 License

This project was created for the VectorShift technical assessment.

---

## 👤 Author

Developed as part of VectorShift Frontend Engineer Technical Assessment

**Key Achievements:**
- 300+ lines of code eliminated through abstraction
- 9 fully functional node types
- Complete backend integration
- Professional UI/UX design
- Zero redundancy in codebase
