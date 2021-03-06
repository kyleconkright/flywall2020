import { ResponsivePie, CommonPieProps, PieDatum } from "@nivo/pie";
import ResponsiveChart from "./chart-responsive-container";

interface PieChartProps extends CommonPieProps {
  data: PieDatum[];
  config?: CommonPieProps;
}

export function Pie(props: PieChartProps) {
  return (
    <ResponsiveChart>
      {({ height, width }) => (
        <div style={{ width, height }}>
          <ResponsivePie
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={3}
            cornerRadius={5}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            slicesLabelsSkipAngle={30}
            slicesLabelsTextColor="#fff"
            animate
            colors={props.colors}
            data={props.data}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000"
                    }
                  }
                ]
              }
            ]}
            {...props.config}
          />
        </div>
      )}
    </ResponsiveChart>
  );
}
