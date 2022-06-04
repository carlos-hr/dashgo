import { Box, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { options, series } from "./config";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartComponentProps {
  text: string;
}

const ChartComponent = ({ text }: ChartComponentProps) => {
  return (
    <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
      <Text fontSize="lg" mb="4">
        {text}
      </Text>
      <Chart options={options} series={series} type="area" height={160} />
    </Box>
  );
};

export default ChartComponent;
