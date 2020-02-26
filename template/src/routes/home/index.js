import { h } from "preact";
import { styled } from "goober";

const StyledHome = styled("div")`
  padding: 56px 20px;
  min-height: 100%;
  width: 100%;
`;

const Home = () => (
  <StyledHome>
    <h1>Home</h1>
    <p>This is the Home component.</p>
  </StyledHome>
);

export default Home;
