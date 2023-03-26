import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import axios from "axios";
// import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {

  //Fecth all user
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    const countAllUser = async () => {
      try {
        const res = await axios.get("https://charming-goat-flannel-nightgown.cyclic.app/countallusers2");
        setUserCount(res.data.count);
        console.log(res.data.count)
      } catch (err) {
        console.log(err);
      }
    };
    countAllUser();
  }, []);

  //Fecth all user active
  const [userCountActive, setUserCountActive] = useState(0);
  useEffect(() => {
    const countAllUserActive = async () => {
      try {
        const res = await axios.get("https://charming-goat-flannel-nightgown.cyclic.app/countallusers_active");
        setUserCountActive(res.data.count);
        console.log(res.data.count)
      } catch (err) {
        console.log(err);
      }
    };
    countAllUserActive();
  }, []); 

  //Fecth all user reg today
  const [userUnActive, setUserCountRegtoday] = useState(0);
  useEffect(() => {
    const countAllUserRegtoday = async () => {
      try {
        const res = await axios.get(
          "https://charming-goat-flannel-nightgown.cyclic.app/countallusers_unactive"
        );
        setUserCountRegtoday(res.data.count);
        console.log(res.data.count);
      } catch (err) {
        console.log(err);
      }
    };
    countAllUserRegtoday();
  }, []);

  // //Fecth all user if male
  // const [userCountMr, setUserCountMr] = useState(0);
  // useEffect(() => {
  //   const countAllUserMr = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://charming-goat-flannel-nightgown.cyclic.app/countallusers_mr"
  //       );
  //       setUserCountMr(res.data.count);
  //       console.log(res.data.count);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   countAllUserMr();
  // }, []);

  // //Fecth all user if Female 1
  // const [userCountMrs, setUserCountMrs] = useState(0);
  // useEffect(() => {
  //   const countAllUserMrs = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://charming-goat-flannel-nightgown.cyclic.app/countallusers_mrs"
  //       );
  //       setUserCountMrs(res.data.count);
  //       console.log(res.data.count);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   countAllUserMrs();
  // }, []);

  // //Fecth all user if Female 2
  // const [userCountMs, setUserCountMs] = useState(0);
  // useEffect(() => {
  //   const countAllUserMs = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://charming-goat-flannel-nightgown.cyclic.app/countallusers_ms"
  //       );
  //       setUserCountMs(res.data.count);
  //       console.log(res.data.count);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   countAllUserMs();
  // }, []);

  const mockBarData = [
    {
      statistic: "Total_Users",
      "hot dog": 50,
      "hot dogColor": "hsl(229, 70%, 50%)",
      Total_Users: userCount,
      Total_UsersColor: "hsl(340, 70%, 50%)",
    },
    {
      statistic: "Checked_in",
      "hot dog": 50,
      "hot dogColor": "hsl(229, 70%, 50%)",
      Checked_in: userCountActive,
      Checked_inColor: "hsl(340, 70%, 50%)",
    },
    {
      statistic: "Checked_out",
      "hot dog": 133,
      "hot dogColor": "hsl(257, 70%, 50%)",
      Checked_out: userUnActive,
      Checked_outColor: "hsl(326, 70%, 50%)",
    },
    // {
    //   statistic: "Male",
    //   "hot dog": 55,
    //   "hot dogColor": "hsl(307, 70%, 50%)",
    //   Male: userCountMr,
    //   MaleColor: "hsl(111, 70%, 50%)",
    // },
    // {
    //   statistic: "Female",
    //   "hot dog": 109,
    //   "hot dogColor": "hsl(72, 70%, 50%)",
    //   Female: userCountMrs + userCountMs,
    //   FemaleColor: "hsl(106, 70%, 50%)",
    // }, 
    // {
    //   statistic: "AI",
    //   "hot dog": 81,
    //   "hot dogColor": "hsl(190, 70%, 50%)",
    //   Value2: 80,
    //   Value2Color: "hsl(325, 70%, 50%)",
    //   Value3: 112,
    //   Value3Color: "hsl(54, 70%, 50%)",
    //   Value1: 35,
    //   Value1Color: "hsl(285, 70%, 50%)",
    // },
    // {
    //   statistic: "AL",
    //   "hot dog": 66,
    //   "hot dogColor": "hsl(208, 70%, 50%)",
    //   Value2: 111,
    //   Value2Color: "hsl(334, 70%, 50%)",
    //   Value3: 167,
    //   Value3Color: "hsl(182, 70%, 50%)",
    //   Value1: 18,
    //   Value1Color: "hsl(76, 70%, 50%)",
    // },
    // {
    //   statistic: "AM",
    //   "hot dog": 80,
    //   "hot dogColor": "hsl(87, 70%, 50%)",
    //   Value2: 47,
    //   Value2Color: "hsl(141, 70%, 50%)",
    //   Value3: 158,
    //   Value3Color: "hsl(224, 70%, 50%)",
    //   Value1: 49,
    //   Value1Color: "hsl(274, 70%, 50%)",
    // },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={mockBarData}
      theme={{
        // added
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
      keys={["Total_Users","Checked_in","Checked_out", "Male", "Female"]}
      indexBy="statistic"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "statistic", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
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
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in statistic: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
