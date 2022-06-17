import axios from "axios";
import { useEffect, useState, useReducer, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
import bankCodes from "../services/bankCodes";
import { setUserError, setUserLoading } from "../slices/userInfoSlice";
import { isCreditCard, isEmail } from "../utils/validateFunctions";
export default function RegisterTeacher() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userError = useSelector((state) => state.userInfo.error);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [creditCardError, setCreditCardError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [creditCardNameError, setCreditCardNameError] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [creditCardName, setCreditCardName] = useState("");
  const [bankCode, setBankCode] = useState("");

  console.log(Object.entries(bankCodes));

  //Soon-to-be-implemented clientside validations
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfrimPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    if (!isEmail(e.target.value)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handleCreditCardChange = (e) => {
    //Validate Credit Card
    console.log(isCreditCard(e.target.value))
    if (!isCreditCard(e.target.value)) setCreditCardError("Incorrect credit card format.");
    setCreditCard(e.target.value);
    setCreditCardError("");
  };

  const handleCreditCardNameChange = (e) => {
    
      
    setCreditCardName(e.target.value);
  };

  const handleBankCodeChange = (e) => {
    setBankCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    //POST request

    try {
      if (
        passwordError ||
        emailError ||
        usernameError ||
        firstNameError ||
        lastNameError ||
        bankCode === "" ||
        creditCardError
      ) {
        return alert("invalid input");
      }

      dispatch(setUserLoading(true));
      dispatch(setUserError(""));
      const requestBody = {
        username,
        email,
        password,
        firstName,
        lastName,
        creditCardNumber: creditCard,
        creditCardName,
        bankCode,
      };

      const result = await axios.post(
        "http://localhost:4000/auth/teacher",
        requestBody
      );
      navigate("/");
    } catch (err) {
      console.log(err?.response?.data?.message || err);
      dispatch(
        setUserError(
          err.response?.data.message || err.messsage || "request error"
        )
      );
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords must be the same.");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  return (
    <div className="container w-75">
      <h1>Sign up for free as teacher</h1>
      <div>
        <form onSubmit={handleSubmit} className="container">
          <div className="form-group row my-3">
            <label className="" htmlFor="usernameInput">
              Username
            </label>
            <input
              className={`form-control ${usernameError ? "is-invalid" : ""}`}
              type="text"
              id="usernameInput"
              placeholder="Enter username"
              onChange={handleUsernameChange}
            />
            <div className="invalid-feedback">{usernameError}</div>
          </div>

          <div className="form-group row my-3">
            <label className="" htmlFor="firstNameInput">
              First Name
            </label>
            <input
              className={`form-control ${firstNameError ? "is-invalid" : ""}`}
              type="text"
              id="firstNameInput"
              placeholder="Enter first name"
              onChange={handleFirstNameChange}
            />
            <div className="invalid-feedback">{firstNameError}</div>
          </div>
          <div className="form-group row my-3">
            <label className="" htmlFor="lastNameInput">
              Last Name
            </label>
            <input
              className={`form-control ${lastNameError ? "is-invalid" : ""}`}
              type="text"
              id="lastNameInput"
              placeholder="Enter username"
              onChange={handleLastNameChange}
            />
            <div className="invalid-feedback">{lastNameError}</div>
          </div>

          <div className="form-group row my-3">
            <label className="" htmlFor="exampleInputEmail1">
              Email address
            </label>
            <input
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              type="email"
              id="exampleInputEmail1"
              placeholder="Enter email"
              onChange={handleEmailChange}
            />
            <div className="invalid-feedback">{emailError}</div>
          </div>

          <div className="form-group row my-3">
            <label className="" htmlFor="passwordInput">
              Password
            </label>
            <input
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              type="password"
              id="passwordInput"
              placeholder="Enter password"
              onChange={handlePasswordChange}
            />
            <div className="invalid-feedback">{passwordError}</div>
          </div>

          <div className="form-group row my-3">
            <label className="" htmlFor="confirmPasswordInput">
              Confirm Password
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmPasswordInput"
              placeholder="Enter password"
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <div className="form-group row my-3">
            <label className="" htmlFor="creditCardInput">
              Credit Card Number
            </label>
            <input
              className={`form-control ${creditCardError ? "is-invalid" : ""}`}
              type="text"
              id="creditCardInput"
              placeholder="Enter Card Number"
              value={creditCard}
              onChange={handleCreditCardChange}
            />
            <div className="invalid-feedback">{creditCardError}</div>
          </div>

          <div className="form-group row my-3">
            <label className="" htmlFor="ccNameInput">
              Credit Card Name
            </label>
            <input
              className={`form-control ${
                creditCardNameError ? "is-invalid" : ""
              }`}
              type="text"
              id="ccNameInput"
              placeholder="Name on card"
              value={creditCardName}
              onChange={handleCreditCardNameChange}
            />
            <div className="invalid-feedback">{creditCardNameError}</div>
          </div>

          <div className="mb-5">
            <select
              className="form-select form-select-sm"
              value={bankCode}
              onChange={handleBankCodeChange}
              required
            >
              <option value={""}>Select Your Bank On Credit Card</option>
              {Object.entries(bankCodes).map((el) => (
                <option value={el[0]} key={el[0]}>
                  {el[1]}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">
              {"Bank code must be selected"}
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              Go Back
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* <Toast error={userError} /> */}
    </div>
  );
}
