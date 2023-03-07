import {EffectCallback, useEffect} from "react";

//eslint-disable-next-line
export const useEffectOnFirstRender = (callback: EffectCallback) => useEffect(callback, []);