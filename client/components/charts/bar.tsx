import { ResponsiveBar, BarItemProps } from "@nivo/bar";

interface BarChartProps {
  colors: string[];
  keys: string[];
  width?: string | number;
  height: string | number;
  data: object[];
  config?: object;
  properties?: BarItemProps;
}

export function Bar(props: BarChartProps) {
  return (
    <div style={{ width: props.width, height: props.height }}>
      <ResponsiveBar
        colors={props.colors}
        data={props.data}
        keys={props.keys}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        {...props.config}
      />
    </div>
  );
}
