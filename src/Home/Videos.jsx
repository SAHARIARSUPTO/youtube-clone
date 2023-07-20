import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`https://internship-service.onrender.com/videos?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => setVideos(data?.data?.posts || []));
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {videos.map((video) => (
          <Link
            key={video.postId}
            to={{
              pathname: `/video-detail`,
              search: `?url=${encodeURIComponent(video.submission.mediaUrl)}`,
              state: { videoData: video }, // Pass the entire videoData as state
            }}
          >
            <div className="p-4 rounded-xl cursor-pointer">
              <img
                src={video.submission.thumbnail}
                alt={video.submission.title}
                className="mt-4 rounded-md w-full h-50 object-cover"
              />
              <div className='flex mt-3'>
                <div><img className='rounded-full w-10 h-10 me-3' src={video.creator.pic} alt="" /></div>
                <div>
                  <h3 className="text-lg font-semibold">{video.submission.title}</h3>
                  <h3 className="text-sm text-slate-400">{video.creator.name}</h3>
                  <h3 className="text-sm text-slate-400">{video.reaction.count}K Views</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="join mt-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
          <button
            key={page}
            className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Videos;
