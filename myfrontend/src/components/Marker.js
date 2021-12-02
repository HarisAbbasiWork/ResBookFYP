import React,{useEffect} from 'react';
import './Marker.css';

const Marker = (props) => {
    const { color, name, id } = props;
    useEffect(() => {
        console.log(props)
        
    }, []);
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;