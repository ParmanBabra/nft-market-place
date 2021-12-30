// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radar
import * as React from "react";
import { ResponsiveRadar } from "@nivo/radar";

import { useAppSelector } from "../../app/hooks";
import { getStatus, IStatus } from "./MintSlice";

const getData = (status: IStatus) => {
  return [
    {
      status: "Strength",
      value: status.strength,
    },
    {
      status: "Agility",
      value: status.agility,
    },
    {
      status: "Vitality",
      value: status.vitality,
    },
    {
      status: "Intelligence",
      value: status.intelligence,
    },
    {
      status: "Dexterity",
      value: status.dexterity,
    },
  ];
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const StatusRadar = () => {
  const state = useAppSelector(getStatus);
  const data = getData(state);
  return (
    <ResponsiveRadar
      data={data}
      keys={["value"]}
      indexBy="status"
      valueFormat=">-.0f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ theme: "background" }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "nivo" }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
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

export default StatusRadar;
