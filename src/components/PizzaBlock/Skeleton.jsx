import React from "react"
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={285}
    height={465}
    viewBox="0 0 285 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="245" rx="16" ry="16" width="250" height="35" /> 
    <rect x="3" y="296" rx="6" ry="6" width="250" height="60" /> 
    <circle cx="120" cy="120" r="120" /> 
    <rect x="0" y="401" rx="10" ry="10" width="98" height="30" /> 
    <rect x="128" y="393" rx="10" ry="10" width="134" height="45" />
  </ContentLoader>
)

export default Skeleton;