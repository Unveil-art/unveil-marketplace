import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getArtistRecognitions,
  unfollowArtist,
  isFollowed,
  postFollower,
  getUserMe,
} from "lib/backend";
import Loader from "../svg/Loader";

const AboutCurator = ({ owner }) => {
  const [recognitions, setRecognitions] = useState([]);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const [more, setMore] = useState(false);
  const [isVideo, setIsVideo] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef(null);
  // Owner name to string
  let displayName;
  if (owner.firstName && owner.lastName) {
    displayName = `${owner.firstName} ${owner.lastName}`;
  } else if (owner.firstName) {
    displayName = owner.firstName;
  } else if (owner.lastName) {
    displayName = owner.lastName;
  } else {
    displayName = owner.email;
  }

  const handleFollowUnfollow = (isFollow) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (isFollow) {
      //unfollow code
      unfollowArtist(token, { user_id: owner.id })
        .then((res) => setFollowing(false))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      // follow code
      postFollower(token, { user_id: owner.id })
        .then((res) => setFollowing(true))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const getRecognitions = async (artist_id) => {
    const data = await getArtistRecognitions(artist_id);
    setRecognitions(data);
  };

  useEffect(() => {
    if (owner.id) {
      getRecognitions(owner.id);
      const token = localStorage.getItem("token");
      setLoading(true);
      isFollowed(token, owner.id)
        .then((res) => setFollowing(res.data))
        .catch((err) => {
          console.log(err);
          setFollowing(false);
        })
        .finally(() => setLoading(false));

      getUserMe(token)
        .then((res) => setAuthUser(res))
        .catch((err) => console.log(err));
    }
  }, [owner]);

  const toggleVideo = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (isVideoMuted) {
      setIsVideoMuted(false);
    } else {
      setIsVideoMuted(true);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative w-full h-screen bg-bgColor">
        {owner.profileUrl && !isVideo && (
          <Image
            src={owner.profileUrl}
            alt={owner.displayName}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        )}

        {owner.profileUrl && isVideo && (
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              onPause={() => setIsVideoPlaying(false)}
              onPlay={() => setIsVideoPlaying(true)}
              muted={isVideoMuted}
              onEnded={() => setIsVideoPlaying(false)}
              className="w-full h-full object-cover object-center grayscale"
              playsinline
              src="https://player.vimeo.com/external/507533586.sd.mp4?s=c3f3f4471ea9bff78baf2b1e67b73b0ed190beb0&amp;profile_id=164&amp;oauth2_token_id=57447761"
            />
            <div className="absolute video-gradient h-full w-full top-0 left-0 pointer-events-none flex items-end">
              <div className="pointer-events-auto flex justify-between w-full items-center px-8 py-6">
                <button
                  onClick={toggleVideo}
                  className="uppercase l2 text-unveilWhite"
                >
                  {isVideoPlaying ? "Pause" : "Play"}
                </button>
                <button
                  onClick={toggleMute}
                  className="uppercase l2 text-unveilWhite"
                >
                  {isVideoMuted ? "Unmute" : "Mute"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative bg-unveilBlack text-unveilWhite">
        <h3 className="pr-10 -rotate-90 -translate-x-[25%] translate-y-full h1 w-fit ">
          Artist
        </h3>
        <div className="w-[55%] mt-auto md:pt-0 pr-[15px] pb-10 ml-auto md:ml-[35%] h-fit">
          <div className="flex items-end gap-2 flex-nowrap">
            <p className="b3">By</p>
            <Link href={`/people/${owner.id}`}>
              <p className="md:max-w-[300px] max-w-[150px] truncate l2">
                {displayName}
              </p>
            </Link>
          </div>

          <Link href={`/people/${owner.id}`}>
            <h4
              data-cursor="View artist"
              data-cursor-color="#b2b4ae"
              className={`${
                more ? "md:line-clamp-6" : "line-clamp-[10] md:line-clamp-6"
              } mt-5 mb-12 overflow-hidden b2 cursor-pointer md:h2`}
            >
              {owner.description}
            </h4>
          </Link>
          {/* <div className="mb-5">
            {recognitions.map(({ id, recognition_type, description }) => (
              <p
                key={id}
                className="py-1 border-b cursor-pointer b3 md:b4 border-unveilWhite"
              >
                x {description} ({recognition_type})
              </p>
            ))}

            <p className="py-1 truncate w-[100px] cursor-pointer b3 md:b4 border-unveilWhite">
              {owner?.walletAddress?.slice(0, 4).toLowerCase()}...
              {owner?.walletAddress?.slice(-4).toLowerCase()}
            </p>
          </div> */}
          {owner.id !== authUser.id && (
            <div>
              <button
                className="btn btn-secondary mb-2.5 hover:bg-[#292928] btn-full border-unveilWhite"
                onClick={() => handleFollowUnfollow(following)}
              >
                {loading ? (
                  <div className="h-[25px] animate-spin justify-center flex items-center">
                    <Loader color="#F7F4ED" />
                  </div>
                ) : following ? (
                  `Following`
                ) : (
                  `Follow artist`
                )}
              </button>

              <button className="btn btn-secondary hover:bg-[#292928] btn-full border-unveilWhite">
                Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutCurator;
