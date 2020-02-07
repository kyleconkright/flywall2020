import { ResponsiveWaffle, WaffleCommonProps, WaffleDatum } from "@nivo/waffle";

interface WaffleChartProps extends WaffleCommonProps {
  width?: string | number;
  height: string | number;
  data: WaffleDatum[];
  total: number;
  config?: any;
}

export function Waffle(props: WaffleChartProps) {
  return (
    <div style={{ width: props.width, height: props.height }}>
      <ResponsiveWaffle
        data={props.data}
        total={props.total}
        margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
        colors={props.colors}
        borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={11}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            justify: false,
            translateX: -100,
            translateY: 0,
            itemsSpacing: 4,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 1,
            itemTextColor: "#777",
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                  itemBackground: "#f7fafb"
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
