# 📦 n8n-nodes-gls: GLS Points Finder Node

[![NPM version][npm-version-image]][npm-url]
[![License][license-image]][license-url]

This repository contains a custom n8n node that helps you find the nearest GLS Points based on a given Geo Coordinates and limit. The node integrates with the official GLS Parcel Shop Management API.

## 🚀 Features

- Find nearby GLS Points based on Geo Coordinates
- Limit the number of results returned
- Easy integration with your n8n workflows

## 📋 Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 16.0.0)
- [n8n](https://n8n.io/) (>= 0.214.0)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## 🔧 Installation

### Setting Up Node.js with NVM

Since n8n is built on Node.js, we'll need to have the correct version installed. n8n requires Node.js version 22.15.0, and the most flexible way to manage Node.js versions is through NVM (Node Version Manager).

NVM allows us to install and switch between different Node.js versions effortlessly. To install NVM, we can use the following command:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

After installing NVM, we can install and use the specific Node.js version that n8n requires. This approach is particularly useful if we work with multiple Node.js projects that require different versions.

```bash
nvm install v22.15.0
nvm use v22.15.0
```

### Local Installation: Direct Integration

For developers who prefer direct installation or want to integrate n8n into an existing Node.js environment, we can install n8n globally using npm:

```bash
npm install n8n -g
npm install -g pnpm@latest-10
```

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/GLS-IT-Service/n8n-nodes-gls.git n8n-nodes-gls

# Navigate to the project directory
cd n8n-nodes-gls

# Install dependencies
pnpm install
```

## 📁 Project Structure

The project is organized as follows:

```
n8n-nodes-gls/
├── credentials/
│   └── PsmApi.credentials.ts   # API credentials configuration
├── nodes/
│   └── Gls/
│       ├── Gls.node.ts         # Main node implementation
│       ├── GenericFunctions.ts # Shared utility functions
│       └── gls.png             # Node icon
├── index.ts                    # Main entry point
├── package.json                # Project metadata and dependencies
└── tsconfig.json               # TypeScript configuration
```

## 🛠️ Development

### Building the Node

To build the node, run:

```bash
# Build the node
pnpm run build
```

This compiles the TypeScript code and copies the icon files to the `dist` directory.

### Running Tests

```bash
pnpm test
```

## 📦 Deployment

n8n supports custom nodes through the custom extensions directory. To deploy your node:

### 1. Create a Custom Extensions Directory

```bash
mkdir -p ~/.n8n/custom/n8n-nodes-gls
```

### 2. Copy the Built Node

```bash
cp -R dist/* ~/.n8n/custom/n8n-nodes-gls
```

### 3. Configure n8n

```bash
# Set environment variables for n8n
export N8N_CUSTOM_EXTENSIONS="~/.n8n/custom"
# For development purposes only
export N8N_SECURE_COOKIE=false
```

```bash
# Link your node to n8n
pnpm link

# In your n8n installation directory (~/.n8n/custom)
pnpm link n8n-nodes-gls
```

 ### 4.Restart n8n

Restart your n8n instance for the changes to take effect.

## 🔌 Usage

1. In your n8n workflow, add a new node and search for "GLS Point"
2. Configure the node with your API credentials
3. Enter the required parameters (address, country code, results limit)
4. Execute the workflow to retrieve nearby GLS Points

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

## 👥 Contributing

Contributions are welcome! Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing to the project.

[npm-url]: https://www.npmjs.com/package/n8n-nodes-psm
[npm-version-image]: https://img.shields.io/npm/v/n8n-nodes-psm.svg
[license-image]: https://img.shields.io/npm/l/n8n-nodes-psm.svg
[license-url]: LICENSE.md
