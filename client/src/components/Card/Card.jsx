import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addFavorites, deleteFavorites } from "../../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Card.module.css";

function Card(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = () => {
    if (props.myFavorites.some((fav) => fav.id === props.id)) {
      props.deleteFavorites(props.id);
    } else {
      props.addFavorites(props);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${styles.container} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.front}>
        <img
          className={styles.image}
          src={props.image}
          alt="Personaje de R&M"
        />
        <h2 className={styles.data}>{props.name}</h2>
      </div>
      <div className={styles.back}>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleFavorite}
            className={styles.favoriteButton}
            disabled={!isHovered}
          >
            {props.myFavorites.some((fav) => fav.id === props.id) ? "❤️" : "🤍"}
          </button>
          <button
            onClick={() => props.onClose(props.id)}
            className={styles.closeButton}
            disabled={!isHovered}
          >
            X
          </button>
        </div>
        <h2>
          {"Species: "} {props.species}
        </h2>
        <h2>
          {"Gender: "}
          {props.gender}
        </h2>
        <h2>
          {"Id: "} {props.id}
        </h2>
        <h2>
          {"Status: "} {props.status}
        </h2>
        <Link to={`/detail/${props.id}`}>
          <div className={styles.cardName}>{"¿ More info ?"}</div>
        </Link>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addFavorites, deleteFavorites }, dispatch);
}

function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
