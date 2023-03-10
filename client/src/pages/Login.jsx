import {useState} from "react";
import styled from "styled-components";
import {login} from "../redux/apiCalls";
import {device} from "../responsive";
import {useDispatch, useSelector} from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5),
  rgba(255, 255, 255, 0.5)),
  url("https://i.ibb.co/FqDjbjP/login.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  @media only screen and ${device.mobile} {
    width: 80%;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }

  @media only screen and ${device.mobile} {
    padding: 5px 5px;
    width: 20%;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayError, setDisplayError] = useState(null);
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password}).then(r=>setDisplayError(r)
        )

    };
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleClick} disabled={isFetching}>
                        LOGIN
                    </Button>
                    {displayError && <Error>Something went wrong...</Error>}
                    <Link href='/register'>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
