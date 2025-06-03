
const ControlsPanel = ({onDoorUpload}) => {
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      onDoorUpload(event.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="door-upload" className="text-base">
        Upload Door Image
      </label>
      <div className="flex items-center space-x-2">
        <input
          id="door-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="flex-grow"
        />        
      </div>
    </div>
  );
};

export default ControlsPanel;
