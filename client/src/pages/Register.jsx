import styled from "styled-components";
import {mobile} from "../responsive";
import {register} from "../redux/apiCalls";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.1),
  rgba(255, 255, 255, 0.1)),
  url("https://i.ibb.co/5hR762z/green-monstera-leaves-nature-background.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({width: "75%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;


`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayError, setDisplayError] = useState(null);
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state) => state.user);
    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch, {username, email, password, confirmPassword}).then(r => setDisplayError(r)
        )

    };
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Input placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
                    {displayError && <Error>Something went wrong...</Error>}
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;
