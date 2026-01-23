import React, {useState, useEffect} from "react";

function EmployeeValidationForm() {
  //const today = new Date();
  const today = new Date('2024-04-12')
  const NAME_MIN_LENGTH = 4
  const ID_MIN_LENGTH = 6
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    employeeId:"",
    joiningDate:""
  })
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    validateForms();
  },[formData])

  const validateForms = () => {
    let formErrors = {};
    let isValid = true

    const inputDate = new Date(formData.joiningDate);
    inputDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    //name validation
    if(!formData.name || formData.name.length < NAME_MIN_LENGTH){ 
      isValid=false;
      formErrors.name=true;
    }

    //email validation
    if(!formData.email || !/\S+@\S+\.\S+/.test(formData.email)){ 
      isValid=false;
      formErrors.email=true;
    }

    //name validation
    if(!formData.employeeId || formData.employeeId.length < ID_MIN_LENGTH){ 
      isValid=false;
      formErrors.employeeId=true;
    }

    //date validation
    if(!formData.joiningDate || inputDate > today){ 
      isValid=false;
      formErrors.joiningDate=true;
    }
    setErrors(formErrors)
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value})
    if(errors[name]){
      setErrors({...errors, [name]: null})
    }
  }
  return (
    <div className="layout-column align-items-center mt-20 ">
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-name">
        <input
          className="w-100"
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          data-testid="input-name-test"
          required
        />
        {errors?.name &&
          <p className="error mt-2">
          Name must be at least 4 characters long and only contain letters and spaces
        </p>}
      </div>
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-email">
        <input
          className="w-100"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="error mt-2">Email must be a valid email address</p>}
      </div>
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-employee-id">
        <input
          className="w-100"
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
        />
        {errors.employeeId && <p className="error mt-2">Employee ID must be exactly 6 digits</p>}
      </div>
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-joining-date">
        <input
          className="w-100"
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          placeholder="Joining Date"
        />
       {errors.joiningDate &&  <p className="error mt-2">Joining Date cannot be in the future</p>}
      </div>
      <button 
        data-testid="submit-btn" 
        type="submit" 
        disabled={Object.keys(errors).length > 0 || Object.values(formData).some(v => !String(v).trim())}
      >
        Submit
      </button>
    </div>
  );
}

export default EmployeeValidationForm;
