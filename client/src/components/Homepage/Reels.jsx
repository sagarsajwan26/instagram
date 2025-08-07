import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Reels = () => {
  const icons = [1, 2, 3, 4, 5];
  const { allPosts } = useSelector((state) => state.post);
  console.log(allPosts);
  const containerRef = useRef();
  const imageRef = useRef();

  const scrollLeft = () => {
    const container = containerRef.current;
    console.log(imageRef.current.clientWidth);
    
    if (container) {
      container.scrollBy({
        left: -imageRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    const container = containerRef.current;
        console.log(imageRef.current.clientWidth);

    if (container) {
      container.scrollBy({
        left: imageRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };
  if (!allPosts) {
    return <div className="text-white">Loading...</div>;
  }

  if (allPosts.length == 0) {
    return <div className="text-white">NO Posts available</div>;
  }
  return (
    <div className="h-screen  max-h-screen  w-full bg-zinc-700 overflow-y-scroll relative flex flex-col items-center">
      {allPosts.map((post) => (
        <>
          <div className="min-h-[98vh] max-h-[96vh] w-[40%]  relative flex items-center justify-between">
            <button onClick={scrollLeft} className="z-11">
              <span>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="-5 0 25 25"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>left</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="ui-gambling-website-lined-icnos-casinoshunter"
                      transform="translate(-1913.000000, -158.000000)"
                      fill="#1C1C1F"
                      fill-rule="nonzero"
                    >
                      <g id="1" transform="translate(1350.000000, 120.000000)">
                        <path
                          d="M566.453517,38.569249 L577.302459,48.9938158 L577.39261,49.0748802 C577.75534,49.423454 577.968159,49.8870461 578,50.4382227 L577.998135,50.6228229 C577.968159,51.1129539 577.75534,51.576546 577.333675,51.9774469 L577.339095,51.9689832 L566.453517,62.430751 C565.663694,63.1897497 564.399001,63.1897497 563.609178,62.430751 C562.796941,61.650213 562.796941,60.3675924 563.609432,59.5868106 L573.012324,50.5572471 L563.609178,41.4129456 C562.796941,40.6324076 562.796941,39.349787 563.609178,38.569249 C564.399001,37.8102503 565.663694,37.8102503 566.453517,38.569249 Z"
                          id="left"
                          transform="translate(570.500000, 50.500000) scale(-1, 1) translate(-570.500000, -50.500000) "
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </button>
            <div 
            ref={containerRef}
              key={post._id}
              className="flex overflow-x-auto h-full w-full relative"
            >
              {post.media.map((media, idx) => (
                <>
                  {media.mediaType == "image" ? (
                    <img 
                    ref={imageRef}
                      className="h-full min-w-full flex-shrink-0 object-contain"
                      key={idx}
                      src={media.mediaUrl}
                      alt=""
                    />
                  ) : (
                    <video ref={imageRef} className="h-full min-w-full flex-shrink-0 object-contain" key={idx} src={media.mediaUrl}></video>
                  )}
                </>
              ))}
            </div>
            <div className="absolute z-10  h-[96%] w-full flex flex-col justify-between px-6 py-10">
              <div className="flex justify-between">
                <h1>{post.userId.username}</h1>
                <button className="btn btn-accent">Follow</button>
              </div>
              <div className="w-full flex justify-between items-end">
                <div>
                  <h1>{post.caption}</h1>
                </div>
                <div className="flex flex-col gap-4 ">
                  {icons.map((icons, idx) => (
                    <span key={idx}>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18,32.43a1,1,0,0,1-.61-.21C11.83,27.9,8,24.18,5.32,20.51,1.9,15.82,1.12,11.49,3,7.64
       c1.34-2.75,5.19-5,9.69-3.69A9.87,9.87,0,0,1,18,7.72a9.87,9.87,0,0,1,5.31-3.77c4.49-1.29,8.35.94,
       9.69,3.69,1.88,3.85,1.1,8.18-2.32,12.87C28,24.18,24.17,27.9,18.61,32.22A1,1,0,0,1,18,32.43ZM10.13,
       5.58A5.9,5.9,0,0,0,4.8,8.51c-1.55,3.18-.85,6.72,2.14,10.81A57.13,57.13,0,0,0,18,30.16,
       57.13,57.13,0,0,0,29.06,19.33c3-4.1,3.69-7.64,2.14-10.81-1-2-4-3.59-7.34-2.65a8,8,0,0,
       0-4.94,4.2,1,1,0,0,1-1.85,0,7.93,7.93,0,0,0-4.94-4.2A7.31,7.31,0,0,0,10.13,5.58Z"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={scrollRight}
            className="z-11">
              <span>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="-5 0 25 25"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>right</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="ui-gambling-website-lined-icnos-casinoshunter"
                      transform="translate(-1783.000000, -158.000000)"
                      fill="#1C1C1F"
                      fill-rule="nonzero"
                    >
                      <g id="1" transform="translate(1350.000000, 120.000000)">
                        <path
                          d="M436.453517,38.569249 L447.302459,48.9938158 L447.39261,49.0748802 C447.75534,49.423454 447.968159,49.8870461 448,50.4382227 L447.998135,50.6228229 C447.968159,51.1129539 447.75534,51.576546 447.333675,51.9774469 L447.339095,51.9689832 L436.453517,62.430751 C435.663694,63.1897497 434.399001,63.1897497 433.609178,62.430751 C432.796941,61.650213 432.796941,60.3675924 433.609432,59.5868106 L443.012324,50.5572471 L433.609178,41.4129456 C432.796941,40.6324076 432.796941,39.349787 433.609178,38.569249 C434.399001,37.8102503 435.663694,37.8102503 436.453517,38.569249 Z"
                          id="right"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default Reels;
