import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activesong, isPlaying } = useSelector((state) => state.player);

  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

  console.log(songid);

  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Wait for it..." />;
  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, index, data }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId=""
        songData={songData}
      />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Lyrics:
        </h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((line, index) => (
            <p className="text-gray-400 text-base my-1">
              {line}
            </p>
          )) : <p className="text-gray-400 text-base my-1">No lyrics found</p> }
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activesong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
