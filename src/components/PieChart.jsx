import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
// import { mockPieData as data } from "../data/mockData";
import axios from "axios";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Fecth all user if male
  const [userCountMr, setUserCountMr] = useState(0);
  useEffect(() => {
    const countAllUserMr = async () => {
      try {
        const res = await axios.get(
          "https://charming-goat-flannel-nightgown.cyclic.app/countallusers_mr"
        );
        setUserCountMr(res.data.count);
        console.log(res.data.count);
      } catch (err) {
        console.log(err);
      }
    };
    countAllUserMr();
  }, []);

  //Fecth all user if Female 1
  const [userCountMrs, setUserCountMrs] = useState(0);
  useEffect(() => {
    const countAllUserMrs = async () => {
      try {
        const res = await axios.get(
          "https://charming-goat-flannel-nightgown.cyclic.app/countallusers_mrs"
        );
        setUserCountMrs(res.data.count);
        console.log(res.data.count);
      } catch (err) {
        console.log(err);
      }
    };
    countAllUserMrs();
  }, []);

  //Fecth all user if Female 2
  const [userCountMs, setUserCountMs] = useState(0);
  useEffect(() => {
    const countAllUserMs = async () => {
      try {
        const res = await axios.get(
          "https://charming-goat-flannel-nightgown.cyclic.app/countallusers_ms"
        );
        setUserCountMs(res.data.count);
        console.log(res.data.count);
      } catch (err) {
        console.log(err);
      }
    };
    countAllUserMs();
  }, []);

  const mockPieData = [
  {
    id: "Male",
    label: "Male",
    value: userCountMr,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Female",
    label: "Female",
    value: userCountMrs+userCountMs,
    color: "hsl(162, 70%, 50%)",
  },
];

  return (
    <ResponsivePie
      data={mockPieData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
