import React, { useEffect, useState } from "react";
import OfferListItem from "@/components/reusable/OfferListItem";
import PrintListItem from "@/components/reusable/PrintListItem";
import Animate from "@/components/reusable/Animate";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  getCurrentExchangeRateETHUSD,
  getPrintRequests,
  getSentPrintRequests,
} from "lib/backend";

const PrintRequests = ({ user }) => {
  const { value: token } = useLocalStorage("token");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState(0);

  const init = async () => {
    try {
      const _data = await getCurrentExchangeRateETHUSD();
      setExchangeRate(_data.USD);
      let requestsData;

      if (filter === 0) {
        requestsData = await getPrintRequests(token, user.id);
      } else if (filter === 1) {
        requestsData = await getSentPrintRequests(token, user.id);
      }
      setRequests(requestsData);
    } catch (err) {
      console.log(err);
    }
  };

  // const pendingOffers = offers.filter((offer) => offer.status === "PENDING");
  // const acceptedOffers = offers.filter((offer) => offer.status === "ACCEPTED");
  // const rejectedOffers = offers.filter((offer) => offer.status === "REJECTED");

  const activatedRequests = requests.filter((request) =>
    ["Activated", "ArtistConfirmed", "ShipmentDelivered"].includes(
      request.status
    )
  );

  useEffect(() => {
    if (token) {
      init();
    }
  }, [token]);

  useEffect(() => {
    if (filter === 0) {
      init();
    } else if (filter === 1) {
      init();
    } else {
    }
  }, [filter]);
  return (
    // TODO: buttons eroner in mobile
    <Animate options={{ alpha: true }}>
      <div className="ml-[40px] pt-[80px] md:pt-[160px] md:ml-[35vw] mb-10 pr-[15px] md:pr-10">
        {activatedRequests.length === 0 && (
          <div>
            <h3 className="b3 mb-[15px] text-[17px]">Print Requests</h3>
            <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
            <div className="flex items-center gap-4 mb-20 md:gap-10">
              <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
              <h5 className="s1 opacity-60 ">No requests yet</h5>
            </div>
          </div>
        )}

        {activatedRequests.length !== 0 && (
          <div>
            {/* <h3 className="b3 mb-[15px] text-[17px]">Print Requests</h3> */}
            <div className="flex gap-2 overflow-auto md:pb-4 pb-2 flex-nowrap whitespace-nowrap">
              <span
                onClick={() => setFilter(0)}
                className={`${
                  filter === 0 ? "border-unveilBlack" : "border-unveilDrakGray"
                } px-2 cursor-pointer border rounded-full  l2`}
              >
                Received
              </span>
              <span
                onClick={() => setFilter(1)}
                className={`${
                  filter === 1 ? "border-unveilBlack" : "border-unveilDrakGray"
                } px-2 cursor-pointer border rounded-full  l2`}
              >
                Sent
              </span>
            </div>

            <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
            {activatedRequests.map((offer, i) => (
              <PrintListItem
                key={offer.id}
                offer={offer}
                currentExchangeRate={exchangeRate}
              />
            ))}
          </div>
        )}

        {/* {offers.length !== 0 && (
          <>
            {pendingOffers.length !== 0 && (
              <div>
                <h3 className="b3 mb-[15px] text-[17px]">Pending Offers</h3>
                <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
                {pendingOffers.map((offer, i) => (
                  <OfferListItem
                    key={offer.id}
                    offer={offer}
                    currentExchangeRate={exchangeRate}
                  />
                ))}
              </div>
            )}

            {acceptedOffers.length !== 0 && (
              <div>
                <h3 className="b3 mb-[15px] text-[17px]">Accepted Offers</h3>
                <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
                {acceptedOffers.map((offer, i) => (
                  <OfferListItem
                    key={offer.id}
                    offer={offer}
                    currentExchangeRate={exchangeRate}
                  />
                ))}
              </div>
            )}

            {rejectedOffers.length !== 0 && (
              <div>
                <h3 className="b3 mb-[15px] text-[17px]">Rejected Offers</h3>
                <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
                {rejectedOffers.map((offer, i) => (
                  <OfferListItem
                    key={offer.id}
                    offer={offer}
                    currentExchangeRate={exchangeRate}
                  />
                ))}
              </div>
            )}
          </>
        )} */}
      </div>
    </Animate>
  );
};

export default PrintRequests;
