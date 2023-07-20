import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { faHeart, faShare, faThumbTack, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VideoDetail = () => {
  const location = useLocation();
  const initialVideoUrl = new URLSearchParams(location.search).get("url");

  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [videoData, setVideoData] = useState(location.state?.videoData || null); // Get videoData from location state
  const [moreVideos, setMoreVideos] = useState([]);

  useEffect(() => {
    fetch(`https://internship-service.onrender.com/videos?page=2`)
      .then((res) => res.json())
      .then((data) => {
        const videos = data?.data?.posts || [];
        const video = videos.find(
          (video) => video.submission.mediaUrl === videoUrl
        );
        if (video) {
          setVideoData(video);
        }
        // Filter out the currently playing video from the more videos
        const filteredVideos = videos.filter(
          (v) => v.submission.mediaUrl !== videoUrl
        );
        setMoreVideos(filteredVideos);
      });
  }, [videoUrl]);

  const handleThumbnailClick = (videoUrl) => {
    setVideoUrl(videoUrl);
  };

  const comment = (event) => {
    event.preventDefault();
    const form = event.target;
    form.reset();
  };



  return (
    <div className="flex items-center justify-center mt-10">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="video-player">
            {/* Display the video player here */}
            <div>
              <video
                controls
                autoPlay
                muted
                className="rounded-md overflow-hidden w-full"
                src={videoUrl}
              ></video>
              {videoData && (
                <div>
                  <h3 className="text-lg font-semibold">
                    {videoData.submission.title}
                  </h3>
                </div>
              )}
            </div>
            {videoData && (
              <div>
                <div className="flex gap-1 mt-3 items-center">
                  <div>
                    <img
                      className="rounded-full w-10 h-10 me-3"
                      src={videoData.creator.pic}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <div>
                      <h3 className="text-sm text-slate-400">
                        {videoData.creator.name}
                      </h3>
                      <h3 className="text-sm text-slate-400">
                        {videoData.reaction.count}K Views
                      </h3>
                    </div>
                  </div>
                  <div className="">
                    <p></p>
                    <div>
                      <div className="join join-vertical lg:join-horizontal ms-14">
                        <button className="btn join-item"><FontAwesomeIcon icon={faThumbsUp} /> {videoData.reaction.count} </button>
                        <button className="btn join-item">
                          <p> <FontAwesomeIcon icon={faThumbsDown} /> {videoData.comment.count} </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-slate-200 p-5 rounded-xl mt-5">
                  <h3 className="text-sm text-black font-bold">
                    {videoData.reaction.count}K Views
                  </h3>
                  <p className="font-bold text-xl">Description</p>
                  <h3 className="text-sm text-black ">
                    {videoData.submission.description}
                  </h3>
                </div>

                <div>
                  <p>Comments</p>
                  <p>Total Comments: {videoData.comment.count}</p>
                  <form onSubmit={comment}>
                    <input
                      type="text"
                      placeholder="Add Comments"
                      className="input input-bordered w-3/5  mt-3 me-5 sm:w-full"
                    />
                    <button className="btn btn-ghost mt-5 " type="submit" >Comment</button>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="more-videos mx-auto sm:ms-10">
            <h2 className="tex-2xl font-bold mb-5 mt-5 sm:mt-0">More Videos</h2>
            <div className="join bg-slate-200">
              <input
                className="join-item btn"
                type="radio"
                name="options"
                aria-label="New"
              />
              <input
                className="join-item btn"
                type="radio"
                name="options"
                aria-label="Trending"
              />
              <input
                className="join-item btn"
                type="radio"
                name="options"
                aria-label="Most Watched"
              />
            </div>
            {moreVideos.map((video) => (
              <div
                key={video.postId}
                className="p-4 cursor-pointer"
                onClick={() => handleThumbnailClick(video.submission.mediaUrl)}
              >
                <div className="flex justify-center items-center">
                  <div>
                    <img
                      src={video.submission.thumbnail}
                      alt={video.submission.title}
                      className="mt-4 rounded-md sm:w-150 sm:h-auto"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </div>
                  <div className="ms-2">
                    <h3 className="text-lg font-semibold">
                      {video.submission.title}
                    </h3>
                    <h3 className="text-sm text-slate-400">
                      {video.creator.name}
                    </h3>
                    <h3 className="text-sm text-slate-400">
                      {video.reaction.count}K Views
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
