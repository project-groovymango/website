import { ErrorBoundary } from "react-error-boundary";
import { CAL_LINK } from "../data/home";

function CalFallback() {
  return (
    <a
      href={`https://cal.com/${CAL_LINK}`}
      target="_blank"
      rel="noreferrer"
      className="cta-primary"
    >
      Book a free 15-min call (opens Cal.com) &rarr;
    </a>
  );
}

export default function CalErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={CalFallback}>
      {children}
    </ErrorBoundary>
  );
}
