import { ResponsiveSunburst } from "@nivo/sunburst";

interface SunburstChartProps {
  width?: string | number;
  height: string | number;
  data: object;
  config?: any;
  colors?: string[] | { scheme: string };
}

export function Sunburst(props: SunburstChartProps) {
  return (
    <div style={{ width: props.width, height: props.height }}>
      <ResponsiveSunburst
        data={props.data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={2}
        borderWidth={1}
        showTooltip
        colors={props.colors}
        childColor={d => {
          return d.color;
        }}
        animate
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
      />
    </div>
  );
}
