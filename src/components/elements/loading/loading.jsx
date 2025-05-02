import React from 'react';
import './loading.css';

const Loading = ({ 
  size = 40, 
  speed = 1.25, 
  color = "#1e5128", 
  lineWeight = 3, 
  className = "",
  centered = false,
  children
}) => {
  const style = {
    '--uib-size': `${size}px`,
    '--uib-speed': `${speed}s`,
    '--uib-color': color,
    '--uib-line-weight': `${lineWeight}px`,
  };

  const containerStyle = centered ? {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  } : {};

  return (
    <div style={containerStyle} className="flex items-center gap-2">
      <div className={`loading-animation ${className}`} style={style} aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      {children && <span>{children}</span>}
    </div>
  );
};

export default Loading;