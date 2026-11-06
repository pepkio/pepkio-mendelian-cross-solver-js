# Pepkio Mendelian Cross Solver

Call the Pepkio mendelian-cross-solver REST API from TypeScript or Node.js to generate Punnett squares, offspring ratios, and step-by-step walkthroughs for Mendelian and non-Mendelian crosses.

# What It Does

Genetics teaching and homework verification need Punnett grids for complete dominance, incomplete dominance, codominance, ABO blood types, and X-linked traits—each with different notation and ratio rules. Rebuilding gamete tables and phenotype mapping in a notebook for every cross is tedious and easy to get wrong.

This package submits parent genotypes and a `dominance_mode` to the same Pepkio Tools engine as the hosted [Mendelian Cross Solver](https://www.pepkio.com/tools/mendelian-cross-solver) web calculator. It returns filled grids, genotype and phenotype ratios, walkthrough steps, warnings, and shareable run permalinks.

Programmatic runs require a network connection and a Pepkio API key. Calculations are not bundled for offline use.

# Features

- Five dominance modes: `complete`, `incomplete`, `codominant`, `multiple_alleles` (ABO only in MVP), `sex_linked`
- Custom phenotype labels; ABO allele hierarchy; sex-linked recessive or dominant trait labeling
- Manifest examples: `complete_monohybrid`, `incomplete_snapdragon`, `abo_cross`, `sex_linked_hemophilia`, `codominant_roan`, `dihybrid_pea`, `sex_linked_dominant`
- CLI: `pepkio-mendelian-cross-solver manifest` and `run`
- Configuration via `PEPKIO_API_KEY`, `LOCAL_PEPKIO_API_KEY`, and `PEPKIO_API_BASE_URL`

# Installation

```bash
npm install pepkio-mendelian-cross-solver
```

Set an API key with **tools:run** scope before calling `run()`:

```bash
export PEPKIO_API_KEY="your-key"
```

Create a key in your [Pepkio account API keys](https://www.pepkio.com/account/api-keys) settings.

# Quick Example

```typescript
import { PepkioClient } from "pepkio-mendelian-cross-solver";

const client = new PepkioClient({ apiKey: process.env.PEPKIO_API_KEY });
const inp = await client.getExampleInput("abo_cross");
const result = await client.run(inp);
console.log(result.permalink);
```

CLI:

```bash
npx pepkio-mendelian-cross-solver run --example complete_monohybrid
```

Manifest inspection does not require an API key.

# Typical Use Cases

- Verify monohybrid Aa × Aa (3:1) and dihybrid AaBb × AaBb (9:3:3:1) ratios
- Model ABO blood type crosses (I^A i × I^B i)
- Set up X-linked recessive or dominant Punnett squares with standard notation
- Incomplete dominance (snapdragon) and codominance (roan cattle) homework checks
- Automated genetics problem sets in scripts or CI

# Scientific Background

Monohybrid crosses under complete dominance yield a 3:1 phenotype ratio (Aa × Aa). Incomplete dominance and codominance both give 1:2:1 phenotype ratios when heterozygotes differ from homozygotes. ABO crosses use multiple alleles with I^A, I^B, and i. Sex-linked traits use X-chromosome notation with Parent 1 female and Parent 2 male.

# Web Application

For researchers who prefer a graphical interface, an interactive [Mendelian Cross Solver](https://www.pepkio.com/tools/mendelian-cross-solver) is available in the browser.

The web interface adds a live grid, 28 curated textbook presets, collapsible walkthroughs, PNG/SVG export, copy-grid-as-table, shareable permalinks, and print-friendly display.

# Documentation and Resources

Source repository: [github.com/pepkio/pepkio-mendelian-cross-solver-js](https://github.com/pepkio/pepkio-mendelian-cross-solver-js)

Python client: [github.com/pepkio/pepkio-mendelian-cross-solver](https://github.com/pepkio/pepkio-mendelian-cross-solver)

Web calculator: [pepkio.com/tools/mendelian-cross-solver](https://www.pepkio.com/tools/mendelian-cross-solver)

# About Pepkio

Pepkio develops software tools and provides bioinformatics analysis services for life science research. See [pepkio.com](https://www.pepkio.com/) for additional calculators and [analysis services](https://www.pepkio.com/cro).

# Keywords

Punnett square, Mendelian cross, monohybrid cross, dihybrid cross, incomplete dominance, codominance, ABO blood type cross, X-linked inheritance, sex-linked Punnett square, genetics ratio calculator, hemophilia cross, snapdragon flower color, pepkio-mendelian-cross-solver, TypeScript Punnett square API, REST API genetics, phenotype ratio 3:1, dihybrid 9:3:3:1, Node.js genetics calculator

A semantic, AI-native version of this document in the K2F format is available at https://k2f.dev (https://k2f.dev/v/da5fd944eda1c9a2fbfcc5333c2702f4e457fb96336e0374452e4843aa7c80d6)
