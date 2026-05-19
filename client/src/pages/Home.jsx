import React from 'react'
import {motion , AnimatePresence} from 'framer-motion'
import {useSnapshot} from 'valtio'
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion'
import state from '../store'
import { CustomButton } from '../components'

const Home = () => {
  const snap = useSnapshot(state)
  return (
    <AnimatePresence>

      {snap.intro && (  //if you are in the home page then run the code below(motion section);
      <motion.section className='home' {...slideAnimation('left')}>
        <motion.header className="header" {...slideAnimation('down')}>
        <img src="./threejs.png" alt="logo"  className='w-8 h-8 object-contain' />
        </motion.header>
        <motion.div className="home-content" {...headContainerAnimation}>
          <motion.div className="home-content-text" {...headTextAnimation}>
            <h1 className='head-text'>
              3D <br className='xl:block hidden'/> T-Shirt App
            </h1>
          </motion.div >
          <motion.div className='flex flex-col gap-5 ' {...headContentAnimation} >
            <p className='max-w-md font-normal text-gray-600 text-base'>
              Create your own t shirt design
            </p>
            <CustomButton
              type = 'primary' tittle = 'customize it'
              handleClick = {() => state.intro = false} // when the user clicks on the button leave the intro {home} page
              CustomStyles = 'w-fit px-4 py-2.5 text-sm font-bold'
              />
          </motion.div>
        </motion.div>
      </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home
