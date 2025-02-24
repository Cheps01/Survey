import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import InteractiveSurvey from "./InteractiveSurvey";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <InteractiveSurvey />
  </StrictMode>
);
