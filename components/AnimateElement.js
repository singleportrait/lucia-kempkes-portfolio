import { motion, AnimatePresence } from 'framer-motion';

function AnimateElement(props) {
  const animationVariants = {
    initial: { opacity: 0.1 },
    animate: { opacity: 1 },
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={props.className ?? null}
        key={props.id}
        initial="initial"
        animate="animate"
        exit="initial"
        variants={props.variants || animationVariants}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimateElement;
