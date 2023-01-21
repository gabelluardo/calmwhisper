"use client";

import classNames from "classnames";
import { useState } from "react";
import ReactHowler from "react-howler";
import VolumeSlider from "./VolumeSlider";
import { useSoundContext } from "@/context/soundContext";

type Props = {
  item: any;
  isMute: boolean;
  addSound: (name: string) => void;
};

export default function SoundCard({ item, isMute, addSound }: Props) {
  const { name, sound, icon } = item;
  const { currentSoundsPlaying, updateVolume } = useSoundContext();

  const handleIconClick = () => {
    addSound(name);
  };

  const handleVolumeChange = (value: number) => {
    updateVolume(name, value);
  };

  return (
    <>
      <div className="select-none flex flex-col p-4 justify-center items-center">
        <div className="w-[65px]">
          <button className=" inline-block w-full" onClick={handleIconClick}>
            {/*             
            // Todo: render svg instead of an img which will enable changing with the fill property
            */}
            <img
              className="w-auto h-auto filter-white color-white"
              src={icon}
              alt={name}
              draggable={false}
            />
          </button>
        </div>
        <div
          className={classNames(
            { invisible: !currentSoundsPlaying[name] },
            "w-full pt-3 max-w-[100px] h-10"
          )}
        >
          {currentSoundsPlaying[name] && (
            <VolumeSlider
              defaultValue={currentSoundsPlaying[name]?.volume}
              handleValueChange={handleVolumeChange}
            />
          )}
        </div>
        {currentSoundsPlaying[name] && (
          <>
            <ReactHowler
              playing={!isMute}
              src={sound}
              volume={currentSoundsPlaying[name]?.volume}
              loop={true}
            />
          </>
        )}
      </div>
    </>
  );
}
