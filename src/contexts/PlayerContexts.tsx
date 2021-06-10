import { createContext, useState, ReactNode } from "react";
import next from "next";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  setPlayingState: (state: boolean) => void;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  tooglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
};

type PlayerContextProvider = {
  children: ReactNode;
};
export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProvider) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;
    if (nextEpisodeIndex < episodeList.length)
      setCurrentEpisodeIndex(nextEpisodeIndex);
  }

  function playPrevious() {
    if (currentEpisodeIndex > 0)
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        episodeList,
        isPlaying,
        play,
        playList,
        playNext,
        playPrevious,
        tooglePlay,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
