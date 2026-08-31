import React from 'react';

const LoaderRef = ({ref}) => {
    return (
        <div ref={ref} style={{width: '100%', height: `50px`}}>
        </div>
    );
};

export default LoaderRef;