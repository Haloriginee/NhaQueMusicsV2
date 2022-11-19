import SongBar from './SongBar';

const RelatedSongs = ({ data, artistId, handlePauseClick, handlePlayClick, activeSong, isPlaying }) => (
  <div className="flex flex-col">
    <h1
      className="font-bold text-3xl text-white"
    >
      Related Songs:
    </h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, index) => (
        <SongBar
          key={`${song.key}-${artistId}`}
          song={song}
          index={index}
          isPlaying={isPlaying}
          activeSong={activeSong}
          artistId={artistId}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
