/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useDropzone } from 'react-dropzone';
import IMG1 from '../images/I1.jpg';
import IMG2 from '../images/I2.jpg';
import IMG3 from '../images/I3.jpg';
import IMG4 from '../images/I4.jpg';
import IMG5 from '../images/I5.jpg';
import IMG6 from '../images/I6.png';
import './Gallery.css';

const DraggableGallery = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      src: IMG1,
      selected: false,
    },
    {
      id: 2,
      src: IMG2,
      selected: false,
    },
    {
      id: 3,
      src: IMG3,
      selected: false,
    },
    {
      id: 4,
      src: IMG4,
      selected: false,
    },
    {
      id: 5,
      src: IMG5,
      selected: false,
    },
    {
      id: 6,
      src: IMG6,
      selected: false,
    },
  ]);

  const [featureImageId, setFeatureImageId] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setFeatureImageId(items[randomIndex].id);
    
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * items.length);
      setFeatureImageId(items[randomIndex].id);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [items]);

  const onDrop = (acceptedFiles) => {
    const newItems = acceptedFiles.map((file) => ({
      id: Date.now(),
      src: URL.createObjectURL(file),
      selected: false,
    }));
    setItems([...items, ...newItems]);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    const dragId = +e.dataTransfer.getData('id');
    const dropId = id;

    const updatedItems = [...items];
    const dragIndex = items.findIndex((item) => item.id === dragId);
    const dropIndex = items.findIndex((item) => item.id === dropId);

    const [draggedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);

    setItems(updatedItems);
  };

  const toggleSelection = (id) => {
    if (featureImageId === id) {
      setFeatureImageId(null);
    } else {
      setFeatureImageId(id);
    }

    const updatedItems = [...items];
    const item = updatedItems.find((item) => item.id === id);
    item.selected = !item.selected;
    setItems(updatedItems);
  };

  const deleteSelected = () => {
    const updatedItems = items.filter((item) => !item.selected);
    setItems(updatedItems);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  console.log(onDrop);

  return (
    <>
      <div className="carousel-container">
        <div className="feature-image-container">
        <div className="feature-image-container">
  {featureImageId && items.find((item) => item.id === featureImageId) ? (
    <img
      src={items.find((item) => item.id === featureImageId).src}
      alt={`Image ${featureImageId}`}
      className="feature-image"
      preview={false}
    />
  ) : (
    <p>No feature image selected</p>
  )}
</div>

        </div>
        <div className="image-list">
          {items.map((item) => (
            <div
              key={item.id}
              className={`image-item ${item.selected ? 'selected' : ''}`}
              onClick={() => toggleSelection(item.id)}
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, item.id)}
              draggable
            >
              <img
                src={item.src}
                alt={`Image ${item.id}`}
                className={`image ${item.selected ? 'selected' : ''}`}
                preview={false}
              />
            </div>
          ))}
        </div>
      </div>
      <Button onClick={deleteSelected} disabled={items.every((item) => !item.selected)}>
        Delete Selected
      </Button>
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
        </div>
      </div>
    </>
  );
};

export default DraggableGallery;