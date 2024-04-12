import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const Emailjs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    const regex = {
      name: /^[a-zA-Z\s]+$/,
      email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/,
      message: /^[a-zA-Z\s]+$/,
    };
    const errors = {};
    if (!regex.name.test(formData.name)) {
      errors.name = "Name is invalid.";
    }
    if (!regex.email.test(formData.email)) {
      errors.email = "email is invalid.";
    }
    if (!regex.message.test(formData.message)) {
      errors.message = "please write some message";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      emailjs
        .sendForm("service_yzpy11v", "template_fhys3lj", form.current, {
          publicKey: "OXJzU6B2ZpuV82nTr",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
      setShowSuccessPopup(true);
    }
  };


  return (
      <div className="flex flex-col justify-center items-center min-h-screen">
          
          <h1 className="text-black border-b-4 border-black mb-6 text-4xl">Validation Email Js</h1>
      <form ref={form} onSubmit={sendEmail}>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="max-w-[460px] w-full border-black border-2 p-2 h-[40px]"
          />
          {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
        </div>
        <div className="flex pt-3 flex-col">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="max-w-[460px] w-full border-black border-2 p-2 h-[40px]"
          />
          {formErrors.email && (
            <p className="text-red-500">{formErrors.email}</p>
          )}
        </div>
        <div className="flex pt-3 flex-col">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="max-w-[460px] w-full border-black border-2 p-2 h-[100px] resize-none"
          />
          {formErrors.message && (
            <p className=" text-red-500">{formErrors.message}</p>
          )}
        </div>
        <input
          type="submit"
          value="Send"
          className="px-4 py-2 border-black border-2 mt-4 cursor-pointer rounded-full"
        />
      </form>
    </div>
  );
};
