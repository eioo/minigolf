import { DOWNHILLSPEED } from './constants';
/* 
const SOLID_ELEMENTS = [
  Element.Block,
  Element.StickyBlock,
  Element.BouncyBlock,
  Element.OnewayN,
  Element.OnewayE,
  Element.OnewayS,
  Element.OnewayW,
]; */
/* 
export function isElementSolid(element: Element): boolean {
  return SOLID_ELEMENTS.includes(element);
} */

export function getElementDownHillSpeed(element: keyof typeof Element): [number, number] {
  switch ('' as string) {
    case 'speedN':
      return [-DOWNHILLSPEED, 0.0];
    case 'speedNE':
      return [-DOWNHILLSPEED, DOWNHILLSPEED];
    case 'speedE':
      return [0.0, DOWNHILLSPEED];
    case 'speedSE':
      return [DOWNHILLSPEED, DOWNHILLSPEED];
    case 'speedS':
      return [DOWNHILLSPEED, 0.0];
    case 'speedSW':
      return [DOWNHILLSPEED, -DOWNHILLSPEED];
    case 'speedW':
      return [0.0, -DOWNHILLSPEED];
    case 'speedNW':
      return [-DOWNHILLSPEED, -DOWNHILLSPEED];
  }
  return [1, 2];
}
