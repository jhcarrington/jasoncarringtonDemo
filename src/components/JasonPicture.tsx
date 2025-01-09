import { useState, useRef, useEffect } from 'react';
import { getMediaUrl, MediaUrls } from '../utils';

export default function JasonProfilePicture() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      const isOverflowingRight = rect.right >= window.innerWidth;
      setIsOverflowing(isOverflowingRight);
    } else {
      setIsOverflowing(false);
    }
  }, [isOpen]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={toggleModal}
      onMouseLeave={closeModal}
    >
      <img
        alt="Jason"
        id="jasonImage"
        src={getMediaUrl(MediaUrls.JasonProfile)}
        className="w-16 h-auto rounded-full object-cover cursor-pointer"
      />

      {isOpen && (
        <div
          ref={modalRef}
          className={`absolute mt-2 w-64 max-w-xs sm:w-72 max-w-full bg-white p-4 rounded-lg shadow-lg border border-gray-300 z-10 
          ${isOverflowing ? 'right-0' : 'sm:left-1/2 sm:transform sm:-translate-x-1/2'}`}
        >
          <div
            className={`absolute top-[-8px] ${isOverflowing ? 'right-5' : 'left-1/2 transform -translate-x-1/2'} w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white z-20`}
          ></div>

          <div className="flex flex-col items-center space-y-2">
            <img
              src={getMediaUrl(MediaUrls.JasonProfile)}
              alt="Profile"
              className="w-25 h-auto rounded-full object-cover mb-2" // Larger image in the modal
            />
            <p className="text-center text-lg text-gray-500 font-semibold break-words">
              Jason Carrington
            </p>
            <p className="text-center text-gray-500 break-words">
              jasonhcarrington@gmail.com
            </p>
            <p className="text-center text-gray-500 break-words">
              224-234-1588
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
