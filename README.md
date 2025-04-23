# Claude Custom UI

A custom UI component library built with Material UI, React, and Storybook. This library provides customized components that can be shared between users and deployed as packages.

## Features

- Built on Material UI for a solid foundation
- Customized styling with SCSS and styled-components
- Component showcase with Storybook
- TypeScript for type safety
- Easy to use and integrate into existing projects

## Theme Colors

- Primary: #e9501f
- Secondary: #313131
- Tertiary: #ffc107 (optional)

## Installation

```bash
yarn add claude-custom-ui
```

## Development

```bash
# Install dependencies
yarn

# Run Storybook
yarn storybook

# Build the library
yarn build
```

## Components

The library includes the following components:

1. **Autocomplete** (Input component)
   - Customized Material UI Autocomplete with enhanced styling
   - Improved focus states and animations
   - Various size options

2. **Avatar** (Data Display component)
   - Customized Material UI Avatar with additional features
   - Status indicators (online, offline, away, busy)
   - Tooltip support
   - Custom color themes and sizes

3. **Alert** (Feedback component)
   - Customized Material UI Alert with additional features
   - Different size variants
   - Rounded option
   - Closable alerts with animations

4. **Accordion** (Surface component)
   - Customized Material UI Accordion with enhanced styling
   - Size variants (small, medium, large)
   - Rounded option
   - Custom header color support
   - Smooth animations and hover effects

## Usage

```jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Avatar, Alert, Accordion } from 'claude-custom-ui';

const App = () => {
  return (
    <div>
      <h1>Claude Custom UI Components</h1>
      
      <h2>Autocomplete Example</h2>
      <Autocomplete
        options={['Option 1', 'Option 2', 'Option 3']}
        label="Select an option"
      />
      
      <h2>Avatar Example</h2>
      <Avatar alt="User" status="online" />
      
      <h2>Alert Example</h2>
      <Alert 
        severity="success" 
        title="Success" 
        content="Operation completed successfully!"
      />
      
      <h2>Accordion Example</h2>
      <Accordion 
        title="Expandable Section" 
        content="This is the content inside the accordion."
        headerColor="#e9501f"
      />
    </div>
  );
};

export default App;
```

## License

MIT