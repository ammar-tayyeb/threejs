import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { CustomButton, FilePicker, Tab } from '../components';
const Customizer = () => {
  const snap = useSnapshot(state);

  const positionOptions = [
    { label: 'Top', value: 7 },
    { label: 'Center', value: 0 },
    { label: 'Bottom', value: -10 },
  ];

  const sizeOptions = [
    { label: 'Small', value: 15 },
    { label: 'Medium', value: 25 },
    { label: 'Large', value: 35 },
  ];

  const [file, setFile] = useState('');

  

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    if (activeEditorTab === "filepicker") {
      return (
        <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      )
    }
    return null;
  }

  

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const handlePositionChange = (value) => {
    state.decalPosition = value;
  };

  const handleSizeChange = (value) => {
    state.decalSize = value;
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="primary"
              tittle="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
            <div className="mt-2">
              <CustomButton
                type="primary"
                handleClick={downloadCanvasToImage}
                customStyles="w-fit px-3 py-2 rounded-md shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </CustomButton>
            </div>
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}

            <div className='bottom-controls'>
              <div className='w-full flex flex-col items-center gap-3'>
                <div className='flex flex-col items-center gap-2'>
                  <label className='text-white font-bold'>Logo Size</label>
                  <div className='flex flex-wrap justify-center gap-2'>
                    {sizeOptions.map((option) => (
                      <button
                        type='button'
                        key={option.label}
                        className={`px-3 py-2 rounded-md text-sm font-semibold ${snap.decalSize === option.value ? 'bg-white text-black' : 'bg-slate-700 text-white'}`}
                        onClick={() => handleSizeChange(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='xl:hidden flex flex-col items-center gap-2'>
                  <label className='text-white font-bold'>Logo Position</label>
                  <div className='flex flex-wrap justify-center gap-2'>
                    {positionOptions.map((option) => (
                      <button
                        type='button'
                        key={option.label}
                        className={`px-3 py-2 rounded-md text-sm font-semibold ${snap.decalPosition === option.value ? 'bg-white text-black' : 'bg-slate-700 text-white'}`}
                        onClick={() => handlePositionChange(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className='side-controls right-side hidden xl:flex' {...fadeAnimation}>
            <label className='text-white font-bold'>Logo Position</label>
            <div className='flex flex-col gap-2'>
              {positionOptions.map((option) => (
                <button
                  type='button'
                  key={option.label}
                  className={`px-3 py-2 rounded-md text-sm font-semibold ${snap.decalPosition === option.value ? 'bg-white text-black' : 'bg-slate-700 text-white'}`}
                  onClick={() => handlePositionChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}

    </AnimatePresence>
  )
}

export default Customizer
