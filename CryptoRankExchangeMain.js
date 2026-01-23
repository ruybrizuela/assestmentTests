import React, {useState} from "react";
import Table from "./Table";

function Main() {
  const [amount, setAmount] = useState()
  const [errors, setErrors] = useState({
    empty:'',
    min:'',
    max:''
  })

  const totalMoney = 17042.67;
  const minExchange = 0.01;

  const validateForm = (val) => {
    let formErrors = {};
    if(!val){
      formErrors.empty = 'Amount cannot be empty'
    }
    if(val > totalMoney){
      formErrors.max = 'Amount cannot exceed the available balance'
    }
    if(val < minExchange){
      formErrors.max = 'Amount cannot be less than $0.01'
    }
    setErrors(formErrors)
  }

  const handleAmount = (e) => {
    const tempVal = e.target.value
    setAmount(tempVal)
    validateForm(tempVal)
  }

  return (
    <div className="layout-column align-items-center mx-auto">
      <h1>CryptoRank Exchange</h1>
      <section>
        <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
          <label>
            I want to exchange $ <input className="w-10" data-testid="amount-input" required type="number" placeholder="USD" value={amount} onChange={handleAmount}/> of my $
            <span>{totalMoney}</span>:
          </label>
          {(errors?.empty || errors?.min || errors?.max) && (
           <p data-testid="error" className="form-hint error-text mt-3 pl-0 ml-0">
              {errors.empty || errors.min || errors.max}
            </p>
          )}
        </div>
      </section>
      <Table amount={amount}/>
    </div>
  );
}

export default Main;
