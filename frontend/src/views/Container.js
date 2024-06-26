import React, { useContext } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
// import Step5 from "./Step5";
import Step5 from "./Step5New";
import Step6 from "./Step6";
// import Step7 from "./Step7";
// import Step7 from "./Step7-old";
import Step8 from "./Step8";
import { AppContext } from "../store/app";

const Container = (props) => {
  const [state] = useContext(AppContext);
  return (
    <div style={{ flex: 1 }}>
      {state.step === 1 && <Step1 {...props} />}
      {state.step === 2 && <Step2 {...props} />}
      {state.step === 3 && <Step3 {...props} />}
      {state.step === 4 && <Step4 {...props} />}
      {state.step === 5 && <Step5 {...props} />}
      {state.step === 6 && <Step6 {...props} />}
      {state.step === 7 && <Step8 {...props} />}
      {/* {state.step === 8 && <Step7 {...props} />} */}
    </div>
  );
};

export default Container;
