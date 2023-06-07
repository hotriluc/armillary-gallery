import { SplitText } from "@cyriacbr/react-split-text";
import { motion } from "framer-motion";
import { OverflowTextHolder } from "../../styled/Global";

const AnimatedSplitText = ({ text, textVariants }) => {
  return (
    <SplitText
      LineWrapper={({ children }) => (
        <OverflowTextHolder>{children}</OverflowTextHolder>
      )}
      WordWrapper={({ children }) => (
        <motion.span
          style={{ whiteSpace: "pre" }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textVariants}
        >
          {children}
        </motion.span>
      )}
    >
      {text.toUpperCase()}
    </SplitText>
  );
};

export default AnimatedSplitText;
