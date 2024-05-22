import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const Partition = ({ partition, onSplit, onRemove }) => {
  const { id, color, children, direction } = partition;

  const handleSplit = (splitDirection) => {
    onSplit(id, splitDirection);
  };

  return (
    <div style={{ flex: 1, position: 'relative', margin: '5px', backgroundColor: color, border: '1px solid black', display: 'flex', flexDirection: direction === 'horizontal' ? 'column' : 'row' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1, display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={() => handleSplit('vertical')}>V</button>
        <button style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={() => handleSplit('horizontal')}>H</button>
        <button style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={() => onRemove(id)}>-</button>
      </div>
      {children.length === 0 ? null : (
        <div style={{ display: 'flex', flex: 1, flexDirection: direction === 'horizontal' ? 'row' : 'column' }}>
          {children.map(child => (
            <ResizableBox key={child.id} width={200} height={200} minConstraints={[100, 100]} style={{ flex: 1, margin: '5px', position: 'relative' }}>
              <Partition partition={child} onSplit={onSplit} onRemove={onRemove} />
            </ResizableBox>
          ))}
        </div>
      )}
    </div>
  );
};

export default Partition;
