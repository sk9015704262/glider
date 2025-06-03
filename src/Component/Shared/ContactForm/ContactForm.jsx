import React, { useContext, useState } from 'react';
import './ContactForm.css';
import { ImageContext } from '../../Context/ImageContext';

const ContactForm = ({ initialValues = {}, series, design, color, style, pattern, doorwidth }) => {
  const [formData, setFormData] = useState(initialValues);
  const [status, setStatus] = useState('');
  const { imgurl } = useContext(ImageContext);

  // console.log(imgurl)

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const allformData = {
    ...formData, 
    doorWidth: doorwidth,
    doorStyle: style,
    series,
    doorDesign: design,
    doorColour: color,
    imagePath: imgurl
  };

  // ✅ Log to console for testing
  console.log("📝 Form submitted with data:", allformData);
  setStatus("Form data logged to console");

  // ❌ Commented-out backend call
 
  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allformData),
    });

    const result = await response.text();
    setStatus(result);
  } catch (error) {
    console.error('Submission error:', error);
    setStatus('Submission failed.');
  }
  
};



  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <input name="name" placeholder="Name" value={formData.name || ''} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone || ''} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email || ''} onChange={handleChange} required />
        <input name="street" placeholder="Street" value={formData.street || ''} onChange={handleChange} required />
        <input name="suburb" placeholder="Suburb" value={formData.suburb || ''} onChange={handleChange} required />
        <input name="postcode" placeholder="Postcode" value={formData.postcode || ''} onChange={handleChange} required />
        <textarea name="note" placeholder="Note to dealer.." value={formData.note || ''} onChange={handleChange} />
        <select name="appointmentDay" value={formData.appointmentDay || ''} onChange={handleChange} required>
          <option value="">Choose day..</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
        </select>
        <select name="appointmentTime" value={formData.appointmentTime || ''} onChange={handleChange} required>
          <option value="">Choose time..</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
        </select>

        {/* Read-only and hidden fields 
        NOTE: This will become real code, code below is for showcasing only */}
        {/* <input name="doorWidth" value={formData.doorWidth || ''} readOnly className="readonly-input" />
        <input name="doorStyle" value={formData.doorStyle || ''} readOnly className="readonly-input" />
        <input name="series" value={formData.series || ''} readOnly className="readonly-input" />
        <input name="doorDesign" value={formData.doorDesign || ''} readOnly className="readonly-input" />
        <input name="doorColour" value={formData.doorColour || ''} readOnly className="readonly-input" />
        <input type="hidden" name="imagePath" value={formData.imagePath || ''} /> */}


        <input name="doorWidth" value={doorwidth || 'TODO: Width'} readOnly className="readonly-input" />
        <input name="doorStyle" value={style || 'TODO: Door Style'} readOnly className="readonly-input" />
        <input name="series" value={series || 'TODO: Series'} readOnly className="readonly-input" />
        <input name="doorDesign" value={design || 'TODO: Door Design'} readOnly className="readonly-input" />
        <input name="doorColour" value={color || 'TODO: Door Colour'} readOnly className="readonly-input" />
        <input type="hidden" name="imagePath" value={imgurl || ''} />

        {/* <img src={imgurl} style={{height:"300px", width:"300px"}}/> */}
        <button type="submit">REQUEST YOUR FREE QUOTE</button>
      </div>
      {status && <p>{status}</p>}
    </form>
  );
};

export default ContactForm;