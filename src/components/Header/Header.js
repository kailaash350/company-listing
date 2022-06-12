import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {  BrowserRouter as Router, Link, useNavigate  } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styles from "./header.module.css";

const useStyles = makeStyles({
  label: {
    textTransform: "capitalize",
  },
});


export const Header = ({ name, navs }) => {
  const classes = useStyles();
  
  const history = useNavigate();

  return (
    <header>
      <div className={styles.wrapper}>
      <Link to={'/home'}>
        <div>
          <img
            src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNhN2FlY2U7fS5jbHMtMntmaWxsOiNmZmY7b3BhY2l0eTowLjM7fS5jbHMtM3tmaWxsOiM3ZjM4Mzg7fS5jbHMtNHtmaWxsOiNiYzViNTc7fS5jbHMtNXtmaWxsOiNmZmQ4Yzk7fS5jbHMtMTAsLmNscy02LC5jbHMtOXtmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7fS5jbHMtMTAsLmNscy02e3N0cm9rZTojMzkzYzU0O3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LmNscy02e3N0cm9rZS13aWR0aDozcHg7fS5jbHMtN3tmaWxsOiMzOTNjNTQ7fS5jbHMtOHtmaWxsOiM1MTU1NzA7fS5jbHMtOXtzdHJva2U6I2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utd2lkdGg6MnB4O29wYWNpdHk6MC4xO30uY2xzLTEwe3N0cm9rZS13aWR0aDo2cHg7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZS8+PGNpcmNsZSBjbGFzcz0iY2xzLTEiIGN4PSI2NCIgY3k9IjY0IiByPSI2MCIvPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iNjQiIGN5PSI2NCIgcj0iNDgiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00MCwyMkExMCwxMCwwLDAsMCwzMCwzMnY4MS40M2E1OS42Miw1OS42MiwwLDAsMCwyMCw4LjkxVjMyQTEwLDEwLDAsMCwwLDQwLDIyWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTEwNy44NSw4NS44NWMwLTE0LjQ5LTkuMS0yNS0yMS45LTI4Ljk0bDItMy4zMWEuNTkuNTksMCwwLDAtLjU4LS45bC02LC44MmEuNTkuNTksMCwwLDEtLjU0LTFsMi42Ni0zLjJhLjU5LjU5LDAsMCwwLS41NC0xLDEwMCwxMDAsMCwwLDAtMjEuMDcsNS40QTM1LDM1LDAsMCwwLDQwLjE1LDg1Ljg1djMuMjJjMCwxNS40OC0xLjY1LDIxLjE4LTYuMzYsMjYuNzZoMGE1OS45NCw1OS45NCwwLDAsMCw3Mi04Ljc3bDAtLjE2QTk0LjI0LDk0LjI0LDAsMCwwLDEwNy44NSw4NS44NVoiLz48cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik04OC43NCw5My40NmE2LjMxLDYuMzEsMCwwLDEtNS03LjYzLDYuNTUsNi41NSwwLDAsMSw3LjU4LTQuNzJsNS45MSwxQS44LjgsMCwwLDAsOTgsODFjLTMuODktNy0xMy43Ni0xMi42NC0yNC0xMi42NFM1My44OCw3NCw1MCw4MWEuOC44LDAsMCwwLC44MywxLjE4bDUuOTEtMWE2LjU1LDYuNTUsMCwwLDEsNy41OCw0LjcyLDYuMzEsNi4zMSwwLDAsMS01LjA1LDcuNjNMNTEuMDksOTQuOWEuOC44LDAsMCwwLS41MywxLjIzYzMuMjMsNSwxMC4yLDguNDIsMjMuNDQsOC40MnMyMC4yMS0zLjM4LDIzLjQ0LTguNDJhLjguOCwwLDAsMC0uNTMtMS4yM1oiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik04MS44OSw5Mi4xOWE5LDksMCwwLDEtMi43NywyLjIxLDExLjYxLDExLjYxLDAsMCwxLTEwLjI0LDAiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik03OS4xMiw4Ni42MmMwLDIuODMtMi4yOSw0LjI1LTUuMTIsNC4yNXMtNS4xMi0xLjQyLTUuMTItNC4yNUM2OC44OCw4NSw3OS4xMiw4NC43NSw3OS4xMiw4Ni42MloiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik01Ny4zMyw4Ny40OGwzLjA1LS43M2EuNzEuNzEsMCwwLDEsLjg5LjY4LDQsNCwwLDAsMS00LjI4LDQsMy45LDMuOSwwLDAsMS0zLTEuODQsMy45NCwzLjk0LDAsMCwxLDUuNTMtNS4zNy43My43MywwLDAsMSwuMDgsMS4xMVoiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik05MC40LDg3LjQ4bDMtLjczYS43Mi43MiwwLDAsMSwuODkuNjgsNCw0LDAsMCwxLTQuMjksNCwzLjg4LDMuODgsMCwwLDEtMy0xLjg0LDMuOTQsMy45NCwwLDAsMSw1LjUyLTUuMzcuNzIuNzIsMCwwLDEsLjA5LDEuMTFaIi8+PHBhdGggY2xhc3M9ImNscy03IiBkPSJNOTIsMjlIMTUuMjhBNTkuNzYsNTkuNzYsMCwwLDAsNy4wOSw0NUg5MmE4LDgsMCwwLDAsMC0xNloiLz48Y2lyY2xlIGNsYXNzPSJjbHMtOCIgY3g9IjkyIiBjeT0iMzciIHI9IjgiLz48Y2lyY2xlIGNsYXNzPSJjbHMtOSIgY3g9IjkyIiBjeT0iMzciIHI9IjQuMzEiLz48bGluZSBjbGFzcz0iY2xzLTEwIiB4MT0iMTMiIHgyPSIyMC41IiB5MT0iNDIiIHkyPSI0OS41Ii8+PGxpbmUgY2xhc3M9ImNscy0xMCIgeDE9IjY2IiB4Mj0iNzQuMzgiIHkxPSIzMi4xIiB5Mj0iMjMuNzIiLz48L3N2Zz4='
            alt='Avatar'
            width='50'
            height='50'
            className={styles.img}
          />
          <h1 className={styles.h1}>{name}</h1>
        </div>
        </Link>
        <div>
          <>
            {navs.map(({ desc, to }) => {
              return (
                <Link key={desc}  to={to}>
                  <Button size="large"
                    classes={{
                      root: classes.contactMe,
                      label: classes.label,
                    }}
                  >
                    <strong>{desc}</strong>
                  </Button>
                </Link>
              );
            })}
          </>
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  name: PropTypes.string,
  navs: PropTypes.array,
};

Header.defaultProps = {
  name: "Your Name",
  navs: [
    { desc: "Home", to: "/home" },
    { desc: "Feed", to: "/feeds" },
  ],
};
