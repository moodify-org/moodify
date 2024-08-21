import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../MoodPage/MoodPage.module.scss";
import { useEffect, useState } from 'react';

export default function PlaylistPage({ playlistList, gradients }) {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [randomColorNum, setRandomColorNum] = useState(0);

  useEffect(() => {
    if (playlistList) {
      const playlist = playlistList.find((m) => m.id === parseInt(playlistId)+6);
      if (playlist) {
        setPlaylistDetails(playlist);
        setRandomColorNum(Math.floor(((Math.random() * 5) + 1)))
      } else {
        navigate('/');
      }
    }
  }, [playlistId, playlistList, navigate]);


  if (!playlistDetails) {
    return <div>No mood details found</div>;
  }

  return (
    <div className={styles.MoodPage}>
      <Sidebar gradients={gradients} playlistList={playlistList} colorNum={randomColorNum}/>
      <div className={styles.main}>
        <div className={styles.header} style={{ backgroundImage: gradients ? gradients[randomColorNum] : 'none' }}>
          <h1>{playlistDetails.title}</h1>
        </div>
      </div>
    </div>
  );
}
