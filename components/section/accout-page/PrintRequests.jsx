import React, { useEffect, useState } from "react";
import OfferListItem from "@/components/reusable/OfferListItem";
import PrintListItem from "@/components/reusable/PrintListItem";
import Animate from "@/components/reusable/Animate";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  getCurrentExchangeRateETHUSD,
  getOwnedNfts,
  getAllOffers,
  getUserMe,
  getPrintRequests,
} from "lib/backend";

const PrintRequests = ({ user }) => {
  const { value: token } = useLocalStorage("token");
  const [ownedEditions, setOwnedEditions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);

  const init = async () => {
    try {
      const _data = await getCurrentExchangeRateETHUSD();
      setExchangeRate(_data.USD);
      const data = await getUserMe(token);
      const user_id = data.id;
      const nfts = await getOwnedNfts(user_id);
      const offers = await getAllOffers(token);

      const requestsData = await getPrintRequests(token, user.id);
      setRequests(requestsData);
      setOwnedEditions(nfts);
      setOffers(offers);
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
            <h3 className="b3 mb-[15px] text-[17px]">Print Requests</h3>
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
