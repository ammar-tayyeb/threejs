import { color } from 'framer-motion'
;
import { proxy } from 'valtio';
const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture : true,
  isFullTexture : true,
  logoDecal : './threejs.png',
  fullDecal : './threejs.png',
  decalSize : 15,
  decalPosition : 0,
});
export default state ;
