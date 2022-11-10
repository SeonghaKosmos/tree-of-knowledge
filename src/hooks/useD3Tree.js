import React from 'react';
import * as d3 from 'd3';

export const useD3Tree = (renderD3Tree, dependencies) => {

    React.useEffect(() => {
        renderD3Tree(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}