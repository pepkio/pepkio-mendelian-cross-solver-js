export const mockManifest: Record<string, unknown> = {
  tool_id: "mendelian-cross-solver",
  title: "Mendelian Cross Solver",
  execution_mode: "sync",
  examples: [
    {
      name: "complete_monohybrid",
      input: {
        dominance_mode: "complete",
        parent1_genotype: "Aa",
        parent2_genotype: "Aa",
        custom_phenotypes: { dominant: "Dominant", recessive: "Recessive" },
      },
    },
    {
      name: "abo_cross",
      input: {
        dominance_mode: "multiple_alleles",
        parent1_genotype: "I^A i",
        parent2_genotype: "I^B i",
      },
    },
  ],
};

export const mockRunResponse: Record<string, unknown> = {
  run_id: "run_test123",
  status: "completed",
  result: {
    can_compute: true,
    grid: [],
    genotype_ratios: {},
    phenotype_ratios: { ratio: "3:1" },
    walkthrough: [],
    warnings: [],
  },
  error: null,
  result_url: "https://tools.pepkio.com/api/tools/v1/runs/run_test123",
  permalink: "https://tools.pepkio.com/r/run_test123",
};
