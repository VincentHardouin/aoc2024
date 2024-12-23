import { describe, expect, it } from 'vitest';
import { DayImpl } from './day23.ts';

const sample = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
`;

describe('day23', () => {
  describe('partOne', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partOne()).toEqual(7);
    });
  });

  describe('partTwo', () => {
    it('should return', () => {
      expect(new DayImpl(sample).partTwo()).toEqual('co,de,ka,ta');
    });
  });
});
