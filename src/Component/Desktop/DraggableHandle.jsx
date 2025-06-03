const DraggableHandle = ({
  id,
  x,
  y,
  onMouseDown,
  color = "#f06633",
  size = 12,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Draggable handle ${id + 1}`}
      onMouseDown={(e) => onMouseDown(e, id)}
      onTouchStart={(e) => onMouseDown(e, id)}
      className="position-absolute rounded-circle shadow cursor-grab"
      style={{
        left: `${x - size / 2}px`,
        top: `${y - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        touchAction: "none",
      }}
    />
  );
};

export default DraggableHandle;
