/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CryptoState } from "./CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import SelectBtn from "./SelectBtn";
import { createTheme, CircularProgress, ThemeProvider } from "@mui/material";
import { chartDays } from "../config/data";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const CoinInfo = ({ coin }) => {
  const [historyData, setHistoryData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoryData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoryData(data.prices);
  };

  useEffect(() => {
    fetchHistoryData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {/* chart */}
      <div className="chart_container">
        {!historyData ? (
          <CircularProgress
            sx={{ color: "#0fc0ec" }}
            size="250px"
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historyData?.map((item) => {
                  let date = new Date(item[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [{
                    label: `Price (Past ${days} Days) in ${currency}`,
                    data: historyData?.map((item) => item[1]),
                    borderColor: "#0fc0ec",
                  } ],
              }}

              options={{
                elements: {
                  point: { radius: 0.5 }
                }
              }}
            />

            <div
              style={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "space-around",
                width: "100%",
                flexWrap: 'wrap'
              }}
            >
              {chartDays.map((day) => (
                <SelectBtn
                  key={day.value}
                  type="button"
                  onClick={() => {
                    setDays(day.value);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectBtn>
              ))}
            </div>
          </>
        )}
      </div>

      {/* buttons */}
    </ThemeProvider>
  );
};

export default CoinInfo;
