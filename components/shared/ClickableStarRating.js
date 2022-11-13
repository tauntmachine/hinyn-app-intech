import styled from "@emotion/styled";
import { useState } from "react";

const Button = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    &.on {
        color: #E96E3F;
    }
    &.off {
        color: #ccc;
    }
`


export default function ClickableStarRating() {
    const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

    return (
        <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <Button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </Button>
          );
        })}
      </div>
    );
}
