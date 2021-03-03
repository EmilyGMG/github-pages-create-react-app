import React, {useState} from "react";
import { auth } from "../firebase";
import '../Styles/teste-home.css';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };
      
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
        
          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };
   

  return (
    <>
    <div className="bg-login">
      <section>
        <div className="container">
          <div className="row align-items-center" style={{ zIndex: "1", position: "relative" }}>
            <div className="col-lg-9 ml-auto mb-3 text-center"></div>
            <div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
              <form className="form">
                <div className="card card-login mb-3">
                  <div className="card-header card-header-primary text-center">
                    <h4 className="card-title">
                      <strong>Login</strong>
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="input-group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                      </svg>
                      <input 
                      className="form-control" 
                      type="email"
                      name="userEmail"
                      value = {email}
                      placeholder="email"
                      id="userEmail"
                      onChange = {(event) => onChangeHandler(event)}
                      />
                    </div>
                    <div className="input-group mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                      <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                      <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    <input
                      type="password"
                      className="form-control"
                      name="userPassword"
                      value = {password}
                      placeholder="Your Password"
                      id="userPassword"
                      onChange = {(event) => onChangeHandler(event)}
                    />
                    </div>
                  </div>

                  <div class="card-footer justify-content-center mt-3 mb-3">
                    <button type="submit" 
                    class="btn btn-primary btn-link btn-lg"
                    onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
                    >
                      Login
                      </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>

  );
};

export default SignIn;
