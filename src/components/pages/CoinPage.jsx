/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../../config/api";
import axios from "axios";
import CoinInfo from "../CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../banner/Carousel";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState("");

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "#0fc0ec" }} />;

  return (
    <div className="container">
      {/* sidebar */}
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200px"
          style={{ marginBottom: "20px" }}
        />

        <Typography variant="h3" className="heading">
          {coin?.name}
        </Typography>

        <Typography variant="subtitle1" className="description">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>

        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h6" className="rank_heading">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h6" className="rank_heading">
              CurrentPrice:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>
              {symbol} {coin?.market_data.current_price[currency.toLowerCase()]}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h6" className="rank_heading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>

      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
