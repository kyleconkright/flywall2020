import { ResponsiveNetwork, NetworkCanvasProps } from "@nivo/network";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

interface Props {
  width?: string | number;
  height: string | number;
  links: any[];
  nodes: any[];
  config?: object;
}

// LInk
// {
//     "source": "0",
//     "target": "1",
//     "distance": 50
//   },

// nodes
// {
//     "id": "14.5",
//     "radius": 4,
//     "depth": 2,
//     "color": "rgb(232, 193, 160)"
//   }

export function Network(props: Props) {
  return (
    <div style={{ width: props.width, height: props.height }}>
      <ResponsiveNetwork
        links={props.links}
        nodes={props.nodes}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        repulsivity={6}
        iterations={200}
        nodeColor={function(t) {
          return t.color;
        }}
        nodeBorderWidth={1}
        nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
        linkThickness={function(t) {
          return 2 * (2 - t.source.depth);
        }}
        motionStiffness={160}
        motionDamping={12}
        {...props.config}
      />
    </div>
  );
}
