import React, { useState } from 'react';
import Partition from './Partition';

const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

const LayoutBuilder = () => {
  const [partitions, setPartitions] = useState([{ id: 1, color: getRandomColor(), direction: 'none', children: [] }]);

  const splitPartition = (id, direction) => {
    const newPartitions = [...partitions];
    const partition = findPartition(newPartitions, id);
    if (partition) {
      const newColor = getRandomColor();
      const newId = new Date().getTime();
      const newChild = { id: newId, color: newColor, direction: 'none', children: [] };
      partition.children.push(newChild);
      partition.direction = direction;
      setPartitions(newPartitions);
    }
  };

  const removePartition = (id) => {
    const newPartitions = [...partitions];
    removePartitionById(newPartitions, id);
    setPartitions(newPartitions);
  };

  const findPartition = (partitions, id) => {
    for (let partition of partitions) {
      if (partition.id === id) return partition;
      const found = findPartition(partition.children, id);
      if (found) return found;
    }
    return null;
  };

  const removePartitionById = (partitions, id) => {
    for (let i = 0; i < partitions.length; i++) {
      if (partitions[i].id === id) {
        partitions.splice(i, 1);
        return;
      }
      removePartitionById(partitions[i].children, id);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {partitions.map(partition => (
        <Partition key={partition.id} partition={partition} onSplit={splitPartition} onRemove={removePartition} />
      ))}
    </div>
  );
};

export default LayoutBuilder;
