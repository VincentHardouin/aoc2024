import type { Day } from './Day.ts';

export class DayImpl implements Day {
  private readonly input: string[][];

  constructor(input: string) {
    this.input = this.parseInput(input);
  }

  parseInput(input: string) {
    return input
      .trim()
      .split('\n')
      .map((line: string) => {
        return line
          .split('-');
      });
  }

  partOne() {
    const graph = getGraph(this.input);
    return trios(graph)
      .filter(trio =>
        trio.some(node => node.startsWith('t')),
      )
      .length;
  }

  partTwo() {
    const graph = getGraph(this.input);
    const maxClique = new Set<string>();
    bronKerbosch(new Set(), new Set(graph.keys()), new Set(), graph, maxClique);
    return [...maxClique].sort().join(',');
  }
}

function getGraph(input: string[][]): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();

  input.forEach(([a, b]) => {
    if (!graph.has(a))
      graph.set(a, new Set());
    if (!graph.has(b))
      graph.set(b, new Set());

    graph.get(a)!.add(b);
    graph.get(b)!.add(a);
  });

  return graph;
}

function trios(graph: Map<string, Set<string>>): string[][] {
  const trios: string[][] = [];

  for (const [node, neighbors] of graph) {
    const neighborArray = [...neighbors];

    for (let i = 0; i < neighborArray.length; i++) {
      for (let j = i + 1; j < neighborArray.length; j++) {
        const [n1, n2] = [neighborArray[i], neighborArray[j]];
        if (graph.get(n1)?.has(n2)) {
          const trio = [node, n1, n2].sort();
          trios.push(trio);
        }
      }
    }
  }

  return [...new Set(trios.map(trio => trio.join(',')))]
    .map(trio =>
      trio.split(','),
    );
};

function bronKerbosch(
  clique: Set<string>,
  options: Set<string>,
  excluded: Set<string>,
  graph: Map<string, Set<string>>,
  maxClique: Set<string>,
) {
  if (options.size === 0 && excluded.size === 0) {
    if (clique.size > maxClique.size) {
      maxClique.clear();
      clique.forEach(node => maxClique.add(node));
    }
    return;
  }

  const arr = Array.from(options);
  for (const vertex of arr) {
    clique.add(vertex);
    const neighbors = graph.get(vertex) || new Set();
    bronKerbosch(
      clique,
      new Set([...options].filter(v => neighbors.has(v))),
      new Set([...excluded].filter(v => neighbors.has(v))),
      graph,
      maxClique,
    );
    clique.delete(vertex);
    options.delete(vertex);
    excluded.add(vertex);
  }
};
