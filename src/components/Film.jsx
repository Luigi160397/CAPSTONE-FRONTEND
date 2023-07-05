import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";

const Film = ({ film }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const playerRef = useRef(null);

  const handleCardClick = () => {
    clearTimeout(timeoutRef.current);
    navigate(`/films/${film.id}`);
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 1300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

  const handlePlayerReady = () => {
    if (isHovered) {
      const player = playerRef.current.getInternalPlayer();
      player.playVideo();
    }
  };

  return (
    <Card
      className="film-card"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer" }}
    >
      {isHovered ? (
        <div className="rounded-2" style={{ width: "303px", height: "400px", position: "relative" }}>
          <ReactPlayer
            ref={playerRef}
            url={film.urlTrailer}
            width="100%"
            height="100%"
            playing
            className="film-wrapper"
            controls={false}
            muted={true}
            onPause={handleCardClick}
            onReady={handlePlayerReady}
          />
        </div>
      ) : (
        <Card.Img
          width="200px"
          height="400px"
          className="image-fluid rounded-2"
          style={{ objectFit: "cover" }}
          variant="top"
          src={film.urlCopertina}
        />
      )}
    </Card>
  );
};

export default Film;
