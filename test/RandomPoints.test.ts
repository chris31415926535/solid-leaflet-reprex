import {describe, expect, test} from '@jest/globals';

import { RandomPoints } from '../src/data/RandomPoints';

describe('Generating random points works', () => {
    test('Gives expected number of points', () => {
        expect(RandomPoints(1)).toHaveLength(1);
        expect(RandomPoints(5)).toHaveLength(5);
        expect(RandomPoints(10)).toHaveLength(10);
        expect(RandomPoints(100)).toHaveLength(100);
    })

    test('Gives input lat/lon back if radius is zero', () => {
        expect(RandomPoints(1, 45, -75, 0)[0].lat).toEqual(45);
        expect(RandomPoints(1, 45, -75, 0)[0].lon).toEqual(-75);
    })


})


