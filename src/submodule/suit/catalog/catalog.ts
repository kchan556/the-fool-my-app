import type { Catalog } from '../types';
import _master from './catalog.json';

// カタログの基本データを作成
const master = new Map<string, Catalog>();
// Process each version of the master catalog
_master.forEach((c: Catalog) => master.set(c.id, c));

export default master;
