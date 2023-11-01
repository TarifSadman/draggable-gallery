import React, { useState } from 'react';
import { Row, Col, Image, Button } from 'antd';
import { useDropzone } from 'react-dropzone';
import IMG1 from '../images/150x150-1.png';
import IMG2 from '../images/150x150-2.png';
import IMG3 from '../images/150x150-3.png';
import IMG4 from '../images/150x150-4.png';
import IMG5 from '../images/150x150-5.png';
import IMG6 from '../images/150x150-6.png';
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

  return (
    <>
      <div className="gallery-container">
        <Row gutter={[16, 16]} justify="center" align="middle">
          {items.map((item) => (
            <Col key={item.id} xs={12} sm={12} md={8} lg={6} xl={6}>
              <div
                className={`image-container ${item.selected ? 'selected' : ''}`}
                onClick={() => toggleSelection(item.id)}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, item.id)}
                draggable
              >
                <Image
                  src={item.src}
                  alt={`Image ${item.id}`}
                  className="image"
                  preview={false}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Button onClick={deleteSelected} disabled={items.every((item) => !item.selected)}>
        Delete Selected
      </Button>
      <div>
        <div>
          <p>Click or drag and drop to add images.</p>
        </div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
        </div>
      </div>
    </>
  );
};

export default DraggableGallery;
