# Pepkio Mendelian Cross Solver (JavaScript/TypeScript)

Call the Pepkio Mendelian Cross Solver REST API from Node.js with typed ESM imports and a CLI.

## Overview

The Pepkio Mendelian Cross Solver builds Punnett squares for complete dominance, incomplete dominance, codominance, multiple alleles (ABO blood types), and sex-linked traits.

This package provides a client library and CLI for the same calculation engine used by the hosted web application at [https://www.pepkio.com/tools/mendelian-cross-solver](https://www.pepkio.com/tools/mendelian-cross-solver).

## Features

- **Inheritance Modes:** complete, incomplete, codominant, multiple_alleles (ABO), sex_linked
- **Genotype Ratios & Phenotype Ratios:** Detailed probability breakdowns and formatted ratios
- **Walkthrough Steps:** Step-by-step breakdown of gamete formation and grid filling
- **TypeScript First:** Complete TypeScript typings and schema validation

## Installation

```bash
npm install pepkio-mendelian-cross-solver
```

## Quickstart

```javascript
import { PepkioClient } from "pepkio-mendelian-cross-solver";

const client = new PepkioClient();
const manifest = await client.getManifest();
console.log(`Tool ID: ${manifest.tool_id}`);
```

## License

MIT License. Copyright (c) 2026 Pepkio.
